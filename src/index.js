let currentPage;
let currentUser;

window.unload = () => {
  currentPage.unload();
  document.querySelector("#root").removeChild(document.querySelector("main"));
};

window.goToPage = (page, flag) => {
  switch (page) {
    case "login" || "signin":
      window.unload();
      currentPage = signInPage;
      currentPage.load();
      break;
    case "thread":
      window.unload();
      currentPage = threadPage;
      currentPage.load(flag);
      break;
    case "add" || "edit":
      window.unload();
      currentPage = addPhotoPage;
      currentPage.load(flag);
      break;
    // case 'error':
    //     win
    //     break;

    default:
      window.unload();
      window.currentPage = signInPage;
      currentPage.load();
      break;
  }
};

window.changeUser = newUser => {
  currentUser = newUser;
  document.querySelector(".header-username").innerHTML = currentUser || "Guest";
  document.querySelector(".login-button").style.display = currentUser
    ? "none"
    : "";
  document.querySelector(".logout-button").style.display = currentUser
    ? ""
    : "none";
  document.querySelector(".upload-button").style.visibility = currentUser
    ? ""
    : "hidden";
  currentPage.changeUser();
};

(function initialLoad() {
  document.querySelector(".logout-button").onclick = () => changeUser(null);
  document.querySelector(".login-button").onclick = () => goToPage("login");
  document.querySelector(".upload-button").onclick = () =>
    goToPage("add", false);
  document.querySelector(".header-buttons-bar>h1").onclick = () =>
    goToPage("thread", true);
  document.forms["header-search-bar"].onsubmit = e => {
    e.preventDefault();
    const form = document.forms["header-search-bar"].children[0];
    const filter = {};
    if (form.children[0].value != "") {
      filter.author = form.children[0].value;
    }
    if ([].every.call(form.children[1].children, el => el.value != "")) {
      filter.createdAt = new Date(
        "20" + form.children[1].children[2].value,
        Number(form.children[1].children[1].value) - 1,
        form.children[1].children[0].value
      );
    }
    if (form.children[2].value != "") {
      filter.hashTags = form.children[2].value.split(" ");
    }
    domF.clearThread();
    domF.showPhotoPosts(0, 10, filter);
  };
  currentUser = null;
  currentPage = signInPage;
  currentPage.load();
})();
