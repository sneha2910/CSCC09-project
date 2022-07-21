const loginApiService = (function () {
  // you are recommended to rewrite this to a promise based format, which will
  // be more reflective of what you will do in all major frameworks.
  function send(method, url, data, callback) {
    const config = {
      method: method,
    };
   
      config.headers = {
        "Content-Type": "application/json",
      };
      config.body = JSON.stringify(data);
    
    fetch(url, config)
      .then((res) => res.json())
      .then((val) => callback(null, val));
  }

  let module = {};

  module.getUsername = function () {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };

  module.signin = function (username, password, callback) {
    send("POST", "/signin/", { username, password }, callback);
  };

  module.signup = function (username, email, password, callback) {
    send("POST", "/signup/", { username, email, password }, callback);
  };

  module.oauth = function (token, callback) {
    send("POST", "/auth/", { token }, callback);
  };

  return module;
})();