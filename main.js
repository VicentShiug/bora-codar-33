const input = document.querySelector('input')
const button = document.querySelector('button')
const nameElement = document.querySelector('#name')
const photoElement = document.querySelector('#photo')
const errorElement = document.querySelector('#error')
const messageElement = document.querySelector('label[for="username"')
const textFindElement = document.querySelector('.content > label:nth-child(2)')
const inputElement = document.querySelector('.input')
const buttonElement = document.querySelector('.content > button:nth-child(6)')
const ticketElement = document.querySelector('.ticket')
const checkFind = document.createElement("img")
const iconFindUser = './assets/Confirmado.png'

button.addEventListener('click', async () => {
  const username = input.value
  const response = await fetch(`https://api.github.com/users/${username}`
  )
  const data = await response.json()
  const name = data.name
  const photo = data.avatar_url



  if (data != undefined && data.message === 'Not Found' && input.value == '') {
    errorElement.style.display = 'block'
    nameElement.style.display = 'block'
    photoElement.style.display = 'block'

  } else {
    errorElement.style.display = 'none'
    nameElement.style.display = 'block'
    photoElement.style.display = 'block'
    button.style.display = 'none'
    buttonElement.style.display = 'block'
    nameElement.innerHTML = name
    photoElement.setAttribute('src', photo)
    messageElement.innerHTML = 'Ticket gerado com sucesso'
    inputElement.style.display = 'none'
    buttonElement.innerHTML = 'Fazer Download'
    textFindElement.prepend(checkFind)
    checkFind.src = iconFindUser;
    checkFind.width = 32
    checkFind.height = 32
  }
})

buttonElement.addEventListener('click', async () => {
  await html2canvas(ticketElement).then(canvas => {
    console.log(canvas)
    const base64image = canvas.toDataURL('image/png')
    var anchor = document.createElement('a')
    anchor.setAttribute('href', base64image)
    anchor.setAttribute('download', 'ticket.png')
    anchor.click()
    anchor.remove()
  });
})