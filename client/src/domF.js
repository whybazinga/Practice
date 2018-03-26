window.domF = (function() {
  return {
    createPhotoPost: function(photoPost) {
      let {
        id,
        author,
        createdAt,
        photoLink,
        hashTags,
        description
      } = photoPost;
      let post = document.createElement("div");
      let date =
        new Date(createdAt).getDate() +
        "." +
        new Date(createdAt).getMonth() +
        1 +
        "." +
        new Date(createdAt).getFullYear();
      let tags = hashTags.reduce((accum, element) => accum + " " + element);
      post.id = id;
      post.className = "post";
      post.innerHTML = `
                <div class="post-image" style="background:url(${photoLink}) no-repeat center 0; background-size: 100% auto;">
                    <div class="post-button-bar">
                    </div>
                    <div class="post-bar">
                        <div>
                            <h2>${author}</h2>
                            <h2>${date}</h2>
                            <h2>${tags}</h2>
                        </div>
                        <p>${description}</p>
                    </div>
                </div>
            `;
      if (currentUser !== null) {
        if (currentUser == author) {
          post.children[0].children[0].innerHTML = `
                        <button class="settings-button button"></button>
                        <button class="cross-button button"></button>
                    `;
        } else {
          if (photoPost.likes.indexOf(currentUser) !== -1) {
            post.children[0].children[0].innerHTML = `
                        <button class="heart-button button" style="background-image: url(./icons/heartF.png)"></button>
                    `;
          } else {
            post.children[0].children[0].innerHTML = `
                        <button class="heart-button button"></button>
                    `;
          }
        }
      }
      return post;
    },

    addPhotoPost: function(photoPost) {
      if (coreF.addPhotoPost(photoPost)) {
        document
          .querySelector("main")
          .appendChild(this.createPhotoPost(photoPost));
        return true;
      }
      return false;
    },

    showPhotoPosts: function(skip = 0, top = 10, filterConfig) {
      let arr = coreF.getPhotoPosts(skip, top, filterConfig);
      arr.forEach(element => {
        document
          .querySelector("main")
          .appendChild(this.createPhotoPost(element));
      });
      threadPage.init();
    },

    editPhotoPost: function(id, photoPost) {
      if (coreF.editPhotoPost(id, photoPost)) {
        document
          .querySelector("main")
          .replaceChild(
            this.createPhotoPost(coreF.getPhotoPost(id)),
            document.getElementById(id)
          );
        return true;
      }
      return false;
    },

    removePhotoPost: function(id) {
      if (coreF.removePhotoPost(id)) {
        document.querySelector("main").removeChild(document.getElementById(id));
        return true;
      }
      return false;
    },

    clearThread: function() {
      document.querySelector("main").innerHTML = "";
    }
  };
})();
