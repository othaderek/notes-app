const fs = require('fs');
const chalk = require('chalk');
const path = 'notes.json';

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync(path);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }

}

const getNotes = (path) => {
    return fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        
    }
    );
}

const saveNotes = (notes) => {
    let jsonNotes = JSON.stringify(notes);
    fs.writeFileSync(path, jsonNotes);
}


const addNote = (title, body) => {
    let notes = loadNotes();
    let duplicateNotes = notes.filter( n => notes.title === title)
    
    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse.bold('New note added!'));
        
    } else {
        console.log(chalk.red.inverse.bold(`You already have a note with the title ${title}`));
    }

}

const findNote = (notes, title) => {
    return notes.find( note => note.title === title)
}

const removeNote = (title) => {
    let notes = loadNotes();
    let foundNote = findNote(notes, title)
    debugger
    let index = foundNote ? notes.indexOf(foundNote) : null;
    console.log(index);
    console.log(chalk.red.inverse.bold('Removing note...'));
    index != null ? notes.splice(index) : console.log('No note matches');
    saveNotes(notes);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse.bold('Listing notes...'));
    notes.forEach( n => console.log(n.title));
}

const readNote = (title) => {
    let notes = loadNotes();
    let foundNote = findNote(notes, title);
    foundNote ? console.log(foundNote.title, foundNote.body) : console.log('No note found')
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}