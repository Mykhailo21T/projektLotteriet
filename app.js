// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { setDoc, getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where, updateDoc } from "firebase/firestore";
import { Game } from "./classes.js/game.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmlyw9TMKl-ign_hYLhAsaPmdsXlzPs4w",
  authDomain: "projektlotteriet.firebaseapp.com",
  projectId: "projektlotteriet",
  storageBucket: "projektlotteriet.appspot.com",
  messagingSenderId: "556554582591",
  appId: "1:556554582591:web:80c6dd7ee6e2b80bf4d68a",
  measurementId: "G-J8D1FB7W3N"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase)

import express, { request, response } from 'express'
const app = express()
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('assets'))


// Firebase funktioner

let medlemmerCollection = collection(db, 'Medlemmer')
let lotterierCollection = collection(db, 'Lotterier')
let deltagereCollection = collection(db, 'GameParticipants')
///medlemmer start///////////////////////////////////
async function getMedlemmer() {
  let medlemmerQueryDocs = await getDocs(medlemmerCollection)
  let medlemmer = medlemmerQueryDocs.docs.map(doc => {
    let data = doc.data()
    data.docID = doc.id
    return data
  })
  return medlemmer
}


async function getMedlem(id) {
  const docRef = doc(db, "Medlemmer", id)
  const medlemQueryDocument = await getDoc(docRef)
  let medlem = medlemQueryDocument.data()
  medlem.docID = medlemQueryDocument.id
  return medlem
}

async function addMedlem(medlem) {
  // Medlem = {medlemsID: 1, Fornavn: 'Hans', Efternavn: 'Hansen'}
  const docRef = await addDoc(collection(db, "Medlemmer"), medlem)//, medlem.medlemsID
  console.log("Document witten with ID: ", docRef.id);
  return docRef.id
}
///medlemmer slut////////////////////////////////////

///lotterier start///////////////////////////////////
async function getLotterier() { // henter lotterier fra db Lotterier i firebase
  let lotterierQueryDocs = await getDocs(lotterierCollection)
  let lotterier = lotterierQueryDocs.docs.map(doc => {
    let data = doc.data()
    data.docID = doc.id
    return data
  })
  return lotterier
}
app.get('/lotteri/:id', async (request, response) => { // viser indhold af hvert enkelte lotteri
  const lID = request.params.id
  const lotteri = await getLotteri(lID)
  response.render('lotteri', { lotteri: lotteri })
})
async function getLotteri(id) { // henter lotteri med bestemt id fra db Lotterier i firebase
  const docRef = doc(db, "Lotterier", id)
  const lotteriQueryDocument = await getDoc(docRef)
  let lotteri = lotteriQueryDocument.data()
  lotteri.docID = lotteriQueryDocument.id
  console.log("Deltagere >>>>>>>>>>>>>>>>");
  console.log(lotteri.deltagere);
  return lotteri
}




async function addLotteri(lotteri) {
  // lotteri = {date: dato}

  const docRef = await setDoc(doc(db, "Lotterier",`${lotteri.date}`), lotteri)//,
  console.log("Document witten with ID: ", lotteri.date);
  return lotteri.date
}

///lotterier slut///////////////////////////////////

///deltagere start//////////////////////////////////
async function getDeltagere() { // henter lotterier fra db Lotterier i firebase
  let lotterierQueryDocs = await getDocs(deltagereCollection)
  let deltagere = lotterierQueryDocs.docs.map(doc => {
    let data = doc.data()
    data.docID = doc.id
    return data
  })


  return deltagere
}

async function getDeltager(id) { //henter deltager med bestemt id
  const docRef = doc(db, "GameParticipants", id)
  const deltagerQueryDocument = await getDoc(docRef)
  let deltager = deltagerQueryDocument.data()
  deltager.docID = deltagerQueryDocument.id
  return deltager
}

async function addDeltager(lID, mID) {
  const gpInfo = { // en gameParticipant objekt
    game: lID,
    member: mID
  }

  const docRef = await addDoc(collection(db, "GameParticipants"), gpInfo) // man skal ikke glemme "collection"!

  let gp = await getGameParticipants(lID) // array


  const thisLotteri = doc(db, "Lotterier", lID)

  let temp = await updateDoc(thisLotteri, { // opdaterer lotteri med ny deltager
    deltagere: gp
  })
  console.log('+ deltager');
  return gpInfo
}

///deltagere slut///////////////////////////////////
async function getGameParticipants(lID) {
  // TODO deltagere af en lotteri skal opdateres fra gameparticipants med samme lotteri link
  console.log(11);
  const docRef = collection(db, "GameParticipants")
  console.log(12);
  console.log(lID);
  const GameParticipantsQueryDocument = await getDocs(docRef)//data() virker ikke
  console.log(13);

  let lotterietsGP = []
  console.log('gp før map');

  GameParticipantsQueryDocument.forEach((gameParticipant) => { // samle reference fra gp i array
    let data = gameParticipant.data()
    console.log(data);
    if (data.game == lID)
      lotterietsGP.push(data.member)
  })

  console.log('gp efter map');
  return lotterietsGP
}
/// gameParticipants start///////////////////////////////////

/// gameParticipants slut////////////////////////////////////

//--------------VINDERTAL_START---------------------
async function addVinderTal(lid, a, b, c) {
  const docRef = doc(db, "Lotterier", lid)
  const opdatere = await updateDoc(docRef, { Vindertal: [a, b, c] })
  console.log("opdateret");

}
//--------------VINDERTAL_SLUT----------------------


// Express Endpoint

app.get('/medlemmer', async (request, response) => {
  const medlemmer = await getMedlemmer()
  response.render('medlemmer', { medlemmer: medlemmer })
})

