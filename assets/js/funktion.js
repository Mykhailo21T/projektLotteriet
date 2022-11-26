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

async function tilfVT(id){
  let a = document.getElementById("1").value
  let b = document.getElementById("2").value
  let c = document.getElementById("3").value

  const responce = await fetch (`/lotteri/${id}/${a}/${b}/${c}`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (respons.status !== 201) // Posted
  throw new Error(respons.status);
  window.location.href='/gemeParticipants'
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
