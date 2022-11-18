let deltagerListe = []

function addDeltager(navn, id, liste){
    let deltager = new Object()
    deltager.navn = navn;
    deltager.id = id;
    deltager.talrække = []

    liste.push(deltager)

}
let kajList = [{navn: "per"}, {navn: "ole"}, {navn: "sanne"}]
addDeltager("per", 1, deltagerListe)
console.log(kajList.includes({navn: "ole"}));


function findRandomTal(){
    let min = Math.ceil(1)
    let max = Math.floor(25)
    let talrække = []
    
    while (talrække.length<5) {
        let tal = Math.floor(Math.random()*(max-min+1)+min)
    
        if (!talrække.includes(tal)) {
            talrække.push(tal) 
         }
    
        }
    return talrække
}

function manuelVinderrække(vinderTalArray, deltagerMedTalrækkeArray){

}
    

function addTalrækkeTilDeltager(deltagerID, talArray, liste){
    
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

