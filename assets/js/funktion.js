
async function print(id) {
  //id lotteri.docID
  let toId = id.split(',')
  let lid = toId[0]
  //vi skal finde medlemsID fra body
  let mid = toId[1]
  let tr = []
  //vi skal finde talrækker ud af textareaID

  for (i = 1; i <= 5; i++) { //laver array af tal fra ta html
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

async function tilfVT(id) {
  let a = document.getElementById("1").value.trim
  let b = document.getElementById("2").value.trim
  let c = document.getElementById("3").value.trim

  const responce = await fetch(`/lotteri/${id}/${a}/${b}/${c}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  location.reload()
  if (respons.status !== 201) // Posted
    throw new Error(respons.status);
  window.location.href = '/gemeParticipants'
}

function addDeltager() {
  console.log(123);

}

function addRows() {
  console.log(111);
  let main = document.getElementById('main')
  let tempNr = main.children.length + 1;
  let divv = document.createElement('div')
  divv.setAttribute('id', `d${tempNr}`)
  main.appendChild(divv)

  let pp = document.createElement('p')
  pp.textContent = `Talrække ${tempNr}`
  divv.appendChild(pp)

  //document.body.insertBefore(divv, document.body.firstChild) //instead of appendChild(divv)
  for (let i = 1; i <= 5; i++) {
    let inp = document.createElement('input')
    inp.setAttribute('id', `${i}`)
    inp.setAttribute('type', 'number')
    inp.setAttribute('value', 'value')
    divv.appendChild(inp)
  }
  console.log(123);
}


function getArray(div) {
  let array = []
  for (input in div) {
    array.push(input.value)
  }
  return array
}

async function addGPwithRows(lidmid) {
  //TODO 
  console.log(lidmid);
  let split = lidmid.split(',')
  let lid = split[0]
  let mid = split[1]
  
  let main = document.getElementById('main')
  let mChi = main.children
  let toDimArr = {}

  for (let i = 0;i<mChi.length;i++) {
    let tempArr = []
    let divChi = mChi[i].children
    for (let j = 1;j<divChi.length;j++) {
      
      tempArr.push(divChi[j].value)
    }
    toDimArr[i]=(tempArr)
  }
  let obj = {
    game: lid,
    member: mid,
    rows: toDimArr
  }
  console.log("before postf");
  await postF ("/sendRows",obj)
  
  console.log("after postf");
  location.replace("/game/"+lid) 
}

async function postF(url,obj){
  const result = await fetch(url,{
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  });
}

function findMember(){
  console.log(123);
  let input = document.getElementById('sercher').value
  console.log(input);
  let buttons = document.querySelectorAll('.memberButton')
  buttons.forEach(button=>{
    if(!button.textContent.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())){
      button.setAttribute('style','display:none')
    }else{
      button.setAttribute('style','display:block')
    }
  })
}
