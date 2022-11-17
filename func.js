let deltagerListe = []


function addDeltager(navn, id, liste){
    let deltager = new Object()
    deltager.name = navn;
    deltager.id = id;

    liste.push(deltager)

}

addDeltager("per", "1", deltagerListe)
addDeltager("søren", "2", deltagerListe)

console.log(deltagerListe);
//test



const _addDeltager = (navn, id, liste) => {
    let deltager = new Object();
    deltager.name = navn;
    deltager.id = id;

    liste.push(deltager);
};
export { _addDeltager as addDeltager };