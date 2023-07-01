const form = document.getElementById('userData');
const embed = document.getElementById('check');
const fullName = document.querySelector('[name=fullName]')
const email = document.querySelector('[name=email]')
const whichSocialMedia = document.querySelectorAll('[name=whichSocialMedia]')
console.log(fullName)

form.addEventListener('submit', async e =>{
  e.preventDefault()
  const formCheck = new FormData(e.target)
  const userData = {
    fullName: formCheck.get('fullName').trim() !== '' && formCheck.get('fullName'),
    email: formCheck.get('email').trim() !== '' && formCheck.get('email'),
    whichSocialMedia: formCheck.get('whichSocialMedia') !== '' && formCheck.get('whichSocialMedia')
  }
  if ((userData.fullName || userData.email || userData.whichSocialMedia) !== null ){
    const file = await axios.post('http://127.0.0.1:3000/Api/v1/user/save', userData,{
      responseType: 'blob',
    })
    const url = URL.createObjectURL(file.data)
    window.open(url, '__blank')
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'Free-Ebook 2023';
    // a.click()
    // a.remove()
    URL.revokeObjectURL(url)
    fullName.value = "";
    email.value = ""
    whichSocialMedia.forEach(Element=> Element.checked = false)
  }
})