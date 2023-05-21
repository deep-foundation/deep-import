#!/usr/bin/env node
import apolloClient from '@apollo/client';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const { ApolloClient, InMemoryCache, gql } = apolloClient;
import {DeepClient} from "@deep-foundation/deeplinks/imports/client.js";
import {readFile} from "fs/promises";
import {generateApolloClient} from "@deep-foundation/hasura/client.js";
function createApolloClient(uri, token) {
    return new ApolloClient({
        uri,
        cache: new InMemoryCache(),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
async function getMigrationsEndId(client) {
    const result = await client.query({
        query: gql`
            query Links {
                links(where: {type_id: {_eq: "182"}}) {
                    id
                }
            }
        `
    });
    return result.data.links[0].id;
}
async function getLastLinkId(client) {
    const result = await client.query({
        query: gql`
            query Links {
                links(order_by: { id: desc }, limit: 1) {
                    id
                }
            }
        `
    });
    return result.data.links[0].id;
}
function deleteLinksGreaterThanId(client, id) {
    client
    .mutate({
        mutation: gql`
            mutation DeleteLinks($id: bigint) {
                delete_links(where: { id: { _gt: $id } }) {
                    affected_rows
                }
            }
        `,
        variables: { id },
    })
    .then((result) => {
        console.log(`Deleted ${result.data.delete_links.affected_rows} rows`);
    })
    .catch((error) => console.error(error));
}

async function createDeepClient(gqllink) {
    const apolloClient = generateApolloClient({
        path: gqllink.replace("https://", ""),
        ssl: 1,
    });

    const unloginedDeep = new DeepClient({apolloClient});
    const guest = await unloginedDeep.guest();
    const guestDeep = new DeepClient({deep: unloginedDeep, ...guest});
    const admin = await guestDeep.login({
        linkId: await guestDeep.id('deep', 'admin'),
    });
    return new DeepClient({deep: guestDeep, ...admin})
}
export async function getLinksFromFile(filename) {
    const data = await readFile(filename, 'utf8');
    return JSON.parse(data)
}

async function insertLinksFromFile(filename, gqllink, linksData, diff=0, MigrationsEndId, overwrite) {
    let deep  = await createDeepClient(gqllink)
    try {
        const links = [];
        const objects = [];
        const numbers = [];
        const strings = [];

        for (let i = 1; i < linksData.length; i++) {
            const link = linksData[i];
            if (!overwrite && diff !== 0) {
                if (link.id > MigrationsEndId) {
                    link.id += diff
                }
                if (link.from_id > MigrationsEndId) {
                    link.from_id += diff
                }
                if (link.to_id > MigrationsEndId) {
                    link.to_id += diff
                }
                if (link.type_id > MigrationsEndId) {
                    link.type_id += diff
                }
            }
            links.push({
                id: link.id,
                from_id: link.from_id,
                to_id: link.to_id,
                type_id: link.type_id
            });

            if (link.string) {
                strings.push(link.string);
            }

            if (link.number) {
                numbers.push(link.number);
            }

            if (link.object) {
                objects.push(link.object);
            }
        }

        await deep.serial({
            operations: [
                {
                    table: 'links',
                    type: 'insert',
                    objects: links
                },
                {
                    table: 'objects',
                    type: 'insert',
                    objects: objects
                },
                {
                    table: 'numbers',
                    type: 'insert',
                    objects: numbers
                },
                {
                    table: 'strings',
                    type: 'insert',
                    objects: strings
                }
            ]
        });

        console.log('Data inserted successfully');
    } catch (error) {
        console.error(error);
    }
}
async function importData(url, jwt, filename, overwrite) {
    const client = createApolloClient(url, jwt)
    const MigrationsEndId = await getMigrationsEndId(client)
    const lastLinkId = await getLastLinkId(client)
    let linksData = await getLinksFromFile(filename)
    const SaveMigrationsEndId = linksData[0]["id"]

    if (MigrationsEndId === SaveMigrationsEndId) {
        if (overwrite) {
            deleteLinksGreaterThanId(client, MigrationsEndId)
            await insertLinksFromFile(filename, url, linksData);
        } else {
            let diff = lastLinkId - MigrationsEndId
            await insertLinksFromFile(filename, url, linksData, diff, MigrationsEndId, overwrite)
        }
    }
    else {
        throw new Error("MigrationsEndId is different from MigrationsEndId in Save")
    }
}
yargs(hideBin(process.argv))
    .command('deep-export', '', (yargs) => {
        return yargs
            .option('url', { describe: 'The url to export data from', type: 'string', demandOption: true })
            .option('jwt', { describe: 'The JWT token', type: 'string', demandOption: true })
            .option('file', { describe: 'The file to save data to', type: 'string', demandOption: false })
            .option('overwrite', { describe: '', type: 'boolean', demandOption: false });


    }, (argv) => {
        importData(argv.url, argv.jwt, argv.file, argv.overwrite)
            .catch((error) => console.error(error));
    })
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;