# clicv

## Table of Contents
- [Introduction](#introduction)
- [Run](#run)
- [Features](#features)
- [Customization](#customization)
    - [Installation](#installation)
    - [Configuration](#configuration)
        - [Box Styles](#box-styles)
        - [Theme Colors](#theme-colors)
        - [Inquirer Menu](#inquirer-menu)
        - [Extra Page](#extra-page)
- [Contributing](#contributing)
- [License](#license)
- [FAQ](#faq)

## Introduction

**@aersosi/clicv** is an Node.js package that allows you to display your CV (Curriculum Vitae) in the terminal.
It's designed for developers who want to showcase their professional profile in a unique, tech-savvy way.
The package is open-source, customizable, and can be easily forked and modified to create your own terminal-based CV.

Whether you're looking to make your CV stand out or simply want to explore a creative way to present professional
information, clicv offers a fresh approach to the traditional resume.

## Run

Run it directly without installation:

```sh
npx @aersosi/clicv
```

## Features

Key features include:
- **ASCII Style Title**: Create eye-catching headers with customizable colors.
- **Flexible Box Styles**: Choose from square, rounded, or double border styles for content presentation.
- **Width Management**: Automatic checks and warnings to ensure proper display across different terminal sizes.
- **Customizable Extra Page**: Add additional information or sections as needed.
- **Interactive Navigation**: Use the inquirer menu for easy navigation through the CV.
- **Theming**: Extensive color customization options for various CV elements.


## Customization

For developers looking to customize or extend the functionality:
To set up the project locally for development:

### Installation

To install **@aersosi/clicv**, follow these steps:

**Ensure you have Node.js installed on your system.**

1. Clone the repository:
```sh
git clone https://github.com/aersosi/clicv.git
cd clicv
```

2. Install dependencies:
```sh
npm install
```

3. Run the project:
```sh
npm start
```

### Configuration

You can customize various aspects of the CV by editing configuration files in the `src/config` directory.

#### CV Content (`src/config/config.cvContent.ts`)

```typescript
export const configCvContent: IConfigCvContent = {
    name: "Your Name",
    title: "Your Professional Title",
    contact: {
        email: "your.email@example.com",
        phone: "+1234567890",
        // Add more contact details
    },
    // Add more sections as needed
};
```

#### CV Styles (`src/config/config.cvStyles.ts`)

```typescript
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

- `maxCvWidth`: Maximum width of the CV display
- `textPaddingX`: Horizontal padding for text within boxes
- `boxColor`: Color of the box borders
- `boxStyle`: Style of the box ('square', 'rounded', or 'double')
- `titleAsciiShades`: Shading for ASCII title
- `titleStyleBox`: Style for main titles
- `subTitleStyleBox`: Style for subtitles
- `bodyStyleBox`: Style for body text

#### Theme Colors (`src/config/config.themeColors.ts`)

Define custom color schemes for various elements of the CV.

#### Inquirer Menu (`src/config/config.inquirerMenu.ts`)

Configure the interactive menu options for navigating the CV.

#### Extra Page (`src/config/config.pageExtra.ts`)

Add additional content or sections to your CV.


## Contributing

We welcome contributions to clicv! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## FAQ

**Q: Who is this package for?**
A: This package is ideal for developers, tech professionals, or anyone looking to present their CV in a unique, command-line interface format.

**Q: Can I customize the content and style of the CV?**
A: Yes, the package is designed to be highly customizable. You can modify the content, styling, and layout by editing the configuration files in the `src/config` directory.

**Q: Is it possible to add my own sections or features?**
A: Absolutely! The modular structure of the project allows for easy additions and modifications. You can add new sections in the `config.cvContent.ts` file and create corresponding styling options as needed.

**Q: How can I contribute to this project?**
A: I encourage contributions! Please refer to the Contributing section above for guidelines on how to submit improvements or bug fixes.
