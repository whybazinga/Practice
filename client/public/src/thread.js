const threadPage = new function() {
  this.page = () => {
    let main = document.createElement("main");
    main.className = "main";
    return main;
  };
  this.init = () => {};

  this.load = withPosts => {
    document.querySelector("header").style.display = "";
    document
      .querySelector("#root")
      .insertBefore(this.page(), document.querySelector("footer"));
    if (withPosts) {
      domF.showPhotoPosts();
    }
  };

  this.unload = () => {};

  this.changeUser = () => {
    domF.clearThread();
    domF.showPhotoPosts();
  };
}();
