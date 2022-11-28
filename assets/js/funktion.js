async function print(id){
  //id lotteri.docID
  let toId = id.split(',')
  let lid = toId[0]
  //vi skal finde medlemsID fra body
  let mid = toId[1]
  let tr = []
  //vi skal finde talrækker ud af textareaID
  
  for(i = 1; i<=5;i++){ //laver array af tal fra ta html
    tr.push(document.getElementById(i).value)
  }
  alert(JSON.stringify(tr))

  //tilføje medlem til spil og talrække til deltager og lotteri til deltager
    /*const responce = await fetch ('/tilføjDeltager/'+id,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (respons.status !== 201) // Posted
        throw new Error(respons.status);
        window.location.href='/gemeParticipants'
        */
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
  location.reload()
  if (respons.status !== 201) // Posted
    throw new Error(respons.status);
    window.location.href='/gemeParticipants'
}

function addDeltager(){
  console.log(123);

}
