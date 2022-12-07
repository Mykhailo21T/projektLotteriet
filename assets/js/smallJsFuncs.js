

function disableInputField() {
    document.getElementById("inputField").disabled = true;
}

export function searchMemberByName(name="", list) {
 
    name = name.toLowerCase();
    console.log("Name: " + name);

    const results = list.filter(obj => {
        // Check if obj has a name property and it is a string
        if (typeof obj.name === 'string' && 'name' in obj) {
          // If it does, return true if it starts with the search term
          return obj.name.toLowerCase().startsWith(name);
        } else if(name == ""){
            return list
        } 
        else {
          // If it does not, return false
          return false;
        }
      })

    return results;
  }

  export async function firebaseGameConverter(gID) {
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

    export async function addVinderTal(gID, a, b, c) {
      const game = await firebaseGameConverter(gID)
      let gameX = game.data()
      gameX.winnerArray = [a,b,c]
      console.log("vindertal tilføjes start");
      const docRef = doc(db, "Games", gID)
      const opdatere = await updateDoc(docRef, gameX)
      console.log("vindertal tilføjes slut");
    
    }

    let button = document.getElementById("but1")
  button.addEventListener("click", (event)=> {
    const infoNode = document.
  })