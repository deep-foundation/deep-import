# Description
Cli utility that allows you to import links into your deep.

# Installation
```shell
npm install --global deep-import
```

# Synopsis

```shell
deep-import --url <url> --jwt <jwt> --file <file> [--overwrite] [--debug]
```
`<>` - required  
`[]` - optional

`--url`: The URL to export data from. (required)  
`--jwt`: The JWT token. (required)  
`--file`: The file to import data from. (required)  
`--overwrite`: Whether to overwrite your links if it already exists.  [Optional]  
`--debug`:  Allows you to see which links are inserted and in what order, which allows you to track down errors. [Optional]  

# Usage

## Global/Local installed
Use `npx`
```
npx deep-export ...
```

## Global installed
```
deep-export
```

## Local installed
Add npm script that invokes `deep-export`
`package.json`:
```
"scripts": {
  "deep-export": "deep-export"
}
```
and run it with arguments by using `npm run` and separating cli arguments by using `--` (otherwise your arguments will be considered as arguments for `npm run` command)
```
npm run deep-export -- ...
```




# Related Links
https://deep.foundation
https://github.com/deep-foundation
