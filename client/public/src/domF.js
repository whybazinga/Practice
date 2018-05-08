window.domF = (function () {
  function getDateFromStr(date) {
    return (
      new Date(date).getDate() +
            '.' +
            new Date(date).getMonth() +
            1 +
            '.' +
            new Date(date).getFullYear()
    );
  }

  function createInitialPostHTML(photoPost) {
    const {
      id, author, createdAt, photoLink, hashTags, description,
    } = photoPost;
    const post = document.createElement('div');
    const date = getDateFromStr(createdAt);
    const tags = hashTags.reduce((accum, element) => accum + ' ' + element);
    post.id = id;
    post.className = 'post';
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
    createPhotoPost(photoPost) {
      const post = createInitialPostHTML(photoPost);
      if (currentUser !== null) {
        if (currentUser == photoPost.author) {
          post.children[0].children[0].innerHTML = `
                        <button class="settings-button button"></button>
                        <button class="cross-button button"></button>
                    `;
          post.querySelector('.settings-button').onclick = () => {
            goToPage('add', photoPost.id);
          };

          post.querySelector('.cross-button').onclick = () => {
            if (confirm('Delete this post?')) {
              this.removePhotoPost(photoPost.id);
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
          post.querySelector('.heart-button').onclick = function () {
            const { id } = photoPost;
            db.get('/post', { id })
              .then((res) => {
                const post_ = JSON.parse(res);
                if (!post_.likes.find(e => e == currentUser)) {
                  post_.likes.push(currentUser);
                  this.style.backgroundImage = 'url(./icons/heartF.png)';
                } else {
                  post_.likes.splice(post_.likes.indexOf(currentUser), 1);
                  this.style.backgroundImage = 'url(./icons/heart.png)';
                }
                return post_;
              }).then((post_) => {
                domF.editPhotoPost(id, post_);
              });
          };
        }
      }
      return post;
    },

    addPhotoPost(photoPost) {
      db.post('/add', photoPost)
        .then(res => new Promise((resolve, reject) => {
          if (res == 'true') {
            document
              .querySelector('main')
              .insertBefore(this.createPhotoPost(photoPost), document.querySelector('.post'));
            resolve();
          } else {
            reject('Error occured in addPhotoPost()');
          }
        }))
        .catch(err => console.log(err));
    },

    showPhotoPosts(skip = 0, top = 10, filterConfig) {
      db.get('/posts', { skip, top, filterConfig })
        .then((res) => {
          JSON.parse(res).forEach((element) => {
            document
              .querySelector('main')
              .appendChild(this.createPhotoPost(element));
          });
        })
        .catch(err => console.log(err));
    },

    editPhotoPost(id, photoPost) {
      db.put('/edit', { id }, photoPost)
        .then(res => new Promise((resolve, reject) => {
          if (res == 'true') {
            resolve();
          } else reject('Error occured in editPhotoPost()');
        }))
        .then(() => db.get('/post', { id }))
        .then((res) => {
          document
            .querySelector('main')
            .replaceChild(
              this.createPhotoPost(JSON.parse(res)),
              document.getElementById(id),
            );
        })
        .catch(err => console.log(err));
    },

    removePhotoPost(id) {
      db.delete('/remove', { id })
        .then(res => new Promise((resolve, reject) => {
          if (res == 'true') {
            try {
              document
                .querySelector('main')
                .removeChild(document.getElementById(id));
              resolve();
            } catch (error) {
              reject(error);
            }
          } else reject('Error occured in removePhotoPost()');
        }))
        .catch(err => console.log(err));
    },

    clearThread() {
      document.querySelector('main').innerHTML = '';
    },
  };
}());
