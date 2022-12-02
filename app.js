// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { setDoc, getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where, updateDoc } from "firebase/firestore";
import { Game } from "./classes.js/game.js";
import fetch from 'node-fetch'
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
let GamesCollection = collection(db, 'Games')
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

///Games start///////////////////////////////////
async function getGames() { // henter Games fra db Games i firebase
  let GamesQueryDocs = await getDocs(GamesCollection)
  let Games = GamesQueryDocs.docs.map(doc => {
    let data = doc.data()
    data.docID = doc.id
    return data
  })
  return Games
}
app.get('/game/:id', async (request, response) => { // viser indhold af hvert enkelte game
  const lID = request.params.id
  const game = await getgame(lID)
  response.render('game', { game: game })
})
async function getgame(id) { // henter game med bestemt id fra db Games i firebase
  const docRef = doc(db, "Games", id)
  const gameQueryDocument = await getDoc(docRef)
  let game = gameQueryDocument.data()
  game.docID = gameQueryDocument.id
  //console.log("Deltagere hentes");
  //console.log("participantList: "+game.participantList);
  return game
}

async function firebaseGameConverter(gID) {
// Firestore data converter
const gameConverter = {
    toFirestore: (game) => {
        return game 
    },
    fromFirestore: (snapshot) => {
        const data = snapshot.data();
        return new Game(data.highestNum, data.lowestNum, data.amountOfWinningNums,data.winnerArray,data.date,data.participantList,data.concreteWinners);
    }
};
const ref = doc(db, "Games", gID ).withConverter(gameConverter);
const docSnap = await getDoc(ref);
if (docSnap.exists()) {
  // Convert to City object
  const game = docSnap.data();
  // Use a City instance method
  console.log("G: "+game.toString());
} else {
  console.log("No such document!");
}

    return docSnap
}




async function addgame(game) {
  // game = {date: dato}

  const docRef = await setDoc(doc(db, "Games", `${game.date}`), JSON.parse(JSON.stringify(game)))//,
  console.log("Document witten with ID: ", game.date);
  return game.date
}

///Games slut///////////////////////////////////

