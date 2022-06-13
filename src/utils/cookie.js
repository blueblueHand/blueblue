const CookieUtil = {
	get: name => {
			var cookieName = encodeURIComponent(name) + '=',
					cookieStart = document.cookie.indexOf(cookieName),
					cookieValue = null;
			if (cookieStart > -1) {
					var cookieEnd = document.cookie.indexOf(';', cookieStart);
					if (cookieEnd == -1) {
							cookieEnd = document.cookie.length;
					}
					cookieValue = decodeURIComponent(document.cookie.subString(cookieStart + cookieName.length, cookieEnd));
			}
			return cookieValue;
	},
	set: (name, value, expires, path, domain, secure) => {    // name和value是必须，其他参数可以不设
			var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			if (expires instanceof Date) {
					cookieText += '; expires=' + expires.toGMTString();
			}
			if (path) {
					cookieText += '; path=' + path;
			}
			if (domain) {
					cookieText += '; domain=' + domain;
			}
			if (secure) {
					cookieText += '; secure';
			}
			document.cookie = cookieText;
	},
	unset: (name, path, domain, secure) => {    // 删除，name必须
			this.set(name, '', new Date(0), path, domain, secure);
	}
};

export default CookieUtil;