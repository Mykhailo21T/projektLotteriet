
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
  console.log("tilfVT(id) start");
  let a = document.getElementById("winner1").value
  let b = document.getElementById("winner2").value
  let c = document.getElementById("winner3").value

  const responce = await fetch(`/game/${id}/${a}/${b}/${c}`, {
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

async function addGPwithRows(game) {
  //TODO 
  let lid = game.docID
  let mid = document.getElementById('hiddenmember').value
  //
  //let rb = document.querySelectorAll('gruppeNavn')
  //let selected = rb.find(button => button.selected).value
  
  //
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
  let checkboxes =  document.querySelectorAll('input[type=checkbox]:checked')
  checkboxes.forEach((box) => {
    return toDimArr[Object.keys(toDimArr).length]=(box.value.split(','))
  })
  let obj = {
    game: lid,
    member: mid,
    rows: toDimArr
  }
  console.log("before postf");
  await postF ("/sendRows",obj)
  
  console.log("after postf");
  //location.replace("/game/"+lid) 
  alert("talrækker er blevet sendt"+game.date)
  location.reload()
}

function visMemberRows(member){
  document.querySelectorAll('.memberdiv').forEach(el =>el.remove())
  let div = document.createElement('div')
  div.setAttribute('class','memberdiv')
  let inp = document.createElement('input')
  inp.setAttribute('type','radio')
  inp.setAttribute('selected','true')
  inp.setAttribute('style','display:none')
  inp.setAttribute('value',`${member.docID}`)
  inp.setAttribute('id','hiddenmember')
  div.appendChild(inp)
  for(let row in member.rows){
    let lbl = document.createElement('label')
    lbl.innerHTML=`${member.rows[row]}`
    let checkbox = document.createElement('input')
    lbl.appendChild(checkbox)
    checkbox.setAttribute('type','checkbox')
    checkbox.setAttribute('value',`${member.rows[row]}`)
    
    div.appendChild(lbl)
  }
  let button = document.getElementById(member.fornavn)
  button.parentNode.insertBefore(div,button.nextSibling)
  console.log("rows showed and member "+member.fornavn+" selected");
}

async function postF(url,obj){
  const result = await fetch(url,{
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  });
}

function findMember(){
  document.querySelectorAll('.memberdiv').forEach(element => element.remove())
  let input = document.getElementById('sercher').value
  let buttons = document.querySelectorAll('.memberButton')
  buttons.forEach(button=>{
    if(!button.textContent.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())){
      button.setAttribute('style','display:none')
      document.getElementById(button.textContent).setAttribute('style','display:none')
    }else{
      button.setAttribute('style','display:block')
      document.getElementById(button.textContent).setAttribute('style','display:block')
    }
  })
}
