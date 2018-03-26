const threadPage = new function() {
  this.page = () => {
    let main = document.createElement("main");
    main.className = "main";
    return main;
  };

  this.init = () => {
    document.querySelectorAll(".heart-button").forEach(el => {
      el.onclick = () => {
        const post = coreF.getPhotoPost(el.closest(".post").id);
        if (!post.likes.find(e => e == currentUser)) {
          post.likes.push(currentUser);
          el.style.backgroundImage = "url(../UI/icons/heartF.png)";
        } else {
          post.likes.splice(post.likes.indexOf(currentUser), 1);
          el.style.backgroundImage = "url(../UI/icons/heart.png)";
        }
      };
    });

    document.querySelectorAll(".settings-button").forEach(el => {
      el.onclick = () => {
        goToPage("add", el.closest(".post").id);
      };
    });

    document.querySelectorAll(".cross-button").forEach(el => {
      el.onclick = () => {
        if (confirm("Delete this post?")) {
          domF.removePhotoPost(el.closest(".post").id);
        }
      };
    });
  };

  this.load = withPosts => {
    document.querySelector("header").style.display = "";
    document
      .querySelector("#root")
      .insertBefore(this.page(), document.querySelector("footer"));
    if (withPosts) {
      domF.showPhotoPosts();
    }
  };

  this.unload = () => {
    //document.querySelector('#root').removeChild(document.querySelector('main'));
  };

  this.changeUser = () => {
    domF.clearThread();
    domF.showPhotoPosts();
  };
}();
