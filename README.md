[![npm](https://img.shields.io/npm/v/@deep-foundation/deep-import.svg)](https://www.npmjs.com/package/@deep-foundation/deep-import)
[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/deep-foundation/deep-import) 
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=purple)](https://discord.gg/deep-foundation)

Cli utility that allows you to import links into your deep.


# Table Of Contents
<!-- TABLE_OF_CONTENTS_START -->
- [Table Of Contents](#table-of-contents)
- [Library](#library)
- [Cli](#cli)
  - [Cli Usage](#cli-usage)
    - [`deep-import`](#`deep-import`)
  - [Cli Usage Ways](#cli-usage-ways)
    - [Directly running using npx](#directly-running-using-npx)
    - [Global Installation](#global-installation)
      - [Global installation and running using binary name](#global-installation-and-running-using-binary-name)
      - [Global installation and running using npx](#global-installation-and-running-using-npx)
    - [Local installation](#local-installation)
      - [Local installation and running using npx](#local-installation-and-running-using-npx)
      - [Local installation and running using npm script](#local-installation-and-running-using-npm-script)

<!-- TABLE_OF_CONTENTS_END -->

# Library
See [Documentation] for examples and API

# Cli
## Cli Usage
<!-- CLI_HELP_START -->

### `deep-import`
```
Options:
  --version         Show version number                                [boolean]
  --url             The url of graphql to export data from   [string] [required]
  --jwt             The JWT token for authentication in graphql
                                                             [string] [required]
  --directory-name  The directory name to save data to       [string] [required]
  --overwrite       Should overwrite existing links   [boolean] [default: false]
  --debug                                             [boolean] [default: false]
  --help            Show help                                          [boolean]
```

<!-- CLI_HELP_END -->

## Cli Usage Ways
<!-- CLI_USAGE_WAYS_START -->
If you are going to use this package in a project - it is recommended to install it is [Locally](#local-installation)  
If you are going to use this package for yourself - it is recommended to install it [Globally](#global-installation) or run it directly using [npx](#directly-running-using-npx)
### Directly running using npx
```shell
npx --yes deep-import
```

### Global Installation
#### Global installation and running using binary name
```shell
npm install --global deep-import
/home/runner/work/deep-import/deep-import/dist/cli/deep-import
```

#### Global installation and running using npx
```shell
npm install --global deep-import
npx /home/runner/work/deep-import/deep-import/dist/cli/deep-import
```

### Local installation

#### Local installation and running using npx
```shell
npm install deep-import
npx /home/runner/work/deep-import/deep-import/dist/cli/deep-import
```

#### Local installation and running using npm script
```shell
npm install deep-import
```
Add npm script to package.json. Note that you can name  your script as you want but it must call binary file provided by the package
```json
{
  "scripts": {
    "/home/runner/work/deep-import/deep-import/dist/cli/deep-import": "/home/runner/work/deep-import/deep-import/dist/cli/deep-import"
  }
}
```
and run
```shell
npm run /home/runner/work/deep-import/deep-import/dist/cli/deep-import
```
<!-- CLI_USAGE_WAYS_END -->

[Documentation]: https://deep-foundation.github.io/create-typescript-npm-package/

