var photoPosts = [];

let filterDate = {
    createdAt: new Date('2018-02-5'),
};

let filterAuthor = {
    author: 'Alex3',
};

let filterTag = {
    hashTags: ['fun7'],
};

(function (params) {
    let currentId = 1;


    function createPhotoPost(description, createdAt, author, photoLink, hashTags, likes) {
        return {
            id: '' + currentId++,
            description: description,
            createdAt: createdAt,
            author: author,
            photoLink: photoLink,
            hashTags: hashTags,
            likes: likes,
        }
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let result;
        if (arguments.length < 3) {
            result = photoPosts.slice(skip, skip + top);
        } else {
            result = photoPosts.filter((element) => {
                let flag = false;
                if (filterConfig.hasOwnProperty('author')) {
                    flag = element.author === filterConfig.author;
                }
                if (filterConfig.hasOwnProperty('createdAt')) {
                    flag = filterConfig.createdAt.getFullYear() === element.createdAt.getFullYear() &&
                        filterConfig.createdAt.getMonth() === element.createdAt.getMonth() &&
                        filterConfig.createdAt.getDay() === element.createdAt.getDay();
                }
                if (filterConfig.hasOwnProperty('hashTags')) {
                    flag = filterConfig.hashTags.every((tag) => {
                        return element.hashTags.includes(tag);
                    });
                }
                return flag;
            });
        }
        if (result !== undefined) {
            return result.sort((element1, element2) => {
                return element2.createdAt - element1.createdAt;
            });
        } else return;
    }

    function getPhotoPost(id) {
        return photoPosts.find((element) => {
            return element.id == id;
        })
    }

    function validatePhotoPost(photoPost) {
        if (photoPost.description === null || typeof photoPost.description !== 'string' || photoPost.description.length > 200) {
            return false;
        }
        if (photoPost.createdAt === null || !(photoPost.createdAt instanceof Date) || photoPost.createdAt > new Date()) {
            return false;
        }
        if (photoPost.author === null || typeof photoPost.author !== 'string' || photoPost.author === '') {
            return false;
        }
        if (photoPost.photoLink === null || typeof photoPost.photoLink !== 'string' || photoPost.photoLink === '') {
            return false;
        }
        if (photoPost.hashTags === null || !(photoPost.hashTags instanceof Array) || !photoPost.hashTags.every((element) => { return typeof element === 'string' })) {
            return false;
        }
        return true;
    }

    function addPhotoPost(photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            return true;
        } else return false;
    }

    function editPhotoPost(id, photoPost) {
        let postToChange = getPhotoPost(id);
        if (postToChange !== undefined) {
            let propSet1 = Object.keys(postToChange);
            let propSet2 = Object.keys(photoPost);
            if (propSet2.every((elem) => { return propSet1.indexOf(elem) > -1; })) {
                Object.assign(postToChange, photoPost);
                return true;
            }
        }
        return false;
    }

    function removePhotoPost(id) {
        let index = photoPosts.findIndex((element) => { return element.id == id });
        if (index != -1) {
            photoPosts.splice(index, 1);
            return true;
        } else return false;
    }


    for (let i = 0; i < 10; i++) {
        console.log(addPhotoPost(
            createPhotoPost('description of post #' + currentId,
                new Date(('2018-02-' + currentId)),
                'Alex' + currentId,
                'samplepng.png',
                ['fun' + currentId, 'love'],
                ['Alex', 'Simon']
            )
        )
        );
    }

    console.log("\n-getPhotoPosts")
    console.log("10 posts:");
    console.log(getPhotoPosts());
    console.log("2 posts starting from the 3:");
    console.log(getPhotoPosts(2, 2));
    console.log("default 10 posts starting from 4:");
    console.log(getPhotoPosts(4));
    console.log("posts after filtering by date = 2018-02-5:");
    console.log(getPhotoPosts(0, 10, filterDate));
    console.log("posts after filtering by author = Alex3:");
    console.log(getPhotoPosts(0, 10, filterAuthor));
    console.log("posts after filtering by hashtag \"fun7\":");
    console.log(getPhotoPosts(0, 10, filterTag));

    console.log("\n-getPhotoPost");
    console.log("post with id 2:");
    console.log(getPhotoPost('2'));
    console.log("post with id 11:");
    console.log(getPhotoPost('11'));

    console.log("\n-validatePhotoPost");
    console.log("with valid properties:");
    console.log(validatePhotoPost({
        id: "4",
        description: '123',
        createdAt: new Date("2007-2-2"),
        author: 'Alex',
        photoLink: 'link',
        hashTags: ['tag1', 'tag2'],
        likes: ['me'],
    }));
    console.log("with invalid createdAt:");
    console.log(validatePhotoPost({
        id: "4",
        description: '123',
        createdAt: 100,
        author: 'Alex',
        photoLink: 'link',
        hashTags: ['tag1', 'tag2'],
        likes: ['me']
    }));

    console.log("\n-addPhotoPost");
    console.log("all posts: ");
    console.log(photoPosts);
    console.log("trying to add invalid post: ");
    console.log(addPhotoPost({
        id: "4",
        description: 'Hello',
        createdAt: 4
    }));
    console.log("all posts: ");
    console.log(photoPosts);
    console.log("trying to add valid post: ");
    console.log(addPhotoPost({
        id: "4",
        description: '123',
        createdAt: new Date("2007-2-2"),
        author: 'Alex',
        photoLink: 'link',
        hashTags: ['tag1', 'tag2'],
        likes: ['me'],
    }));
    console.log("all posts: ");
    console.log(photoPosts);

    console.log("\n-editPhotoPost");
    console.log("post #3 before editing:");
    console.log(getPhotoPost('3'));
    console.log("trying to edit post #3:");
    console.log(editPhotoPost('3', {
        photoLink: 'new link',
        description: '456'
    }));
    console.log("post #3 after editing:");
    console.log(getPhotoPost('3'));

    console.log("\n-removePhotoPost");
    console.log("removing post #3");
    console.log(removePhotoPost('3'));
    console.log("trying to get post #3");
    console.log(getPhotoPost('3'));

})()