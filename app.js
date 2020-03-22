const yargs = require("yargs")
const notes = require('./notes.js');
const path = 'notes.txt'

const addNote = (argv) => {
    notes.addNote(argv.title, argv.body)
}

const removeNote = (argv) => {
    notes.removeNote(argv.title)
}

const updateNote = (argv) => {
    console.log(chalk.cyan.inverse.bold('Updating note...'));
}

const listNotes = () => {
    notes.listNotes();
    
}

const readNote = (argv) => {
    notes.readNote(argv.title)
}

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: "Note title",
            type: 'string',
            demandOption: true
        },
        body: {
            describe: "Note body",
            type: 'string',
            demandOption: true
        }
    },
    handler: addNote
})

// Remove
yargs.command({
    command: 'remove',
    describe: 'Removes note',
    builder: {
        title: "Note title",
        type: "string",
        demandOption: true
    },
    handler: removeNote
})

// Update
yargs.command({
    command: 'update',
    describe: 'Updates note',
    handler: updateNote
})

// List
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: listNotes
})

// Read
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: "Note title",
        type: "string",
        demandOption: true
    },
    handler: readNote
})

yargs.parse();


