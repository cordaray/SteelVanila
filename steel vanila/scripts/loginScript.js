let users = [
  {
    id: 1,
    username: "dacord97@hotmail.com",
    password: "12345678",
  },
];

//LOG IN VALIDATION
logUsername.addEventListener("keypress", (ev) => {
  console.log("changed", ev.target.value);
});

btnLogin.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (logUsername.value == "" || logPassword.value == "") {
    showWarning("User/Password is empty", "logInformation");
    return;
  }
  let result = logIn(logUsername.value, logPassword.value);
  result !== undefined
    ? window.location.replace("./pages/index.html")
    : showWarning("Username/Password did not match", "logInformation");
});

btnRegister.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (regUsername.value.length < 5) {
    return;
  }
  if (regPassword.value !== regConfirmPassword.value) {
    showWarning("Passwords are not the same, please check", "regInformation");
    return;
  }
  if (checkUsername(regUsername.value)) {
    showWarning("Username already taken", "regInformation");
    return;
  }
  register(regUsername.value, regPassword.value);
});

logLink.addEventListener("click", (ev) => {
  ev.preventDefault();
  toggleForm("login");
  toggleForm("register");
  cleanRegForm();
});

//REGISRATION VALIDATION
regUsername.addEventListener("keypress", (ev) => {
  console.log("changed", ev.target.value);
  if (ev.target.value.length < 5) {
    showWarning("username too short (min 5 characters)", "regInformation");
  } else {
    closeWarning("regInformation");
  }
});

btnRegister.addEventListener("click", (ev) => {
  ev.preventDefault();
  console.log("Register");
});

regLink.addEventListener("click", (ev) => {
  ev.preventDefault();
  toggleForm("login");
  toggleForm("register");
  cleanLogForm();
});

//FUNCTIONS

function logIn(username, password) {
  return users.find((u) => u.username == username && u.password == password);
}

function register(username, password) {
  users.push({
    id: users.length + 1,
    username: username,
    password: password,
  });
  console.log(register, users);
}

function cleanRegForm() {
  regUsername.value = "";
  regPassword.value = "";
  regConfirmPassword.value = "";
  closeWarning("regInformation");
}

function cleanLogForm() {
  logUsername.value = "";
  logPassword.value = "";
  closeWarning("logInformation");
}

function checkUsername(username) {
  return users.find((u) => u.username == username);
}

function showWarning(content, value) {
  let target = document.getElementById(value);
  target.firstElementChild.innerHTML = content;
  target.style.display = "block";
}

function closeWarning(value) {
  let target = document.getElementById(value);
  target.firstElementChild.innerHTML = "";
  target.style.display = "none";
}

function toggleForm(value){
  let target = document.getElementById(value);
  if(target.classList.contains('visible')){
    target.classList.remove('visible');
    target.classList.add('hidden');
  } else {
    target.classList.remove('hidden');
    target.classList.add('visible');
  }
}