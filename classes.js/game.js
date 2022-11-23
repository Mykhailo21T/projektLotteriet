import { arrayUnion } from "firebase/firestore"
let winnerArray = []
let participantList = []
class Game {
     constructor(highestNum, lowestNum, amountOfWinningNums, date) {
        this.highestNum = highestNum;
        this.lowestNum = lowestNum;
        this.amountOfWinningNums = amountOfWinningNums;
        this.winnerArray = winnerArray;
        this.date = date
        this.participantList = participantList
        this.findVinder = findVinder()
    }
}


//Antal vindertal er et en identifier til at finde ud af om der skal søges efter vindere med 3,2 eller 1 vindertal
//Deltager listen er den samlet liste af alle deltagere
//Vindertal er et array af 3 tal
//Hver talrække hos hver deltager skal tjekkes. Rækkefølgen af tal i deltagerns talrække og vinderrækken er ikke sorteret
//skal returnere et array med alle dem der har vundet (Deres faktisk deltager opjekt vi finder med findDeltager)


function findVinder(){
    let vindere = []
    
    let counter = 0
    
    
    
    for (let deltager of participantList) {
        for (let talrækkeIndex = 0; talrækkeIndex<deltager.talrækker.length; talrækkeIndex++) {      
            counter = 0
    
            for (let vindertalIndex = 0; vindertalIndex<this.amountOfWinningNums; vindertalIndex++){
                console.log("counter: " + counter);
                console.log("vindertal: " + antalVindertal);
               
           
               
               
                for (let talIndex = 0; talIndex<5; talIndex++) {
                    let talrække = deltager.talrækker[talrækkeIndex]
                   
                    if (talrække[talIndex] == winnerArray[vindertalIndex] ) {
                        counter++ 
                        break
                    }
                    }
                }
            }
            if (counter == this.amountOfWinningNums) {
                console.log("KOM HER INd");
                console.log(deltager);
                let xxx = deltager
                vindere.push(xxx)
                counter = 0
                
            }
        }
    
    
    
       return vindere
    }
    

    export {Game}
    