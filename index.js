const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

$("#login-call").click(async () => {
  const username = $("login-id").val();
  const password = $("login-password").val();

  if (username === "" || password === "") return;

  const success = await loginuser(username, password);
  if (!success) {
    alert("Incorrect username and/or password provided");
    return;
  }
  document.location.href = './crud.html';
})

$("#signup-call").click(async () => {
  const username = $("#signup-id").val();
  const password = $("#signup-password").val();
  console.log('hihi');
  console.log(username);
  console.log(password);

  if (username === "" || password === "") return;

  const success = await registeruser(username, password);
  console.log('hi');
  if (!success) {
    alert("Incorrect username and/or password provided");
    return;
  }
  document.location.href = './crud.html';
})

async function loginuser(username, password) {
  const response = await axios.post('localhost:3000/auth/login', {
    username,
    password
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }); 
  const { token } = response.data;
  
  if (!token) {
    return false;
  }
  localStorage.setItem('authToken', token);
  return true;
}

async function registeruser(username, password) {
  const response = await axios.post('http://localhost:3000/auth/register', {
    username,
    password
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  const { token } = response.data;
  if (!token) {
    return false;
  }
  localStorage.setItem('authToken', token);
  return true;
}

async function isLoggedIn()  {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  return true;
}

async function autoRedirect() {
  const validLogin = await isLoggedIn();

  if (!validLogin && !location.pathname.endsWith('index.html')) {
      document.location.href = './index.html'; 
  }
  if (validLogin && location.pathname.endsWith('index.html')) {
      document.location.href = './crud.html';
  }
}

async function logout() {
    localStorage.removeItem('authToken');
}