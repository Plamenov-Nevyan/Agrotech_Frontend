export  function create(e){
    e.preventDefault()
    let data = new FormData(e.currentTarget)
    let userSerialized = sessionStorage.getItem('userData')
    let user = JSON.parse(userSerialized)


    fetch('http://localhost:5000/publications/create', {
       method: 'POST',
       headers: {'X-Authorization':user.accessToken},
       body: data
    })
    .then(() => console.log(`aa`))
    .catch(err => console.log(err))
 
}