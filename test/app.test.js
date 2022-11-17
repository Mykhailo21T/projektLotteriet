const assert = require('chai').assert
const {addDeltager} = require('../app.js')

let list = []
beforeEach(function (){
    list.length = 0
})

describe('When adding a Deltager', () =>{

    it('Should add the deltager', () =>{

        //assign
        let konkretDeltager = "Knud Knudsen"
        let konkretDeltager2 = "Per Hansen"
        //act
        addDeltager(konkretDeltager, list)
        addDeltager(konkretDeltager2, list)

        //assert
        assert.equal(list.includes(konkretDeltager), "Knud knudsen")
        assert.equal(list.includes(konkretDeltager2), "Per Hansen")
    })
})