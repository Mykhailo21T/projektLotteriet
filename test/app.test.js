import chai from 'chai'
const expect = chai.expect
const assert = chai.assert

import { addDeltager } from '../func.js'



let list = []
beforeEach(function (){
    list.length = 0
})

describe('When adding a Deltager', () =>{

    it('Should add the deltager', () =>{

        //assign
        let deltager = new Object()
        let deltager2 = new Object()

        deltager.navn = "Knud Knudsen"
        deltager.id = "1"

        deltager2.navn = "Per Hansen"
        deltager2.id = "2"

        //act
        addDeltager(deltager.navn, deltager.id, list)
        addDeltager(deltager2.navn, deltager2.id, list)

        //assert
        expect(list[0]).to.equal(deltager)
        

    })
})