#!/usr/bin/env node

// Imports
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

// Helper
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const willkommen = async () => {
    console.log(chalk.red('SIE SIND EIN LORD!'));
    console.log();
    await sleep(1000);
    console.log();
}

const priorität = async () => {
    const answers = await inquirer.prompt({
        name: 'priorität',
        type: 'list',
        message: chalk.blue('Wünschen Sie den ') + chalk.green('Koch ') + chalk.blue('oder das ') + chalk.green('Zimmermädchen ') + chalk.blue('zu sprechen?'),
        choices: [
          'Koch',
          'Zimmermädchen',
        ],
    });
    
    console.log();
    //const order = answers.speakFirst.toString().toLowerCase();

    const spinner = createSpinner('Lassen Sie mich nachdenken...').start();
    await sleep();
    spinner.error({ text: `${chalk.blue('Es ist mir egal, wen Sie zuerst wollen!')}` });
    console.log(chalk.blue('Es kommt sowieso zuerst der Koch!'));
    console.log();
    await sleep(1500);
    console.log(chalk.blue('Hier ist er!'));
    console.log();
    await sleep(1500);
}

var requestedFood = '';

const koch = async () => {
    console.log(chalk.whiteBright('Guten Tag! Ich bin der Koch!'));

    const askForFood = await kochFrage();

    while(requestedFood == '') {
        console.log(chalk.whiteBright('Sie müssen aber essen!'));
        await kochFrage();
    }

    console.log();
    const spinner = createSpinner('Lassen Sie mich nachsehen was ich tun kann...').start();
    await sleep();
    spinner.error({ text: `${chalk.whiteBright('Tut mir Leid! Ich habe ' + requestedFood + ' nicht im Hause!')}` });
    console.log();

    const answers = await inquirer.prompt({
        name: 'kündigenSieMich',
        type: 'input',
        message: chalk.whiteBright('Kündigen Sie mich nun?'),
        default() {
            return 'Nein';
        },
    });

    console.log();
    console.log(chalk.whiteBright('Ihre Antwort ist mir egal!'))
    console.log(chalk.whiteBright('Ich kündige sowieso!'))
};

const kochFrage = async () => {
    const answers = await inquirer.prompt({
        name: 'essensWunsch',
        type: 'input',
        message: chalk.whiteBright('Was wünschen Sie zu speisen?'),
        default() {
            return 'Nichts';
        },
    });

    const order = answers.essensWunsch.toString().toLowerCase();

    switch(order) {
        case 'nichts':
        case 'garnichts':
        case 'gar nichts':
            requestedFood = '';
        break;
        default:
            requestedFood = answers.essensWunsch;
    }
}

const zimmermädchen = async () => {
    console.log();
    await sleep();
    console.log(chalk.blue('Hier ist ihr Zimmermädchen!'));
    console.log();
    await sleep(1500);

    const answers = await inquirer.prompt({
        name: 'staubwischen',
        type: 'list',
        message: chalk.magenta('Soll ich Staub wischen gnädiger Herr?'),
        choices: [
          'Ja',
          'Nein',
        ],
    });

    const order = answers.staubwischen.toString().toLowerCase();
    
    console.log();

    switch(order) {
        case 'nein':
            console.log(chalk.magenta('Sehr gut! Ich verabschiede mich!'));
        break;

        case 'ja':
            console.log(chalk.magenta('WAAS! So eine schwere Arbeit soll ich tun?'));
            console.log(chalk.magenta('Aber so nicht mit mir, ich kündige!'));
        break;
    }
};

const fazit = async () => {
    console.log();
    await sleep();
    console.log(chalk.blue('Sie sehen!'));
    console.log(chalk.blue('Auch das Leben eines Lordes ist schwer!'));
}

// Main
console.clear();

await willkommen();
await priorität();
await koch();
await zimmermädchen();
await fazit();