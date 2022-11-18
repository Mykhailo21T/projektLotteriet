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
        const liste = list
        assert.isNotEmpty(liste, "List is not empty")


        let found = false
        for(let i of list){
            if(i.id == deltager.id && i.navn == deltager.navn){
                found = true
                break
            }
        }

        assert.isTrue(found, "Deltager 1 er fundet")

        found = false
        for(let i of list){
            if(i.id == deltager2.id && i.navn == deltager2.navn){
                found = true
                break
            }
        }
        
       assert.isTrue(found, "Deltager 2 fundet")
       assert.isNotEmpty(list)
       assert.equal(list.length,2)

    })

   
})

import { addTalrækkeTilDeltager } from '../func.js'

import { findDeltager } from '../func.js'

describe("US2: Should show talrækker connected to a deltager", ()=>{

    
    it('Should see talrækker a deltager have', ()=>{
        //assign
        
        let talrække1 = [1,2,3,4,5]
        let talrække2 = [20,22,12,8,6]


        //act
        addTalrækkeTilDeltager(deltager.id, talrække1)
        addTalrækkeTilDeltager(deltager2.id,talrække2)
        addTalrækkeTilDeltager(deltager2.id,talrække1)
     
        //assert
        let konkretDeltager1 = findDeltager(deltager.id)
        assert.equal(konkretDeltager1.talrækker[0], talrække1)

        let konkretDeltager2 = findDeltager(deltager2.id)
        assert.equal(konkretDeltager2.talrækker[0],talrække2)
        assert.equal(konkretDeltager2.talrækker[1],talrække1)
        

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