import chai from 'chai'
const expect = chai.expect
const assert = chai.assert



import { addDeltager } from '../func.js'
import { opretTalrække } from '../func.js'
import { vælgTalPåForhånd } from '../func.js'
import { addTalrækkeTilDeltager } from '../func.js'
import { findVinder } from '../func.js'


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
    list = []

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
     

    
    })
    it('Should add talrække to konkrete deltager', () =>{
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

        addDeltager(deltager.navn, deltager.id, list)
        addDeltager(deltager2.navn, deltager2.id, list)
        let vinderen = addDeltager("Hans", 3, list)

        addTalrækkeTilDeltager(1,talrække1,list)
        addTalrækkeTilDeltager(2,talrække2,list)
        addTalrækkeTilDeltager(3,talrække3,list)

        let antalVindetal = 3

        //act
        let faktiskeVinder = findVinder(antalVindetal,list,vinderRække)

        //assert
        assert.equal(faktiskeVinder[0], vinderen)
        assert.equal(faktiskeVinder.length, 1)

        let vinderensVindertal = []
        let stopSearch = false;


        //en check function der tjekker hver deltagers talrækkers tal individuelt og ser om de matcher et tal i vinderrækken
        function findVindereMedVindertal(vinderensVindertal,antalVindetal,list, vinderRække){
        while(vinderensVindertal.length < antalVindetal || stopSearch == false){
            for(let i = 0; i < list.length; i++){
                for(let j = 0; j < list[i].talrækker.length; j++){
                    vinderensVindertal = []
                    for( let q in vinderRække){
                        if(list[i].talrækker[j] == q){
                            vinderensVindertal.push(q)
                        }
                    }
                }
            }
            stopSearch == true
        }
    }
    
        findVindereMedVindertal(vinderensVindertal, antalVindetal,list,vinderRække)
        assert.isTrue(vinderensVindertal.includes(12))
        assert.isTrue(vinderensVindertal.includes(3))
        assert.isTrue(vinderensVindertal.includes(6))
        

        
    })

    it('Should return more vindere', ()=>{

         //assign
         let vinderRække = [12,3,6]

         let talrække1 = [1,2,3,4,5]
         let talrække2 = [20,22,12,8,6] // vinder med 2 rigtige
         let talrække3 = [6,9,4,3,12] // vinder med 3 rigtige
         let talrække4 = [6,24,12,4,3] //vinder med 3 rigtige
 
         addDeltager(deltager.navn, deltager.id, list)
         addDeltager(deltager2.navn, deltager2.id, list)
         let vinder1 = addDeltager("Hans", 3, list)
         let vinder2 = addDeltager("Grete", 4, list)
 
         addTalrækkeTilDeltager(1,talrække1,list)
         addTalrækkeTilDeltager(2,talrække2,list)
         addTalrækkeTilDeltager(3,talrække3,list)
         addTalrækkeTilDeltager(4,talrække4,list)
 
         let antalVindertal = 3
 
         //act
         let faktiskeVindere = findVinder(antalVindertal,list,vinderRække)
 
         //assert
         assert.equal(faktiskeVindere[0], vinder1)
         assert.equal(faktiskeVindere[1], vinder2)
         assert.equal(faktiskeVindere.length, 2)
                
        //en check function der tjekker hver deltagers talrækkers tal individuelt og ser om de matcher et tal i vinderrækken
        //Hvis deltageren har det valgte antal rigtige tal i en af sine rækker bliver deltageren puttet i liste af samlede vindere
         function findVindereMedVindertal(vinderRække,antalVindertal,list){
         let vindere = []

            for(let i = 0; i < list.length; i++){
                for(let j = 0; j<list[i].talrækker[j].length; j++){
                    let temp = []
                     if(temp.length < antalVindertal){
                         for(let q of vinderRække){
                            for(let k of list[i].talrækker[j]) {
                                if (k == q){
                                    temp.push(k)
                                }
                            }
                    }
                } 
                if(temp.length == antalVindertal){
                    vindere.push(findDeltager(list[i].id,list))
               }
               
                temp = []

            }
            
        }

        return vindere
        }

        let Vindere1 = findVindereMedVindertal(vinderRække,3,list)
        let vindere2 = findVindereMedVindertal(vinderRække, 2, list)

        assert.equal(Vindere1.length, 2)
        assert.equal(vindere2.length, 3)


    })
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