import { async } from "@firebase/util"
import { render } from "pug";

async function tilføjDeltager(id){
    const responce = await fetch ('/tilføjDeltager/'+id,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (respons.status !== 201) // Posted
        throw new Error(respons.status);
        window.location.href='/gemeParticipants'
}

async function tilføjVT(id){

}

function addDeltager(){
  console.log(123);

}
