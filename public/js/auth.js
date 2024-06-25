const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/home'); // Redirect to home.handlebars
      } else {
        const errorData = await response.json();
        alert(response.statusText);
        console.error('Login Error:', errorData);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/home'); 
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.errors[0].message}`);
        console.error('Signup Error:', errorData);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  } else {
    alert('Please fill out both the username and password fields.');
  }
};

const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}

const signupForm = document.querySelector('.signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', signupFormHandler);
}
