import chai from 'chai'

const expect = chai.expect
const assert = chai.assert



//import{GameParticipant} from "../classes.js/gameParticipant"

//import {Game} from "../classes.js/game.js"

import {Game} from "../classes.js/game.js" 

let list = []

let dato = new Date()
const faktisktDato = dato.getUTCFullYear() + "-" + (dato.getUTCMonth()+1) + "-" +  dato.getUTCDate() 

let newGame = new Game(25,1,3, faktisktDato)


newGame.addParticipant
beforeEach(function(){

    list = []
    newGame.participantList = list

}
)


describe('US1: When adding a Deltager', () =>{

    it('Should add and find the deltager', () =>{

        //act
        let deltager1 = newGame.addParticipant("Knud Knudsen",1)
        let deltager2 = newGame.addParticipant("Per hansen",2)


        //assert
       
        let findDeltager1 = newGame.locateParticipant(1)
        let findDeltager2 = newGame.locateParticipant(2)

        assert.equal(findDeltager1, deltager1)
        assert.equal(findDeltager2, deltager2)

        assert.equal(findDeltager1.name, "Knud Knudsen")
        assert.equal(findDeltager2.name, "Per hansen")

    


    })

   

})



describe("US2: Should show talrækker connected to a deltager", ()=>{

    
    
    it('Should add talrække to konkrete deltager', () =>{
        //assign
        let talrække1 = [1,2,3,4,5]
        let talrække2 = [20,22,12,8,6]
        let talrække3HalfEmpty = [23,2,8]
        let talrækkeEmpty = []

        newGame.addParticipant("Knud Knudsen",1, list)
        newGame.addParticipant("Per hansen",2, list)

        
        let findDeltager1 = newGame.locateParticipant(1)
        let findDeltager2 = newGame.locateParticipant(2)
        //act
        
        
        newGame.addNumberArrToParticipant(1,talrække1)
        newGame.addNumberArrToParticipant(2,talrække1)
        newGame.addNumberArrToParticipant(2,talrække2)
        newGame.addNumberArrToParticipant(2,talrække3HalfEmpty)
        newGame.addNumberArrToParticipant(2,talrækkeEmpty)

        //assert


        assert.equal(findDeltager1.arrOfNumberArr.length, 1)
        assert.equal(findDeltager2.arrOfNumberArr.length,4)

        //Tests that the method fills the array with 5 numbers
        assert.equal(findDeltager2.arrOfNumberArr[2].length, 5)
        assert.equal(findDeltager2.arrOfNumberArr[3].length, 5)

      
        //Checks that the same number doesnt occur in the same talrække
        let checkIfFailed = false
        for(let i =0; i < findDeltager2.arrOfNumberArr.length; i++){
            let testArray = findDeltager2.arrOfNumberArr[i]
            for(let j = 0; j < testArray.length-1; j++){
                for(let q =j+1; q<testArray.length;q++){
                if(testArray[j] === testArray[q]){
                    checkIfFailed = true
                    break
                }
            }
        }
        }
        assert.isFalse(checkIfFailed)

      

    })

})


describe('US3: Should be able to manually add a winning talrække and find a winner', ()=>{

    it('Should find one vinder with 3 vindertal', ()=>{
        //assign
        let vinderRække = [12,3,6]

        let talrække1 = [1,2,3,4,5]
        let talrække2 = [20,22,12,8,6]
        let talrække3 = [6,9,4,3,12]

        newGame.addParticipant("Knud Knudsen",1, list)
        newGame.addParticipant("Per hansen",2, list)
        let vinderen = newGame.addParticipant("Hans", 3, list)


        newGame.addNumberArrToParticipant(1,talrække1)
        newGame.addNumberArrToParticipant(2,talrække2)
        newGame.addNumberArrToParticipant(3,talrække3)



        //act
        
        //adds the winning array to the function to find winners
            newGame.setWinningArray(vinderRække)
          let faktiskeVinder = newGame.findWinner()

        //assert
        
        //there should be only one winner, who was designated under "vinderen"
        assert.equal(faktiskeVinder[0], vinderen)
        assert.equal(faktiskeVinder.length, 1)
        
    })

    it('Should return more vindere', ()=>{


         //assign
         let vinderRække = [12,3,6]

         let talrække1 = [1,2,3,4,5]
         let talrække2 = [20,22,12,8,6] // vinder med 2 rigtige
         let talrække3 = [6,9,4,3,12] // vinder med 3 rigtige
         let talrække4 = [6,24,12,4,3] //vinder med 3 rigtige
 
        
         newGame.addParticipant("Knud Knudsen",1)
         newGame.addParticipant("Per hansen",2)
         let vinder1 = newGame.addParticipant("Hans", 3)
         let vinder2 = newGame.addParticipant("Grete", 4)
 
         newGame.addNumberArrToParticipant(1,talrække1)
         newGame.addNumberArrToParticipant(2,talrække2)
         newGame.addNumberArrToParticipant(3,talrække3)
         newGame.addNumberArrToParticipant(4,talrække4)
 
 
         //act
         
         newGame.setWinningArray(vinderRække)
         let faktiskeVinder = newGame.findWinner()
         //assert
         

         assert.equal(faktiskeVinder[0].name, vinder1.name)
         assert.equal(faktiskeVinder[1].name, vinder2.name)
         assert.equal(faktiskeVinder.length, 2)

       
     

    })
})




describe('US4: Should return an array with 5 numbers',()=>{
    it('should have an array of 5 numbers',()=>{
        //assign

        let testArray = []
        let testArrayPartialFilled = [4,3,1]
        //act

        newGame.createNumberArr(testArray)
        newGame.createNumberArr(testArrayPartialFilled)
        //assert
        assert.equal(testArray.length, 5)

        assert.equal(testArrayPartialFilled.length, 5)
        assert.equal(testArrayPartialFilled[0],4)
        assert.equal(testArrayPartialFilled[1],3)
        assert.equal(testArrayPartialFilled[2],1)

        //Checking that the arrays only has numbers between 1 and 25, and that no number appears twice in the array
        let failed = false
        for(let i = 0; i<=testArray.length-1;i++){
            if(testArray[i] === testArray[i+1] ||
                testArray[i] < newGame.lowestNum || testArray[i+1]<newGame.lowestNum  || testArray[i]>newGame.highestNum || 
                testArray[i+1] >newGame.highestNum){
                failed = true 
                break
            }
            
        }
      assert.isFalse(failed)

        
    })
})