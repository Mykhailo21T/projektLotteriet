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
  pp.textContent = `talrække#${tempNr}`
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

function addGPwithRows() {
  let main = document.getElementById('main')
  let toDimArr = []

  for (n in main.children) {
    let tempArr = []
    for (element in n.children) {
      tempArr.push(element.value)
    }
    toDimArr.push(tempArr)
  }
  console.log(toDimArr);
}

