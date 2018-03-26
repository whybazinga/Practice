window.domF = (function () {
    return {
        createPhotoPost: function (photoPost) {
            const { id, author, createdAt, photoLink, hashTags, description } = photoPost;
            let post = document.createElement('div');
            let date = createdAt.getDate() + '.' + (createdAt.getMonth() + 1) + '.' + createdAt.getFullYear();
            let tags = hashTags.reduce((accum, element) => accum + ' ' + element);
            post.id = id;
            post.className = 'post';
            post.innerHTML = `
                <div class="post-image" style="background:url(${photoLink}) no-repeat center 0">
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
                        <button class="heart-button button"></button>
                        <button class="cross-button button"></button>
                    `;
                } else {
                    post.children[0].children[0].innerHTML = `
                        <button class="heart-button button"></button>
                    `;
                }
            }
            return post;
        },

        addPhotoPost: function (photoPost) {
            if (coreF.addPhotoPost(photoPost)) {
                document.querySelector('main').appendChild(this.createPhotoPost(photoPost));
                return true;
            }
            return false;
        },

        addPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            let arr = coreF.getPhotoPosts(skip, top, filterConfig);
            arr.forEach(element => {
                document.querySelector('main').appendChild(this.createPhotoPost(element));
            });
        },

        editPhotoPost: function (id, photoPost) {
            if (coreF.editPhotoPost(id, photoPost)) {
                document.querySelector('main').replaceChild(this.createPhotoPost(coreF.getPhotoPost(id)), document.getElementById(id));
                return true;
            }
            return false;
        },

        removePhotoPost: function (id) {
            if (coreF.removePhotoPost(id)) {
                document.querySelector('main').removeChild(document.getElementById(id));
                return true;
            }
            return false;
        },

        clearThread: function () {
            document.querySelector('main').innerHTML = '';
        }

    }
})()