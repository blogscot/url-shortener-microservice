const inputEL = document.querySelector('#original-url')
const buttonEL = document.querySelector('button')
const outputSection = document.querySelector('#output')
const outputEL = document.querySelector('#short-url')

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
      if (res.error) {
        outputEL.textContent = `Error: invalid URL`
      } else {
        outputEL.innerHTML = `Short URL: ${res.short_url} <div id='visit-link'><a href="/api/shorturl/${res.short_url}">Go 👉</a></div>`
      }
      outputSection.classList.remove('hidden')
    })
    .catch(err => console.error(err))
})

inputEL.addEventListener('input', () => {
  outputSection.classList.add('hidden')
})
