window.domF = (function() {
  function getDateFromStr(date) {
    return (
      new Date(date).getDate() +
      "." +
      new Date(date).getMonth() +
      1 +
      "." +
      new Date(date).getFullYear()
    );
  }

  function createInitialPostHTML(photoPost) {
    let { id, author, createdAt, photoLink, hashTags, description } = photoPost;
    let post = document.createElement("div");
    let date = getDateFromStr(createdAt);
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
    return post;
  }

  return {
    createPhotoPost: function(photoPost) {
      let post = createInitialPostHTML(photoPost);
      if (currentUser !== null) {
        if (currentUser == photoPost.author) {
          post.children[0].children[0].innerHTML = `
                        <button class="settings-button button"></button>
                        <button class="cross-button button"></button>
                    `;
          post.querySelector(".settings-button").onclick = () => {
            goToPage("add", photoPost.id);
          };

          post.querySelector(".cross-button").onclick = () => {
            if (confirm("Delete this post?")) {
              domF.removePhotoPost(photoPost.id);
            }
          };
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
          post.querySelector(".heart-button").onclick = () => {
            let post = coreF.getPhotoPost(el.closest(".post").id);
            if (!post.likes.find(e => e == currentUser)) {
              post.likes.push(currentUser);
              this.style.backgroundImage = "url(./icons/heartF.png)";
            } else {
              post.likes.splice(post.likes.indexOf(currentUser), 1);
              this.style.backgroundImage = "url(./icons/heart.png)";
            }
            coreF.editPhotoPost(post.id, post);
          };
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
