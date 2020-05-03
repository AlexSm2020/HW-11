const util = require('util')
const fs = require('fs')

var {v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
  read() {
    return readFileAsync("./db/db.json", "utf8")
  }

  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note))
  }

  getNotes() {
    return this.read().then(notes => {
      return JSON.parse(notes)
    })
  }

  addNote(note) {
    var newNote = {
      text: note.text,
      title: note.title,
      id: uuidv4()
    }
    return this.getNotes().then(notes=> {
      notes.push(newNote);
      this.write(notes).then(res=> {
        return res;
      });
    });
  }

  removeNote(id) {
    return this.getNotes().then(notes=> {
      var filtered = notes.filter(note => note.id !==id);
      this.write(filtered).then(res=> {
        return res;
      });
    });
  }
}

module.exports = new Store()