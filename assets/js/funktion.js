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

function addTextArea(){
  let areas = document.getElementsByTagName('input')
  let n = areas.length;

  let divattr = (n/5)+1;
  let divv = document.createElement('div')
  divv.setAttribute('id',`d${divattr}`)

  let pp = document.createElement('p')
  pp.textContent = `talrække#${divattr}`
  divv.appendChild(pp)

  document.body.insertBefore(divv, document.body.firstChild) //instead of appendChild(divv)
  for(let i= n+1; i<=n+5;i++){
    divv.innerHTML+=(`<input id="${i}" type="number" value="value">`)
  }
}

function addGPwithRows(){
  let textAreas = document.getElementsByTagName('textarea')
  let arr = ''
  for(let i = 0; i<textAreas.length;i++){
    arr+=(textAreas[i].value.trim())+','
  }
  
}

