let url = "http://localhost:3000"

function handleEmailSubmitForm(event) {
    console.log("inside Submit Email")
    event.preventDefault();
    const email = event.target.email.value;
    axios.post(`${url}/password/forgotpassword`, email).then((response) => {
        console.log(response)
        alert('please check your inbox for password reset link')
    }).catch((err) => {
        console.log(err)
    })

}
