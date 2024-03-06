let url ="http://localhost:3000"

function handleSubmitForm(event) {
    event.preventDefault();
    const signUpData = {
        name: event.target.name.value,
        email: document.getElementById('email').value,
        password: event.target.password.value,
    }
    event.target.reset();
    postSignUpData(signUpData)

}


function postSignUpData(data) {
    axios.post(`${url}/user/signup`, data).then(() => {
        
    }).catch((err) => {
        console.log(err)
        const errormsg = document.getElementById('errormsg')
        errormsg.innerHTML = err.message
       
    })
}