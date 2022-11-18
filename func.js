let deltagerListe = []
let valgteTal = []

function addDeltager(navn, id, liste){
    let deltager = {"navn":navn, "id": id, "talrækker": []}
    

    liste.push(deltager)

}
addDeltager("per", 1, deltagerListe)
let test = deltagerListe.find(deltager => deltager.id === 1)
//
console.log(deltagerListe);
console.log(test.navn);


function findDeltager(id) {                                                 // Finder og returnerer deltager med ID som parameter.
  let deltager = deltagerListe.find(deltager => deltager.id === id)     
  return deltager
}
console.log(findDeltager(1))


function vælgTalPåForhånd(tal) {
    if (valgteTal<5 && tal<26 && tal>0 && !valgteTal.includes(tal)) {        // Tilføjer selvvalgt tal mellem 1 og 25 til valgteTal, 
        valgteTal.push(tal)                                                  // såfremt tallet ikke allerede er på listen, og 
    }                                                                        // listens længde er mindre end 5.
    else throw Error("Talrækken er fuld")
}



function opretTalrække(talrække){                                           // Opretter og tilføjer tal mellem 1 og 25, der ikke findes 
    let min = Math.ceil(1)                                                  // i talrækken i forvejen. Hvis talrækken er fuld, oprettes ingen ekstra tal.
    let max = Math.floor(25)

    talrække = valgteTal
    
    while (talrække.length<5) {
        let tal = Math.floor(Math.random()*(max-min+1)+min)
    
        if (!talrække.includes(tal)) {
            talrække.push(tal) 
         }
    
        }
    return talrække
}
    

function addTalrækkeTilDeltager(deltagerID){                                // Finder deltager, og opretter en talrække, med eventuelt brugervalgte tal,
    let deltager = findDeltager(deltagerID)                                 // som tilføjes til deltagerens talrække.
    let talrække = opretTalrække()

    deltager.talrækker.push(talrække)
}







//test


const _addTalrækkeTilDeltager = (deltagerID, tal) => {
    addTalrækkeTilDeltager(deltagerID, tal)
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

const _findDeltager = (id) => {
   
    findDeltager(id)
};
export { _findDeltager as findDeltager };



