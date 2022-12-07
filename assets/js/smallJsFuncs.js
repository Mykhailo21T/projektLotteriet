

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

  let button = document.getElementById("but1")
  button.addEventListener("click", (event)=> {
    const infoNode = document.
  })