export  function create(e, publicationType){
    e.preventDefault()
    let formData = Object.fromEntries(new FormData(e.currentTarget))
    formData.publicationType = publicationType
    let userSerialized = sessionStorage.getItem('userData')
    let user = JSON.parse(userSerialized)
    fetch('http://localhost:5000/publications/create', {
       method: 'POST',
       headers: {'Content-Type':'application/json', 'X-Authorization':user.accessToken},
       body: JSON.stringify(formData)
    })
    .then((resp) => resp.json())
    .catch(err => console.log(err))
 
}