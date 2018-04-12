window.domF = (function () {
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
        createPhotoPost: function (photoPost) {
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
                    post.querySelector(".heart-button").onclick = function () {
                        const id = photoPost.id;
                        db.get("/post", { id: id })
                            .then(res => {
                                let post = JSON.parse(res);
                                if (!post.likes.find(e => e == currentUser)) {
                                    post.likes.push(currentUser);
                                    this.style.backgroundImage = "url(./icons/heartF.png)";
                                } else {
                                    post.likes.splice(post.likes.indexOf(currentUser), 1);
                                    this.style.backgroundImage = "url(./icons/heart.png)";
                                }
                                return post;
                            }).then(post => {
                                domF.editPhotoPost(id, post);
                            })
                    };
                }
            }
            return post;
        },

        addPhotoPost: function (photoPost) {
            db.post("/add", photoPost)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        if (res == "true") {
                            document
                                .querySelector("main")
                                .insertBefore(this.createPhotoPost(photoPost), document.querySelector(".post"));
                            resolve();
                        } else {
                            reject("Error occured in addPhotoPost()");
                        }
                    });
                })
                .catch(err => console.log(err));
        },

        showPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            db.get("/posts", { skip: skip, top: top, filterConfig: filterConfig })
                .then(res => {
                    JSON.parse(res).forEach(element => {
                        document
                            .querySelector("main")
                            .appendChild(this.createPhotoPost(element));
                    });
                })
                .catch(err => console.log(err));
        },

        editPhotoPost: function (id, photoPost) {
            db.put("/edit", { id: id }, photoPost)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        if (res == "true") {
                            resolve();
                        } else reject("Error occured in editPhotoPost()");
                    });
                })
                .then(() => {
                    return db.get("/post", { id: id })
                })
                .then(res => {
                    document
                        .querySelector("main")
                        .replaceChild(
                        this.createPhotoPost(JSON.parse(res)),
                        document.getElementById(id)
                        );
                })
                .catch(err => console.log(err));
        },

        removePhotoPost: function (id) {
            db.delete("/remove", { id: id })
                .then(res => {
                    return new Promise((resolve, reject) => {
                        if (res == "true") {
                            try {
                                document
                                    .querySelector("main")
                                    .removeChild(document.getElementById(id));
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        } else reject("Error occured in removePhotoPost()");
                    })
                })
                .catch(err => console.log(err));
        },

        clearThread: function () {
            document.querySelector("main").innerHTML = "";
        }
    };
})();
