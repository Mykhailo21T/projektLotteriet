

function disableInputField() {
    document.getElementById("inputField").disabled = true;
}

export function searchMemberByName(name) {
 
    name = name.toLowerCase();

    const results = list.filter(obj => obj.name.toLowerCase().startsWith(name));

    return results;
  }