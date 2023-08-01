import { glob } from 'glob';
import {generateDocumentation} from '@deep-foundation/npm-automation'
import fsExtra from 'fs-extra';

main();

async function main() {
  const cliAppFilePaths = await glob(`./dist/cli/*.js`, {absolute: true})
  for (const cliAppFilePath of cliAppFilePaths) {
    fsExtra.chmodSync(cliAppFilePath, '755');
  }
  await generateDocumentation({})
};