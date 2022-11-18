let deltagerListe = []

function addDeltager(navn, id, liste){
    let deltager = {"navn":navn, "id": id, "talrækker": []}
    

    liste.push(deltager)

}
addDeltager("per", 1, deltagerListe)
let test = deltagerListe.find(deltager => deltager.id === 1)
//
console.log(deltagerListe);
console.log(test.navn);


function addTalrækkeTilDeltager(deltagerID, talArray, liste){
    
}

function manuelVinderrække(vinderTalArray, deltagerMedTalrækkeArray){

}

function findRandomTal(){
let min = math.ceil(1)
let max = math.floor(25)
let talrække = []

while (talrække.length>4) {
    
}


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

