import { async } from "@firebase/util"

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

async function tilføjDeltager(id){

}
