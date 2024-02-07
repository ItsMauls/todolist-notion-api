import { red } from "./color-text.js";

export const welcomeCommand = `Welcome to maunotion-cli`

export const allListsCommand = (id, status, name) => {
console.log(`
ID : ${id}
Checkbox : [${status}]
Name : ${name}
`);
}

export const errorCommand = (c, msg) => {
    red('Error : ' + msg)
    console.log(`Correct command : maunotion ${c} <items>`)
    console.log('Try "maunotion help" to see all available commands')
}