import auth0 from "auth0-js";
import Cookies from "js-cookie";

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
    this.logout = this.logout.bind(this);
    this.handleAuthenication = this.handleAuthenication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
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

  setSession(authResult) {
    // set the time that the access token expire
    const expiresAt = JSON.stringify(
      authResult.expireIn * 1000 + new Date().getTime()
    );

    //localStorage.setItem("access_token", authResult.accessToken);

    Cookies.set("user", authResult.idTokenPayload);
    Cookies.set("jwt", authResult.idToken);
    Cookies.set("expiresAt", expiresAt);
    // navigate to the home route
  }

  logout() {
    Cookies.remove("user");
    Cookies.remove("jwt");
    Cookies.remove("expiresAt");

    this.auth0.logout({
      returnTo: "",
      clientID: "vjcAT2iJ0q9DLj3x4u5DXKYsI2TxvHcn"
    });
  }

  login() {
    this.auth0.authorize();
  }

  isAuthenticated() {
    const expiresAt = Cookies.getJSON("expiresAt");
    return new Date().getTime() < expiresAt;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
