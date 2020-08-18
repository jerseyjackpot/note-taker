// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
const router = require("express").Router();
let notesData = require("../db/db.json");
// console.log(notesData);
const fs = require("fs");
// ===============================================================================
// ROUTING
// ===============================================================================

 
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  router.get("/notes", function(req, res) {
    res.json(notesData);
  });

// API POST Requests
  router.post("/notes", function(req, res) {
    let newNote = req.body
    newNote.id = Math.round(Math.random()*100000000);
    notesData.push(newNote);
    fs.writeFile("./db/db.json",JSON.stringify(notesData),function(err){console.log(err)});
    console.log(newNote);
    res.json(notesData);
  });

  router.delete("/notes/:id", function(req, res) {
    let noteId = req.params.id
    // let newNote = [];
    // // remove notes from notesData with id 
    // for (let i = 0; i < notesData.length; i++) {
    //   if (notesData[i].id != noteId){
    //     newNote.push(noteId[i])
    //   }
    // }
    notesData = notesData.filter( note => note.id != noteId);
    fs.writeFile("../db.json",JSON.stringify(notesData),function(err){console.log("Deleted Note")});
    
    res.json(notesData);
  });

  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  module.exports = router;
  
