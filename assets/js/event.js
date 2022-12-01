

document.getElementsByName('lowestNum')[0].addEventListener('change', (event) => {
    document.getElementsByName('highestNum')[0].setAttribute('min', document.getElementsByName('lowestNum')[0].value )
  })

