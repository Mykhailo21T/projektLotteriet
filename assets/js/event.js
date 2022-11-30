

document.getElementsByName('lowestNum')[0].addEventListener('change', (event) => {
    console.log(document.getElementsByName('lowestNum')[0].value)
    document.getElementsByName('highestNum')[0].setAttribute('min', document.getElementsByName('lowestNum')[0].value )
    console.log(document.getElementsByName('highestNum')[0].getAttribute('min'))
  })

