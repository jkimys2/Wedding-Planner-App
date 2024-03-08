// MJS 3.5.24 - Copied from uri act 14-28 mp.  Should not need any changes.
const loginFormHandler = async (event) => {
  console.log("login2 Form public/js Handler beginning ...");
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    console.log("login Form public/js Handler found email and password ...");
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("Login2 Form handler got post response ...", response.status);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      console.log("Login2 form handler got response.ok ... going to profile2 page");
      document.location.replace('/profile2');
    } else {
      response.statusText = 'Incorrect username or password'; 
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("Sign-Up Form Handler beginning ...");

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile2');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);