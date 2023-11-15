function listener(changeInfo) {
	//console.log(changeInfo.cookie.partitionKey);
	if (changeInfo.cookie.session || changeInfo.cookie.expirationdate - (Date.now() / 1000) < 34473600) {
		//console.log(changeInfo.cookie);
		let c = changeInfo.cookie;
		// both of these cause browser.cookies.set(c); to fail if they are present in any way
		delete c.session;
		delete c.hostOnly;
		c.expirationDate = (Date.now() / 1000) + 34560000; // 400 days in seconds
		//console.log(c.domain);
		// make the FireflyNETLoggedIn cookie stay insecure
		let s_if_required = "";
		if (c.secure) {
			s_if_required = "s";
		}
		// this is required by browser.cookies.set(c);
		c.url = "http" + s_if_required + "://" + c.domain;
		delete c.domain; // stops a "." from being prepended to the domain
		//console.log(c.url);
		//console.log(c);
		browser.cookies.set(c);
	}
}

/*function debugLogCookies(cookies) {
	for (let cookie of cookies) {
		console.log(cookie);
	}
}

browser.cookies.getAll({}).then(debugLogCookies);*/

browser.cookies.onChanged.addListener(listener);
