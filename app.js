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

let membersCollection = collection(db, 'Members')
let GamesCollection = collection(db, 'Games')
let deltagereCollection = collection(db, 'GameParticipants')
///Members start///////////////////////////////////
async function getMembers() {
  let membersQueryDocs = await getDocs(membersCollection)
  let members = membersQueryDocs.docs.map(doc => {
    let data = doc.data()
    data.docID = doc.id
    return data
  })
  return members
}


async function getMember(id) {
  const docRef = doc(db, "Members", id)
  const memberQueryDocument = await getDoc(docRef)
  let member = memberQueryDocument.data()
  member.docID = memberQueryDocument.id
  return member
}

async function addMember(member) {
  // member = {membersID: 1, Fornavn: 'Hans', Efternavn: 'Hansen'}
  const tempDocRef = await getDocs(membersCollection)
  let index = tempDocRef.size
  console.log(index);
  member.membersID = index+1
  const docRef = await setDoc(doc(db,"Members",`${index+1}_${member.fornavn}`), member)//, member.membersID
  console.log("Document witten with ID: ", `${index+1}_${member.fornavn}`);
  return `${index+1}_${member.fornavn}`//docRef.id
}
///Members slut////////////////////////////////////

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
  console.log(game);
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

app.get('/members', async (request, response) => {
  const members = await getMembers()
  response.render('members', { members: members })
})

app.get('/member/:id', async (request, response) => {
  const mID = request.params.id
  const member = await getMember(mID)
  response.render('member', { member: member })
})

app.get('/addMember', (request, response) => {
  response.render('addMember', {})
})

app.post('/addMember', async (request, response) => {
  const membersID = request.body.membersID
  const efternavn = request.body.efternavn
  const fornavn = request.body.fornavn
  // ALT hvad der kommer fra brugeren er en string
  // I skal lave en fandens masse check
  // STOL ALDRIG PÅ BRUGERDATA
  let tempMember = {
    membersID: membersID,
    efternavn: efternavn,
    fornavn: fornavn
  }
  let id = await addMember(tempMember)
  response.redirect('/members')
})

app.get('/addgame', (request, response) => {
  console.log("addgame get");
  response.render('addgame', {})
})

app.post('/addgame', async (request, response) => {
  console.log("post start");
  const date = request.body.date
  console.log(date);
  let x = request.body.lowestNum
  const lowestNum = parseInt(x)
  const highestNum = parseInt(request.body.highestNum)
  const amountOfWinningNums = parseInt(request.body.amountOfWinningNums)

  let lottery = new Game(highestNum, lowestNum, amountOfWinningNums, date)

  let id = await addgame(lottery)
  /*{
  date: date, lowestNum: lowestNum, highestNum: highestNum, amountOfWinningNums: amountOfWinningNums, deltagere: [{ reference: "members/8dzauo83ZTy5QwsT75CY" }], Vindertal: ""
})*/
  response.redirect('/Games')
})

app.get('/demoliste', async (req, res) => {
  let Games = await getDocs(db, 'Games')
  let members = Games.docs.map(doc => {
    return doc.data().id
  })
  console.log(med);

})

app.get('/game/:id/addDeltagere', async (request, response) => { //ok
  const members = await getMembers() // giver alle Members af denne game
  const game = await getgame(request.params.id) // giver game fra db med id fra input
  response.render('addDeltagere', { members: members, game: game })
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
  let gp = await setDoc(doc(db,"GameParticipants",`${dataQ.game}_${dataQ.member}`), dataQ)
  const docRef = doc(db, "Games", dataQ.game)
  let docGet = await getDoc(docRef)
  let docData = docGet.data()
  let pl = docData.participantList
  pl.push(`${dataQ.game}_${dataQ.member}`)
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






