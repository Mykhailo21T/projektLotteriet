import { arrayUnion } from "firebase/firestore"
let participantArr = []
let numberArr = []
//let name = ""
//let id = -1

class GameParticipant {
    constructor(name, id, participantArr) {
        this.name = name
        this.id = id
        this.participantArr = participantArr
    }

    
    addParticipant(name, id, participantArr){
        const gameParticipant = new GameParticipant(name, id, participantArr)
        participantArr.push(gameParticipant)
    }
    
    locateParticipant(id, arr) {
        let gameParticipant = arr.find(gameParticipant => gameParticipant.id === id)   // Finder og returnerer deltager med ID som parameter.  
        return gameParticipant
    }

    prepickNumber(number, arr) {
        if (arr<5 && number<26 && number>0 && !arr.includes(number)) {                 // Tilføjer selvvalgt tal mellem 1 og 25 til liste, 
            arr.push(number)                                                      // såfremt tallet ikke allerede er på listen, og 
        }  
    }

    createTalrække()

}