app.get('/medlem/:id', async (request, response) => {
  const mID = request.params.id
  const medlem = await getMedlem(mID)
  response.render('medlem', { medlem: medlem })
})

app.get('/addMedlem', (request, response) => {
  response.render('addMedlem', {})
})

app.post('/addMedlem', async (request, response) => {
  const medlemsID = request.body.medlemsID
  const Fornavn = request.body.Fornavn
  const Efternavn = request.body.Efternavn
  // ALT hvad der kommer fra brugeren er en string
  // I skal lave en fandens masse check
  // STOL ALDRIG PÅ BRUGERDATA
  let id = await addMedlem({ medlemsID: medlemsID, Fornavn: Fornavn, Efternavn: Efternavn })
  response.redirect('/medlemmer')
})

app.get('/addLotteri', (request, response) => {
  response.render('addLotteri', {})
})

app.post('/addLotteri', async (request, response) => {
  const date = request.body.date
  console.log(date);
  let x = request.body.lowestNum
  const lowestNum = parseInt(x)
  const highestNum = parseInt(request.body.highestNum)
  const amountOfWinningNums = parseInt(request.body.amountOfWinningNums)

  let lottery = new Game(highestNum,lowestNum,amountOfWinningNums,date)

  let id = await addLotteri(lottery)
    /*{
    date: date, lowestNum: lowestNum, highestNum: highestNum, amountOfWinningNums: amountOfWinningNums, deltagere: [{ reference: "Medlemmer/8dzauo83ZTy5QwsT75CY" }], Vindertal: ""
  })*/
  response.redirect('/lotterier')
})

app.get('/demoliste', async (req, res) => {
  let lotterier = await getDocs(db, 'Lotterier')
  let medlemmer = lotterier.docs.map(doc => {
    return doc.data().id
  })
  console.log(med);

})

app.get('/lotteri/:id/addDeltagere', async (request, response) => { //ok
  const medlemmer = await getMedlemmer() // giver alle medlemmer af denne lotteri
  const lotteri = await getLotteri(request.params.id) // giver lotteri fra db med id fra input
  response.render('addDeltagere', { medlemmer: medlemmer, lotteri: lotteri })
})

app.post('/addDeltagere', async (request, response) => {
  //const date = request.body.date
  //console.log(date);
  // ALT hvad der kommer fra brugeren er en string
  // I skal lave en fandens masse check
  // STOL ALDRIG PÅ BRUGERDATA
  //let id = await addLotteri({date:date, Deltagere: null, Talrække: null, Vindertal: null})
  response.redirect('/deltagere')
})

app.get('/sortering', (req, res) => {
  res.render('sortering')
})

app.get('/deltagere', async (req, res) => {
  const deltagere = await getDeltagere()
  res.render('deltagere', { deltagere: deltagere })
})

app.get('/deltager/:id', async (request, response) => {
  const mID = request.params.id
  const deltager = await getDeltager(mID)
  response.render('deltager', { deltager: deltager })
})


app.get('/lotterier', async (req, res) => {
 
  const alleLotterier = await getLotterier();
  let upcoming = []
  let previous = []
  let todaysLottery = undefined
  let todaysDate = new Date()
  const concreteDate = todaysDate.getUTCFullYear() + "-" + (todaysDate.getUTCMonth() + 1) + "-" + todaysDate.getUTCDate()
  let lot = { 
      upcoming: upcoming, 
      previous: previous, 
      todaysLottery: todaysLottery 
    }
  for (let lottery of alleLotterier) {
    const lotteryDate = new Date(lottery.date)
    const comparisonDate = new Date(concreteDate)

    //ComparisonDate is today, so if its lower then lotterydate then its the previous lottery dates
    if (comparisonDate > lotteryDate) {
      previous.push(lottery)

    } else if (comparisonDate < lotteryDate) { //This section is for future lotteries
      upcoming.push(lottery)
    } else if (comparisonDate == lotteryDate) {
      todaysLottery = lottery
    }

  }
  
  res.render('lotterier', lot)
})
app.get('/lotteri/:id', async (request, response) => {
  const lID = request.params.id
  const lotteri = await getLotteri(lID)
  response.render('lotteri', { lotteri: lotteri })
})

app.get('/:lid/:mid', async (request, response) => { //ok
  const lID = request.params.lid
  const mID = request.params.mid
  const deltager = await addDeltager(lID, mID)
  response.render('deltager', { deltager: deltager })
})


////talraekke
app.get('/lotteri/:lotteriId/addTR', async (request, response) => { //ok
  let inputId = request.params.lotteriId
  const docRef = doc(db, "Lotterier", `${inputId}`);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data()
  console.log(data);
  response.render('opretTR', { data: data, docID: inputId })
})

app.post('/lotteri/:lotId/:tal1/:tal2/:tal3', async (req, res) => {
  let a = req.params.tal1
  let b = req.params.tal2
  let c = req.params.tal3
  let id = req.params.lotId
  let vt = await addVinderTal(id, a, b, c)
  res.redirect(`/lotteri/${id}`)
})

app.get('/', (req, res) => {
  res.render('start')
})

app.delete('/deleteVT/:id', async (req, res) => {//test
  console.log(11111);
  const docRef = doc(db, "Lotterier", req.params.id)
  let go = await deleteDoc(docRef, {
    Vindertal: []
  })

})

app.listen(8000, () => {
  console.log("lytter på port 8000");
})



///tilføje deltagere til lotteri
// TODO tilføje talrækker til lotteri

/*
const cityRef = db.collection('cities').doc('DC');

// Set the 'capital' field of the city
const res = await cityRef.update({capital: true});
*/






