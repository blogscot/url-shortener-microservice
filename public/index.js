const inputEL = document.querySelector('#originalURL')
const buttonEL = document.querySelector('button')
const outputSection = document.querySelector('#output')
const outputEL = document.querySelector('#shortURL')

const shortenerAPI = '/api/shorturl/new'

buttonEL.addEventListener('click', () => {
  const originalURL = inputEL.value.trim()

  if (originalURL === '') {
    return
  } else {
    inputEL.value = ''
  }

  const options = {
    method: 'POST',
    body: JSON.stringify({ url: originalURL }),
    headers: {
      'Content-Type': 'application/json',
    },
  }

  fetch(shortenerAPI, options)
    .then(res => res.json())
    .then(res => {
      outputEL.textContent = res.short_url
      outputSection.classList.remove('hidden')
    })
    .catch(err => console.error(err))
})

inputEL.addEventListener('input', () => {
  outputSection.classList.add('hidden')
})
