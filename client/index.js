const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});




let url = "http://localhost:3000"

function handleSignUpForm(event) {
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

function handleSignInForm(event) {
    event.preventDefault();
    const loginData = {
        email: event.target.loginemail.value,
        password: event.target.loginPassword.value
    }
    event.target.reset();
    console.log(loginData)
    userLogin(loginData);

}

function userLogin(data) {
    axios.post(`${url}/user/login`, data).then(() => {
        alert("User Loggedin succesfully")
        localStorage.setItem("user", data.email)
    }).catch((error) => {
        console.log(error.response.data.message)
        const errormsg = document.getElementById('errormsg')
        errormsg.innerHTML = error.response.data.message
        alert(error)
    })
}