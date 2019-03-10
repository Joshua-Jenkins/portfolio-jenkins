import auth0 from "auth0-js";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "jenkins.auth0.com",
      clientID: "vjcAT2iJ0q9DLj3x4u5DXKYsI2TxvHcn",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });
    this.login = this.login.bind(this);
    this.handleAuthenication = this.handleAuthenication.bind(this);
  }

  handleAuthenication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err);
        }
      });
    });
  }

  setSession() {
    // save tokens!!
  }

  login() {
    this.auth0.authorize();
  }
}

const auth0Client = new Auth0();

export default auth0Client;
