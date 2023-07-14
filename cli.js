#!/usr/bin/env node

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {importData} from "./index.js";

yargs(hideBin(process.argv))
    .option('url', {
        describe: 'The url of graphql to export data from',
        type: 'string',
        demandOption: true,
    })
    .option('jwt', {
        describe: 'The JWT token',
        type: 'string',
        demandOption: true,
    })
    .option('directory-name', {
        describe: 'The directory name to save data to',
        type: 'string',
        demandOption: true,
    })
    .option('overwrite', {
        describe: '',
        type: 'boolean',
        demandOption: false,
    })
    .option('debug', {
        describe: '',
        type: 'boolean',
        demandOption: false,
    })
    .help()
    .parseAsync()
    .then((argv) => {
        importData(argv.url, argv.jwt, argv.file, argv.overwrite, argv.debug).catch((error) =>
            console.error(error)
        );
    });