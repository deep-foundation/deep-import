#!/usr/bin/env node

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {importData} from "../deep-import.js";

yargs(hideBin(process.argv))
    .option('url', {
        describe: 'The url of graphql to export data from',
        type: 'string',
        demandOption: true,
    })
    .option('jwt', {
        describe: 'The JWT token for authentication in graphql', 
        type: 'string',
        demandOption: true,
    })
    .option('directory-name', {
        describe: 'The directory name to save data to',
        type: 'string',
        demandOption: true,
    })
    .option('overwrite', {
        describe: 'Should overwrite existing links',
        type: 'boolean',
        demandOption: false,
        default: false,
    })
    .option('debug', {
        describe: '',
        type: 'boolean',
        demandOption: false,
        default: false,
    })
    .help()
    .parseAsync()
    .then((argv) => {
        importData(argv.url, argv.jwt, argv.directoryName, argv.overwrite, argv.debug).catch((error) =>
            console.error(error)
        );
    });