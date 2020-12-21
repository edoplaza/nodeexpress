function getWeather() {
  const weatherForm = document.querySelector('form');
  const search = document.querySelector('input');
  const messageOne = document.querySelector('#messageOne');
  const messageTwo = document.querySelector('#messageTwo');
  weatherForm.addEventListener('submit', function(e){
    e.preventDefault();
    const location = search.value
    if (location !==''){
      fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
          response.json().then(data => {
            if (data.error) {
              console.log(error)
              messageOne.textContent = data.error
            } else {
              console.log(data)
              messageOne.textContent = data.location
              messageTwo.textContent = data.forecast
            }
          })
        })
      }
  })
}