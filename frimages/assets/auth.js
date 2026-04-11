const API = "https://portal.yourdomain.com";

function getToken() {
  return localStorage.getItem("token");
}

function requireAuth() {
  if (!getToken()) {
    window.location = "/login/";
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location = "/app/";
  } else {
    alert("Invalid login");
  }
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(API + "/signup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  window.location = "/login/";
}

function logout() {
  localStorage.removeItem("token");
  window.location = "/login/";
}