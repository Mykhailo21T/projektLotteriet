
import { arrayUnion, limit, limitToLast } from "firebase/firestore"
import {GameParticipant} from "../classes.js/gameParticipant.js"


export class Game {
     constructor(highestNum, lowestNum, amountOfWinningNums, winnerArray=[], date,participantList=[],concreteWinners=[]) {
        this.highestNum = highestNum;
        this.lowestNum = lowestNum;
        this.amountOfWinningNums = amountOfWinningNums;
        this.winnerArray = winnerArray;
        this.date = date
        this.participantList = participantList
        this.concreteWinners =concreteWinners

        return this
    }

    showParticipant() {
        return this.participantList
    }

   
    addParticipant(name, id, gameID){
        let newGameparticipant = new GameParticipant(name,id,gameID);
        this.participantList.push(newGameparticipant)
        return newGameparticipant
    }
    


     locateParticipant(id) {
        let gameParticipant = this.participantList.find(gameParticipant => gameParticipant.id === id)   // Finder og returnerer deltager med ID som parameter.  
        return gameParticipant
    }
    addNumberArrToParticipant(id, arrOfNumberArr) {
        let gameParticipant = this.locateParticipant(id)
        let numberArr = this.createNumberArr(arrOfNumberArr)
    
        gameParticipant.arrOfNumberArr.push(numberArr)
    }
    
    createNumberArr(arr) {
        let min = Math.ceil(this.lowestNum)                                                  // i talrækken i forvejen. Hvis talrækken er fuld, oprettes ingen ekstra tal.
        let max = Math.floor(this.highestNum)                                              // (I parametret talrækkke anvendes talrækken valgteTal)
        
        
        while (arr.length<5) {
            let number = Math.floor(Math.random()*(max-min+1)+min)
        
            if (!arr.includes(number)) {
                arr.push(number) 
             }
        
            }
            
            
        return arr
    }
    prepickNumber(number, arr) {
        if (arr.length<5 && number<=this.highestNum && number>=this.lowestNum && !arr.includes(number)) {                 // Tilføjer selvvalgt tal mellem 1 og 25 til liste, 
            arr.push(number)                                                      // såfremt tallet ikke allerede er på listen, og 
        }  
    }

    findWinner(){
        let vindere = []
        
        let counter = 0
        
        
        
        for (let deltager of this.participantList) {
            for (let talrækkeIndex = 0; talrækkeIndex<deltager.arrOfNumberArr.length; talrækkeIndex++) {      
                counter = 0
        
                for (let vindertalIndex = 0; vindertalIndex<this.amountOfWinningNums; vindertalIndex++){

                    for (let talIndex = 0; talIndex<5; talIndex++) {
                        let talrække = deltager.arrOfNumberArr[talrækkeIndex]
                       
                        if (talrække[talIndex] == this.winnerArray[vindertalIndex] ) {
                            counter++ 
                            break
                        }
                        }
                    }
                }
                if (counter == this.amountOfWinningNums) {
                
                    let xxx = deltager
                    vindere.push(xxx)
                    counter = 0
                    
                }
            }

            this.concreteWinners = vindere



           return vindere
        }

        setWinningArray(winnerArray){
            this.winnerArray = winnerArray
        }

        changeWinningNumAmount(howManyWinNums){
            this.amountOfWinningNums = howManyWinNums
        }


        addLotteryToPrevious(){

        }

        toString1(){
            return this.date + " | " + this.participantList + " | " + this.highestNum + " | " + this.lowestNum
        }
}


//Antal vindertal er et en identifier til at finde ud af om der skal søges efter vindere med 3,2 eller 1 vindertal
//Deltager listen er den samlet liste af alle deltagere
//Vindertal er et array af 3 tal
//Hver talrække hos hver deltager skal tjekkes. Rækkefølgen af tal i deltagerns talrække og vinderrækken er ikke sorteret
//skal returnere et array med alle dem der har vundet (Deres faktisk deltager opjekt vi finder med findDeltager)


 

    
    


/*
    const _Game = (highestNum, lowestNum, amountOfWinningNums, date) => {
   
        return Game(highestNum, lowestNum, amountOfWinningNums, date)
    };
    export { _Game as Game };
    */