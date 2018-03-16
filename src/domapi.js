window.domF = (function () {
    // let uploadButton = document.querySelector('.upload-button');
    // let loginButton = document.querySelector('.login-button');
    // let logoutButton = document.querySelector('.logout-button');
    // let username = document.querySelector('.header-username');

    return {
        // user: null,

        // changeUser: function (newUser) {
        //     if (newUser !== null && typeof newUser != 'undefined') {
        //         this.user = newUser;
        //         username.innerHTML = this.user;
        //         uploadButton.style.visibility = 'initial';
        //         loginButton.style.display = 'none';
        //         logoutButton.style.display = 'initial';
        //     } else {
        //         this.user = null;
        //         username.innerHTML = 'Guest';
        //     }
        // },

        createPhotoPost: function (photoPost) {
            let post = document.createElement('div');
            post.id = photoPost.id;
            post.className = 'post';
            let image = document.createElement('div');
            image.className = 'post-image';
            image.style.background = 'url(' + photoPost.photoLink + ')';
            let buttonBar = document.createElement('div');
            buttonBar.className = 'post-button-bar';
            let settings = document.createElement('img');
            settings.src = './icons/settings.png';
            let heart = document.createElement('img');
            heart.src = './icons/heart.png';
            let cross = document.createElement('img');
            cross.src = './icons/cross.png';
            //if (this.user !== null && this.user.toUpperCase() !== photoPost.author.toUpperCase()) {
            settings.style.display = 'none';
            heart.style.display = 'none';
            cross.style.display = 'none';
            //}
            buttonBar.append(settings, heart, cross);
            let postBar = document.createElement('div');
            postBar.className = 'post-bar';
            let info = document.createElement('div');
            let author = document.createElement('h2');
            let date = document.createElement('h2');
            let tags = document.createElement('h2');
            let description = document.createElement('p');
            author.innerHTML = photoPost.author;
            date.innerHTML = photoPost.createdAt.getDay() + '.'
                + photoPost.createdAt.getMonth() + '.'
                + photoPost.createdAt.getFullYear();
            tags.innerHTML = photoPost.hashTags.reduce((accum, element) => accum + ' ' + element);
            description.innerHTML = photoPost.description;
            info.append(author, date, tags);
            postBar.append(info, description);
            image.append(buttonBar, postBar);
            post.appendChild(image);
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