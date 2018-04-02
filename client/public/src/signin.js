const signInPage = new function() {
  this.page = () => {
    let main = document.createElement("main");
    main.className = "login";
    main.innerHTML = `
            <div class="welcome-header">
                <h2>Sign in and...</h2>
                <h1>Carpe Diem</h1>
            </div>
            <form name="login-form" method="post">
                <div>
                    <label for="login">LOGIN </label>
                    <input type="text" name="login" autofocus>
                </div>
                <div>
                    <label for="password">PASSWORD</label>
                    <input type="password" name="password">
                </div>
                <input type="submit" class="submit-button" value="Log In">
                <h3>Invalid input</h3>
            </form>
            `;
    return main;
  };

  this.init = () => {
    document.forms["login-form"].onsubmit = e => {
      e.preventDefault();
      const user = {
        login: e.currentTarget[0].value,
        password: e.currentTarget[1].value
      };
      if (
        storageUsers.find(element => {
          return (
            element.username === user.login &&
            element.password === user.password
          );
        })
      ) {
        window.goToPage("thread");
        window.changeUser(user.login);
      } else {
        alert("Invalid input");
      }
    };
    document.querySelector(".welcome-header>h1").onclick = () => {
      goToPage("thread", true);
    };
  };

  this.load = () => {
    document.querySelector("header").style.display = "none";
    document
      .querySelector("#root")
      .insertBefore(this.page(), document.querySelector("footer"));
    this.init();
  };

  this.unload = () => {
    document.querySelector("header").style.display = "";
    document.forms["login-form"].onsubmit = null;
  };

  this.changeUser = () => {};
}();
