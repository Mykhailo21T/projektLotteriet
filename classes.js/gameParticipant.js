import { arrayUnion } from "firebase/firestore"
let participantArr = []
let numberArr = []
//let name = ""
//let id = -1

class GameParticipant {
    constructor(name, id, arrOfNumberArr) {
        this.name = name
        this.id = id
        this.numberArr = numberArr
        this.arrOfNumberArr = arrOfNumberArr
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

    createNumberArr(arr) {
        let min = Math.ceil(1)                                                  // i talrækken i forvejen. Hvis talrækken er fuld, oprettes ingen ekstra tal.
        let max = Math.floor(25)                                                // (I parametret talrækkke anvendes talrækken valgteTal)
        
        
        while (arr.length<5) {
            let number = Math.floor(Math.random()*(max-min+1)+min)
        
            if (!number.includes(tal)) {
                number.push(tal) 
             }
        
            }
            
            
        return arr
    }

    addNumberArrToParticipant(participantID, arrOfNumberArr, locationArr) {
        let gameParticipant = locateParticipant(participantID, locationArr)
        let numberArr = this.createNumberArr(arrOfNumberArr)

        gameParticipant.arrOfNumberArr.push(numberArr)
    }

    

}

export {GameParticipant}