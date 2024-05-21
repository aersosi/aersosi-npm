import {colorsChalk} from './config.colors.js';
import path from "path";
import fs from "fs";

const resumePath = path.resolve('./data/data.resume.json');
const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
export const manuIndexOptions = {
    type: 'list',
    name: 'resumeOptions',
    message: 'What do you want to know about me?',
    choices: [
        'About Me',
        ...Object.keys(resume),
        colorsChalk.orange5('Exit')],
    loop: 'false'
}

export const manuBackExitOptions = {
    type: 'list',
    prefix: '',
    name: 'menuBack',
    message: 'Go back or Exit?',
    choices: [
        'Back',
        colorsChalk.orange5('Exit')],
    loop: 'false'
}