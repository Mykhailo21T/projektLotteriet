import chai from 'chai'
const expect = chai.expect
const assert = chai.assert



import { addDeltager } from '../func.js'
import { opretTalrække } from '../func.js'
import { vælgTalPåForhånd } from '../func.js'
import { addTalrækkeTilDeltager } from '../func.js'

import { findDeltager } from '../func.js'



let list = []
let deltager = new Object;
let deltager2 = new Object
beforeEach(function(){
    deltager.navn = "Knud Knudsen"
    deltager.id = 1
    deltager.talrække = []
    

    deltager2.navn = "Per Hansen"
    deltager2.id = 2
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

   
    list = []
})



describe("US2: Should show talrækker connected to a deltager", ()=>{

    
    it('Should find a konkrete deltager by the id', ()=>{
        //assign 

        addDeltager(deltager.navn, deltager.id, list)
        addDeltager(deltager2.navn, deltager2.id, list)
        
        
        
        //act & assert
       
        let konkretDeltager1 = findDeltager(1, list);
        let konkretDeltager2 = findDeltager(2, list)
    
        
       
        assert.equal(konkretDeltager1.id, 1)
        assert.equal(konkretDeltager1.navn, "Knud Knudsen")
        assert.equal(konkretDeltager2.id, 2)
        assert.equal(konkretDeltager2.navn, "Per Hansen")
     

        list=[]
    })
    it.only('Should add talrække to konkrete deltager', () =>{
        //assign
        let talrække1 = [1,2,3,4,5]
        let talrække2 = [20,22,12,8,6]
        let talrække3HalfEmpty = [23,2,8]
        let talrækkeEmpty = []

        addDeltager(deltager.navn, deltager.id, list)
        addDeltager(deltager2.navn, deltager2.id, list)

        let konkretDeltager1 = findDeltager(1, list);
        let konkretDeltager2 = findDeltager(2, list);
        //act
        addTalrækkeTilDeltager(1, talrække1,list)
        addTalrækkeTilDeltager(2, talrække1,list)
        addTalrækkeTilDeltager(2, talrække2,list)
        addTalrækkeTilDeltager(2, talrække3HalfEmpty,list)
        addTalrækkeTilDeltager(2, talrækkeEmpty,list)
        //assert


        assert.equal(konkretDeltager1.talrækker.length, 1)
        assert.equal(konkretDeltager2.talrækker.length,4)

        //Tests that the method fills the array with 5 numbers
        assert.equal(konkretDeltager2.talrækker[2].length, 5)
        assert.equal(konkretDeltager2.talrækker[3].length, 5)

      
        //Checks that the same number doesnt occur in the same talrække
        let checkIfFailed = false
        for(let i =0; i < konkretDeltager2.talrækker.length; i++){
            let testArray = konkretDeltager2.talrækker[i]
            for(let j = 0; j < testArray.length-1; j++){
                for(let q =j+1; q<testArray.length;q++){
                    console.log("First tal: " + testArray[j] + " Second tal: " + testArray[q]);
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

import { manuelVinderrække } from '../func.js'
describe('US3: Should be able to manually add a winning talrække', ()=>{

  

    

})




describe('US4: Should return an array with 5 numbers',()=>{
    it('should have an array of 5 numbers',()=>{
        //assign

        let testArray = []
        let testArrayPartialFilled = [4,3,1]
        //act

        opretTalrække(testArray)
        opretTalrække(testArrayPartialFilled)

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
                testArray[i] < 1 || testArray[i+1]<1 || testArray[i]>25 || 
                testArray[i+1] >25){
                failed = true 
                break
            }
            
        }
      assert.isFalse(failed)

        
    })
})