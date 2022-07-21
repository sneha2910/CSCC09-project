const API_URL = 'http://localhost:3000/api/';

const jsonRequest = (method) => (resource, data) => {
  return fetch( API_URL + resource, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};

const getRequest = jsonRequest('GET');
const postRequest = jsonRequest('POST');
const putRequest = jsonRequest('PUT');
const deleteRequest = jsonRequest('DELETE');

const signUp = (username, email, password) => postRequest('users/signup', {
  username,
  email,
  password,
});

const signIn = (username, password) => postRequest('users/signin', {
  username,
  password,
});

const signOut = () => getRequest('users/signout');

module.exports = {
  signUp,
  signIn,
  signOut,
};