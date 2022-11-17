const express = require('express')
let app = express()


let deltagerListe = []



function addDeltager(deltager, liste){
    liste = []
    liste.push(deltager)
    deltagerListe = liste
}

addDeltager("per", deltagerListe)

console.log(deltagerListe);
//test

exports.addDeltager = addDeltager()