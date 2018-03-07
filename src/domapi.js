window.domF = (function () {
    let main = document.querySelector('main');

    return {
        createPhotoPost: function (photoPost) {
            let post = document.createElement('div');
            post.id = photoPost.id;
            post.className = 'post';
            let image = document.createElement('div');
            image.className = 'post-image';
            image.style.background = 'url(' + photoPost.photoLink + ')';
            let heart = document.createElement('img');
            heart.src = './icons/heart.png';
            heart.height = '100%';
            heart.width = '100%';
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
            info.appendChild(author);
            info.appendChild(date);
            info.appendChild(tags);
            postBar.appendChild(info);
            postBar.appendChild(description);
            image.appendChild(heart);
            image.appendChild(postBar);
            post.appendChild(image);
            return post;
        },

        addPhotoPost: function (photoPost) {
            if (coreF.addPhotoPost(photoPost)) {
                main.appendChild(this.createPhotoPost(photoPost));
                return true;
            }
            return false;
        },

        addPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            let arr = coreF.getPhotoPosts(skip, top, filterConfig);
            arr.forEach(element => {
                main.appendChild(this.createPhotoPost(element));
            });
        },

        editPhotoPost: function (id, photoPost) {
            if (coreF.editPhotoPost(id, photoPost)) {
                main.replaceChild(this.createPhotoPost(coreF.getPhotoPost(id)), document.getElementById(id));
                return true;
            }
            return false;
        },

        removePhotoPost: function (id) {
            if (coreF.removePhotoPost(id)) {
                main.removeChild(document.getElementById(id));
                return true;
            }
            return false;
        },

        clearMain: function () {
            main.innerHTML = '';
        }

    }
})()