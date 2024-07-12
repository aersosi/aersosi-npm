# aersosi-npm

## Table of Contents
- About
- Installation
- Features
- Usage
- Configuration
- Contributing
- License
- FAQ

---

## About
**There's something new, listen well, my CV in your terminal!**
**And perhaps also your CV in someone else's terminal?**

I think it is a good idea to make my CV available as a terminal program. 
So, I've written a Node program, which I publish as NPM package, that is open source and freely available. 
Would you also like to publish your CV as a terminal program? Just fork my repo, 
change it to your needs and publish it yourself.

This package is designed for developers who need [brief description of the package's purpose]. 
It provides [key benefits or unique selling points].

## Notice
I do not have the time and capacity to maintain this library. 
If you find bugs or want to make improvements, fork the repo or make a pull-request.
I am always very grateful for suggestions for improvement, 
help or simply if my code benefits others.

---

## Run my CV

Open your terminal/cli/shell und run the command:

```sh
npx @aersosi/cv
```

or after forking/downloading run it locally via:

```sh
npm i && npm start
```

---

## Features
ASCII Style Title
Colors via chalk package
three different box styles (square, rounded, double)
Check and warning for max width, to ensure CV is displayed correctly
extra page
fully customizable





## Usage

I tried to build this in a modular/configurable way, so it can easily be used by other developers. 
It's basically a library of functions that I use to create/configure the program in src/config folder.
The entry point is ./src/index.ts.

Here's a basic example of how to use the package:

```
const myPackage = require('my-javascript-package');

myPackage.doSomething();
```

## Configuration
You can configure the CV by passing an options object:

---
### File: src/config/config.cvContent.ts

```
```

---
### File: src/config/config.cvStyles.ts

```
export const configICvStyles: IConfigICvStyles = {
    maxCvWidth: 88,
    textPaddingX: 4,
    boxColor: chalk.whiteBright,
    boxStyle: 'rounded',
    titleAsciiShades: shades,
    titleStyleBox: themeColors.shade_3.bold,
    subTitleStyleBox: themeColors.white,
    bodyStyleBox: themeColors.white.italic,
};
```

### maxCvWidth

### textPaddingX

### boxColor

### boxStyle

### titleAsciiShades

### titleStyleBox

### subTitleStyleBox

### bodyStyleBox

---
### File: src/config/config.inquirerMenu.ts

```
```


---
### File: src/config/config.pageExtra.ts

```
```


---
### File: src/config/config.themeColors.ts

```
```











## Contributing
We welcome contributions! Please read our contributing guidelines to get started.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## FAQ
Who is this package for?
This package is ideal for developers who [describe the target audience].

Why does it have these specific features?
The features are designed to [explain the rationale behind the features].