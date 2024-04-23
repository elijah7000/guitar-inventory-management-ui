const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://test-3-latest.onrender.com";

function getHost() {
  return mode == 0 ? host_local : host_remote;
}

function isLoggedIn() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

let configuration = {
  isLoggedIn: () => isLoggedIn(),
  host: () => getHost(),
};

async function signup() {
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let customer = { email: email, username: username, password: password };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  try {
    let response = await fetch(getHost() + "/signup", request);
    if (response.status == 200) {
      alert("The registration was successful!");
      location.href = "login.html";
    } else {
      console.log(`response status:${response.status}`);
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
}

async function login() {
  let username = document.getElementById("usernameLogin").value;
  let password = document.getElementById("passwordLogin").value;
  let customer = { username: username, password: password };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  try {
    let response = await fetch(getHost() + "/signin", request);
    if (response.status == 200) {
      alert("The login was successful!");
      const token = await response.text();

      location.href = "index.html";
    } else {
      console.log(`response status:${response.status}`);

      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);

    alert("Something went wrong!");
  }
}
