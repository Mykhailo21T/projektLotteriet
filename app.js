const express = require('express')
let app = express()


let deltagerListe = []



function addDeltager(deltager, liste){
    liste.push(deltager)
}

addDeltager("per", deltagerListe)

console.log(deltagerListe);
//test

exports.addDeltager = addDeltager()