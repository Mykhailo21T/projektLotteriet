import { initializeApp } from "firebase/app";
import { setDoc, getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where, updateDoc } from "firebase/firestore";
import { Game } from "./classes.js/game.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmlyw9TMKl-ign_hYLhAsaPmdsXlzPs4w",
    authDomain: "projektlotteriet.firebaseapp.com",
    projectId: "projektlotteriet",
    storageBucket: "projektlotteriet.appspot.com",
    messagingSenderId: "556554582591",
    appId: "1:556554582591:web:80c6dd7ee6e2b80bf4d68a",
    measurementId: "G-J8D1FB7W3N"
  };
  
  // Initialize Firebase
  const appFirebase = initializeApp(firebaseConfig);
  const db = getFirestore(appFirebase)
  
  import express, { request, response } from 'express'

  async function firebaseGameConverter(gID) {
    // Firestore data converter
    const gameConverter = {
        toFirestore: (game) => {
            return game 
        },
        fromFirestore: (snapshot) => {
            const data = snapshot.data();
            return new Game(data.highestNum, data.lowestNum, data.amountOfWinningNums,data.winnerArray,data.date,data.participantList,data.concreteWinners);
        }
    };
    const ref = doc(db, "Games", gID ).withConverter(gameConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to City object
      const game = docSnap.data();
      // Use a City instance method
      //console.log("G: "+game.toString());
    } else {
      console.log("No such document!");
    }
    
        return docSnap
    }

    let pisfuck = await firebaseGameConverter("2022-12-08")

    let fuckpis = pisfuck.data()

    fuckpis.winnerArray = [1,2,3]

  

    fuckpis.addParticipant("henrik", 26, "2022-12-08")
    fuckpis.addParticipant("svend", 27, "2022-12-08")
    fuckpis.addParticipant("dinmor", 28, "2022-12-08")
    fuckpis.addParticipant("jens", 22, "2022-12-08")

    //console.log(fuckpis.participantList);

    

    
    fuckpis.addNumberArrToParticipant(26,[1,2,3,4,5])
    fuckpis.addNumberArrToParticipant(27,[7,2,3,4,1])

    let x = fuckpis.locateParticipant(28)
    x.arrOfNumberArr = [[5,6,7,8,9]]
    let y = fuckpis.locateParticipant(22)
    y.arrOfNumberArr = [[5,6,7,8,9]]

    //console.log(fuckpis.participantList);

    let win = fuckpis.findWinner()

  console.log("win"+ JSON.stringify(win))


// Define an array of objects
//const list = [  {name: 'John', age: 32},  {name: 'Jane', age: 28},  {name: 'Juna', age: 25},  {name: 'Jona', age: 22},];

// Define a function that takes user input as an argument
//function searchObjects(name) {
    // Convert the user input to lowercase
    //name = name.toLowerCase();
  
    // Use the filter() method to search for objects that contain the name property
    // and that have a value that starts with the user input
    //const results = list.filter(obj => obj.name.toLowerCase().startsWith(name));
  
    // Return the array of matching objects
    //return results;
  //}

//console.log(searchObjects("J"));




/*
import { arrayUnion } from "firebase/firestore"

let deltagerListe = []
let talrække = []

function addDeltager(navn, id, liste){
    let deltager = {navn:navn, id: id, talrækker: []}
    liste.push(deltager)
    return deltager
}
//gameParticipant




function findDeltager(id, listeToSearch) {                                                 // Finder og returnerer deltager med ID som parameter.
  let deltager = listeToSearch.find(deltager => deltager.id === id)     
  return deltager
}
//locateParticipant




function vælgTalPåForhånd(tal, list) {

    if (list<5 && tal<26 && tal>0 && !list.includes(tal)) {                 // Tilføjer selvvalgt tal mellem 1 og 25 til liste, 
        list.push(tal)                                                      // såfremt tallet ikke allerede er på listen, og 
    }                                                                       // listens længde er mindre end 5.
}
//prepickNumber



function opretTalrække(talrække){                                           // Opretter og tilføjer tal mellem 1 og 25, der ikke findes 
    let min = Math.ceil(1)                                                  // i talrækken i forvejen. Hvis talrækken er fuld, oprettes ingen ekstra tal.
    let max = Math.floor(25)                                                // (I parametret talrækkke anvendes talrækken valgteTal)
    
    
    while (talrække.length<5) {
        let tal = Math.floor(Math.random()*(max-min+1)+min)
    
        if (!talrække.includes(tal)) {
            talrække.push(tal) 
         }
    
        }
        
        
    return talrække
}
    

function addTalrækkeTilDeltager(deltagerID, talrækkeArrau, arrayToSearchIn){                 // Finder deltager, og opretter en talrække, med eventuelt brugervalgte tal,
    let deltager = findDeltager(deltagerID, arrayToSearchIn)                                 // som tilføjes til deltagerens talrække.
    let talrække = opretTalrække(talrækkeArrau)

    deltager.talrækker.push(talrække)
 
}

//Antal vindertal er et en identifier til at finde ud af om der skal søges efter vindere med 3,2 eller 1 vindertal
//Deltager listen er den samlet liste af alle deltagere
//Vindertal er et array af 3 tal
//Hver talrække hos hver deltager skal tjekkes. Rækkefølgen af tal i deltagerns talrække og vinderrækken er ikke sorteret
//skal returnere et array med alle dem der har vundet (Deres faktisk deltager opjekt vi finder med findDeltager)



addDeltager("knud",1,deltagerListe)
addTalrækkeTilDeltager(1,[1,2,3,4,5],deltagerListe)






import{Game } from "./classes.js/game.js"

let spil = new Game(55,1,2,Date.now)
spil.participantList = deltagerListe
spil.setWinnerArrayForGame = [3,4,5]

console.log(spil.findVinder);

 

import { GameParticipant } from "./classes.js/gameParticipant.js"


//test

const _findVinder = (antalVindertal, deltagerListe, vinderTal) => {
   
    return findVinder(antalVindertal, deltagerListe, vinderTal)
};
export { _findVinder as findVinder };


const _findDeltager = (id, listeToSearch) => {
   
    return findDeltager(id, listeToSearch)
};
export { _findDeltager as findDeltager };



const _addTalrækkeTilDeltager = (deltagerID, talrækkeArrau,arrayToSearchIn) => {
    addTalrækkeTilDeltager(deltagerID, talrækkeArrau,arrayToSearchIn)
};
export { _addTalrækkeTilDeltager as addTalrækkeTilDeltager };


const _addDeltager = (navn, id, liste) => {
   
    addDeltager(navn, id, liste)
};
export { _addDeltager as addDeltager };


const _findRandomTal = () => {
   
    findRandomTal()
};
export { _findRandomTal as findRandomTal };

const _manuelVinderrække = (vinderTalArray, deltagerMedTalrækkeArray) => {
   
    manuelVinderrække(vinderTalArray, deltagerMedTalrækkeArray)
};
export { _manuelVinderrække as manuelVinderrække };

const _vælgTalPåForhånd = (tal) => {
   
    vælgTalPåForhånd(tal)
};
export { _vælgTalPåForhånd as vælgTalPåForhånd };

const _opretTalrække = (talRække) => {
   
    opretTalrække(talRække)
};
export { _opretTalrække as opretTalrække };
*/

