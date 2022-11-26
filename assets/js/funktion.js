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

function tilfVT(id){
   alert(id)
  /*const respons = await fetch('/deleteVT/' + id, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (respons.status !== 201) // Deleted
    throw new Error(respons.status);
    window.location.href='/lotterier'*/
}

function addDeltager(){
  console.log(123);

}
