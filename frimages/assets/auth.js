const API = "https://portal.purplevortx.com";

function getToken() {
    return localStorage.getItem("token");
}

function requireAuth() {
    if (!getToken()) window.location = "/login/";
}

function logout() {
    localStorage.removeItem("token");
    window.location = "/login/";
}

async function login() {
    const res = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location = "/app/";
}

async function signup() {
    await fetch(API + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    window.location = "/login/";
}