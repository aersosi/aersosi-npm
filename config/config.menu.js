import {colorsTheme} from './config.colors.js';
import path from "path";
import fs from "fs";
import {additionalSectionEnable, additionalSectionName} from "./config.additionalSection.js";

const resumePath = path.resolve('./default/data.resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
export const menuIndexOptions = {
    type: 'list',
    name: 'resumeOptions',
    message: 'What do you want to know about me?',
    choices: [
        ...(additionalSectionEnable ? [additionalSectionName] : ''),
        ...Object.keys(resume),
        colorsTheme.shade5('Exit')],
    loop: 'false'
}

export const menuBackExitOptions = {
    type: 'list',
    prefix: '',
    name: 'menuBack',
    message: 'Go back or Exit?',
    choices: [
        'Back',
        colorsTheme.shade5('Exit')],
    loop: 'false'
}