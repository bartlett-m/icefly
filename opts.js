function requestPermissions(e) {
	e.preventDefault();
	browser.permissions.request({origins: ["https://" + document.getElementById("ffurl").value + "/\*"], permissions: ["cookies"]});
}

document.querySelector("form").addEventListener("submit", requestPermissions);
