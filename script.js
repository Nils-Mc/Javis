function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function fetchAndSetCookie() {
    fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            setCookie("user_ip", data.ip, 7);
            sendCookiesToServer(data.ip);
        })
        .catch(error => console.error("Fehler beim Abrufen der IP-Adresse:", error));
}

function sendCookiesToServer(ip) {
    const cookies = document.cookie;
    fetch("/save-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip, cookies })
    }).then(response => response.json())
      .then(data => console.log(data.message));
}

function updateCookieDisplay() {
    fetch("/get-cookies")
        .then(response => response.json())
        .then(data => {
            document.getElementById("cookieDisplay").innerText = JSON.stringify(data, null, 2);
        });
}

window.onload = function() {
    fetchAndSetCookie();
    updateCookieDisplay();
};
