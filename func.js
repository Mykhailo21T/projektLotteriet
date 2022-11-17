let deltagerListe = []


function addDeltager(navn, id, liste){
    let deltager = new Object()
    deltager.navn = navn;
    deltager.id = id;

    liste.push(deltager)

}

function addTalrækkeTilDeltager(deltagerID, talArray, liste){
    
 }

 function manuelVinderrække(vinderTalArray, deltagerMedTalrækkeArray){

 }

function findRandomTal(){

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

