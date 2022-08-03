const express = require('express');
const app = express();
const cors = require('cors');
const stytch = require('stytch');


// use dotenv[.config()] to protect your secrets -- https://www.npmjs.com/package/dotenv

// middleware for parsing json data and cors error
app.use(cors());
app.use(express.json());


// creates a new stytch client to get started! --- check for more here : https://www.npmjs.com/package/stytch
const client = new stytch.Client({
  project_id: "project-XXXX-d7XXa8c4-XXXX-4d63-b0dd-4eXXXXXXXXXX",
  secret: "secret-test-KAhEIlDlwLG7FMzLErGVC3bB7rat-xaNtQI=",
  env: stytch.envs.test,
}
);


//our created middleware for authentication using token from sessionToken!
const sessionMiddleware = (req, res, next) => {
  const sessionToken = req.headers.sessiontoken;
  client.sessions.authenticate({ session_token: sessionToken })
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.error_type === "invalid_token") {
        console.log("Whoops! Try again?");
      }
    })
}


// login post request using created client to login or create!
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const params = {
    email,
    login_magic_link_url: 'http://localhost:3000/authenticate', // redirected url's which you will provide to your stytch client -- https://stytch.com/dashboard/redirect-urls
    signup_magic_link_url: 'http://localhost:3000/authenticate', // redirected url's which you will provide to your stytch client -- https://stytch.com/dashboard/redirect-urls
  };

  const response = await client.magicLinks.email.loginOrCreate(params);

  res.json(response);
})

// redirected post request using stytch tokens for every client on login or sign-up
app.post('/authenticate', async (req, res) => {
  try {
    const token = req.body.token;
    const sessionToken = await client.magicLinks.authenticate(token, {
      session_duration_minutes: 30
    });
    res.json(sessionToken);
  } catch (err) {
    res.json(err);
  }
})

// request must be same as from the server to the client!
app.post('/test', sessionMiddleware, (req, res) => {
  res.json('You are now Logged In!');
})

// app listens wherever you want!
app.listen(5000, () => {
  console.log(`Server running`)
});


// http://localhost:3000/authenticate