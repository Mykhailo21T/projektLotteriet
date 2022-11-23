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

 
import {GameParticipant, addParticipant, locateParticipant, prepickNumber, createNumberArr, addNumberArrToParticipant} from "./classes.js/gameParticipant.js"

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


