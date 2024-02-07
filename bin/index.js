#! /usr/bin/env node
import { hideBin } from "yargs/helpers";
import yargs from 'yargs'

import { blue } from '../util/color-text.js';
import { f } from '../util/figlet.js';
import { addToDatabase, updateItem, deleteItem, getTodoLists } from "../controllers/notion.js";

yargs(hideBin(process.argv))
    .scriptName('maunotion')
    .command('list', 'List all tasks', {}, () => {
        getTodoLists()
        blue('Please hit CTRL+C in terminal to continue')
    })
    .command('info', 'Detail information about MauNotion', {}, () => {
        f('MauNotion');
    })
    .command({
        command : 'done [items...]',
        aliases  :['d', 'x'],
        describe : 'Done task',
        builder : (yargs) => {
            return yargs.positional('items', {
                describe : 'Checked done tasks',
                type : 'string',
                array : true
            })
        },
        handler : (argv) => {
            const { items } = argv
            items.forEach(i => {
                updateItem(true, i)
            })
            blue('Please hit CTRL+C in terminal to continue')
        }
    })
    .command({
        command: 'add [items...]',
        aliases : ['-a', 'a'],
        describe: 'Add single or multiple tasks',
        builder: (yargs) => {
            return yargs.positional('items', {
                describe: 'List of tasks to add',
                type: 'string',
                array: true // Mengizinkan multiple items
            });
        },
        handler: (argv) => {
            const { items } = argv
            items.forEach(i => {
                addToDatabase(i)
            })
            getTodoLists()
            blue('Please hit CTRL+C in terminal to continue')
        }
    })
    .command({
        command: 'delete [items...]',
        aliases : ['-d', 'd', 'del'],
        describe: 'Delete single or multiple tasks',
        builder: (yargs) => {
            return yargs.positional('items', {
                describe: 'Deletes TODO',
                type: 'string',
                array: true // Mengizinkan multiple items
            });
        },
        handler: (argv) => {
            const { items } = argv
            items.forEach(i => {
                deleteItem(i)
            })
            blue('Please hit CTRL+C in terminal to continue')
        }
    })
    .exitProcess(true)
    .parse();

   
