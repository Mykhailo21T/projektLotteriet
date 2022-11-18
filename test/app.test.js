import chai from 'chai'
const expect = chai.expect
const assert = chai.assert

import { addDeltager } from '../func.js'



let list = []
let deltager = new Object;
let deltager2 = new Object
beforeEach(function(){
    deltager.navn = "Knud Knudsen"
    deltager.id = "1"
    deltager.talrække = []

    deltager2.navn = "Per Hansen"
    deltager2.id = "2"
    deltager2.talrække = []
}
)


describe('US1: When adding a Deltager', () =>{

    it('Should add the deltager', () =>{

        //act
        addDeltager(deltager.navn, deltager.id, list)
        addDeltager(deltager2.navn, deltager2.id, list)

        //assert
      
        assert.isTrue(list.includes({navn: deltager.navn, id: deltager.id}))
        assert.isTrue(list.includes({navn: deltager2.navn, id: deltager2.id}))

        
       

    }),
    it('List shouldnt be empty', () =>{
        assert.isTrue(list.length > 0)
    })

   
})

import { addTalrækkeTilDeltager } from '../func.js'

describe("US2: Should show talrækker connected to a deltager", ()=>{

    list = []
    it('Should see talrækker a deltager have', ()=>{
        //assign
        
        let talrække1 = [1,2,3,4,5]
        let talrække2 = [20,22,12,8,6]


        //act
        addTalrækkeTilDeltager(deltager.id, talrække1, list)
        addTalrækkeTilDeltager(deltager2.id,talrække2, list)
        addTalrækkeTilDeltager(deltager2.id,talrække1, list)
     
        //assert
        expect(list).to.contain({deltagerID: deltager.id, talrække: [talrække1]})
        expect(list).to.contain({deltagerID: deltager2.id, talrække: [talrække2]})
        expect(list).to.contain({deltagerID: deltager2.id, talrække: [talrække1]})

    
        let failed = false
        for(let outer =0; outer< list[0].length-1; outer++){
            for(let inner = outer+1; inner < list[0].length; inner++){
                if(list[0].talrække[outer] === list[0].talrække[inner]){
                    failed = true
                    return failed
                }
            }
        }
        assert.isNotTrue(failed, "There shouldnt be two of the same talrækker in one deltager")
        

    })

})

import { manuelVinderrække } from '../func.js'
describe('US3: Should be able to manually add a winning talrække', ()=>{

    it('Should be able to set manual winning række', () =>{
      //assign
      let winner = [5,2,23,6,3]

      /* her skal der knyttes en deltager liste på med deres talrækker der kan tjekkes på */

      //act
      let manualTry = manuelVinderrække(winner , null)

      assert.equal(manualTry.length, 5)
  
      let failed = false;
      for(let i = 0; i < manualTry.length;i++){
          if(manualTry[i] < 0 || manualTry > 25){
              failed = true;
          }
      }
      assert.isFalse(failed)

    })
  

    

})


import { findRandomTal } from '../func.js'

describe('US4: Should return an array with 3 tandom numbers',()=>{
    it('should have an array of 3 numbers',()=>{
//assign
/* Woops kom til at lave den da jeg skulle teste.... det sker jo

        let min= 1
        let max = 25
        const number = ()=>{ 
            let selectedNumbers = []
            let restart = false;
            
            while(selectedNumbers.length <3 || restart == true){
                restart = false
                let number = Math.floor(Math.random() * (max - min) + min)
                if(!selectedNumbers.includes(number)){
                    selectedNumbers.push(number)
                } else restart = true
            }
            return selectedNumbers
        }
*/
        //act
        let randomNumberArrayHopefully = findRandomTal()

        //assert
        assert.isTrue(randomNumberArrayHopefully.length === 3)

        let failed = false
        for(let i = 0; i<=randomNumberArrayHopefully.length-1;i++){
            if(randomNumberArrayHopefully[i] === randomNumberArrayHopefully[i+1] ||
                randomNumberArrayHopefully[i] < 1 || randomNumberArrayHopefully[i+1]<1 || randomNumberArrayHopefully[i]>25 || 
                randomNumberArrayHopefully[i+1] >25){
                failed = true 
                break
            }
            
        }
        assert.isFalse(failed)

        
    })
})