///deltagere start//////////////////////////////////
async function getDeltagere() { // henter Games fra db Games i firebase
  let GamesQueryDocs = await getDocs(deltagereCollection)
  let deltagere = GamesQueryDocs.docs.map(doc => {
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

async function addDeltager(gID, mID, name) {

let retrivedGameData = await firebaseGameConverter(gID)

let data = retrivedGameData.data()

data.addParticipant(name, mID, gID)

const docRef = doc(db, "Games", gID)

const update = await updateDoc(docRef, data)

}

///deltagere slut///////////////////////////////////
async function getGameParticipants(lID) {
  // TODO deltagere af en game skal opdateres fra gameparticipants med samme game link
  console.log(11);
  const docRef = collection(db, "GameParticipants")
  console.log(12);
  console.log(lID);
  const GameParticipantsQueryDocument = await getDocs(docRef)//data() virker ikke
  console.log(13);

  let gameetsGP = []
  console.log('gp før map');

  GameParticipantsQueryDocument.forEach((gameParticipant) => { // samle reference fra gp i array
    let data = gameParticipant.data()
    console.log(data);
    if (data.game == lID)
      gameetsGP.push(data.member)
  })

  console.log('gp efter map');
  return gameetsGP
}
/// gameParticipants start///////////////////////////////////

/// gameParticipants slut////////////////////////////////////

//--------------VINDERTAL_START---------------------
async function addVinderTal(lid, a, b, c) {
  console.log("vindertal tilføjes start");
  const docRef = doc(db, "Games", lid)
  const opdatere = await updateDoc(docRef, { winnerArray: [a, b, c] })
  console.log("vindertal tilføjes slut");

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

app.get('/addgame', (request, response) => {
  response.render('addgame', {})
})

app.post('/addgame', async (request, response) => {
  const date = request.body.date
  console.log(date);
  let x = request.body.lowestNum
  const lowestNum = parseInt(x)
  const highestNum = parseInt(request.body.highestNum)
  const amountOfWinningNums = parseInt(request.body.amountOfWinningNums)

  let lottery = new Game(highestNum, lowestNum, amountOfWinningNums, date)

  let id = await addgame(lottery)
  /*{
  date: date, lowestNum: lowestNum, highestNum: highestNum, amountOfWinningNums: amountOfWinningNums, deltagere: [{ reference: "Medlemmer/8dzauo83ZTy5QwsT75CY" }], Vindertal: ""
})*/
  response.redirect('/Games')
})

app.get('/demoliste', async (req, res) => {
  let Games = await getDocs(db, 'Games')
  let medlemmer = Games.docs.map(doc => {
    return doc.data().id
  })
  console.log(med);

})

app.get('/game/:id/addDeltagere', async (request, response) => { //ok
  const medlemmer = await getMedlemmer() // giver alle medlemmer af denne game
  const game = await getgame(request.params.id) // giver game fra db med id fra input
  response.render('addDeltagere', { medlemmer: medlemmer, game: game })
})

app.post('/addDeltagere', async (request, response) => {
  //const date = request.body.date
  //console.log(date);
  // ALT hvad der kommer fra brugeren er en string
  // I skal lave en fandens masse check
  // STOL ALDRIG PÅ BRUGERDATA
  //let id = await addgame({date:date, Deltagere: null, Talrække: null, Vindertal: null})
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


app.get('/Games', async (req, res) => {

  const alleGames = await getGames();
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
  for (let lottery of alleGames) {
    const lotteryDate = new Date(lottery.date)
    const comparisonDate = new Date(concreteDate)

    //ComparisonDate is today, so if its lower then lotterydate then its the previous lottery dates
    if (comparisonDate > lotteryDate) {
      previous.push(lottery)

    } else if (comparisonDate < lotteryDate) { //This section is for future gamees
      upcoming.push(lottery)
    } else if (comparisonDate == lotteryDate) {
      todaysLottery = lottery
    }

  }

  res.render('games', lot)
})
app.get('/game/:id', async (request, response) => {
  const lID = request.params.id
  const game = await getgame(lID)
  response.render('game', { game: game })
})

app.get('/:lid/:mid', async (request, response) => { //ok
  const lID = request.params.lid
  const mID = request.params.mid
  const name = request.params.Fornavn
  const deltager = await addDeltager(name,lID, mID)
  response.render('deltager', { deltager: deltager })
})


////talraekke
app.get('/game/:gameId/addTR', async (request, response) => { //ok
  let inputId = request.params.gameId
  const docRef = doc(db, "Games", `${inputId}`);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data()
  console.log(data);
  response.render('opretTR', { data: data, docID: inputId })
})

app.post('/sendRows', async (req, res) => {
  // TODO to  
  let dataQ = req.body
  console.log(dataQ);
  let gp = await addDoc(deltagereCollection, dataQ)
  const docRef = doc(db, "Games", dataQ.game)
  let docGet = await getDoc(docRef)
  let docData = docGet.data()
  let pl = docData.participantList
  pl.push(gp.id)
  console.log(pl);
  let game = await updateDoc(docRef, { participantList: pl })
  console.log(222);
  res.status(200)
  res.end()
})

app.post('/game/:lotId/:tal1/:tal2/:tal3', async (req, res) => {
  let a = req.params.tal1
  let b = req.params.tal2
  let c = req.params.tal3
  let id = req.params.lotId
  let vt = await addVinderTal(id, a, b, c)
  res.redirect(`/game/${id}`)
})

app.get('/', (req, res) => {
  res.render('start')
})

app.delete('/deleteVT/:id', async (req, res) => {//test
  console.log(11111);
  const docRef = doc(db, "Games", req.params.id)
  let go = await deleteDoc(docRef, {
    Vindertal: []
  })

})

app.listen(8000, () => {
  console.log("lytter på port 8000");
})



///tilføje deltagere til game
// TODO tilføje talrækker til game

/*
const cityRef = db.collection('cities').doc('DC');

// Set the 'capital' field of the city
const res = await cityRef.update({capital: true});
*/






