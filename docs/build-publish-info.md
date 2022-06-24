# Build and Publihs Info

## Build

The configuration bellow is made for Windows.
```
npm run win-build
```

**Important !** 
- Only the first build, prior to making command above run ``tsc`` in command line. This will generate the first version of files.
- Build process will generate all files in `build` folder
- Files `README.md` and `package.json` are copied to `build` folder as content for publishing on **npm store**.

## Publish npm package

The configuration bellow is made for Windows.

- Step 1 - Go to build folder 
```
cd build
```

- Step 2 - run command
```
npm publish
```
**Important !** 
- Check version in `build/package.json` file prior to publishing



## Build example application

```
npm run webpack-build-example
```

The output will be located in `build-example` folder.
If you are using **VScode** you can use `ritwickdey.LiveServer` extension to open `index.html` file.