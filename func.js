import { arrayUnion } from "firebase/firestore"

let deltagerListe = []
let talrække = []

function addDeltager(navn, id, liste){
    let deltager = {navn:navn, id: id, talrækker: []}
    

    liste.push(deltager)

}





function findDeltager(id, listeToSearch) {                                                 // Finder og returnerer deltager med ID som parameter.
  let deltager = listeToSearch.find(deltager => deltager.id === id)     
  return deltager
}




function vælgTalPåForhånd(tal, list) {

    if (list<5 && tal<26 && tal>0 && !list.includes(tal)) {                 // Tilføjer selvvalgt tal mellem 1 og 25 til liste, 
        list.push(tal)                                                      // såfremt tallet ikke allerede er på listen, og 
    }                                                                       // listens længde er mindre end 5.
}



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

let emptyArray = []
addDeltager("per", 1, deltagerListe)
let test = findDeltager(1, deltagerListe)
addTalrækkeTilDeltager(1, emptyArray, deltagerListe)
console.log(test.talrækker);






//test



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


