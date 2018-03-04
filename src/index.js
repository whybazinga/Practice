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

let func = (function (params) {

    return {
        currentId: 1,

        createPhotoPost: function (description, createdAt, author, photoLink, hashTags, likes) {
            return {
                id: '' + this.currentId++,
                description: description,
                createdAt: createdAt,
                author: author,
                photoLink: photoLink,
                hashTags: hashTags,
                likes: likes,
            }
        },

        getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            let result;
            if (arguments.length < 3) {
                result = photoPosts.slice(skip, skip + top);
            } else {
                result = photoPosts.slice(skip, skip + top).filter((element) => {
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
            return result;
        },

        getPhotoPost: function (id) {
            return photoPosts.find((element) => {
                return element.id == id;
            })
        },

        validatePhotoPost: function (photoPost) {
            if (typeof photoPost.id !== 'string') {
                return false;
            }
            if (typeof photoPost.description !== 'string' || photoPost.description.length > 200) {
                return false;
            }
            if (!(photoPost.createdAt instanceof Date) || photoPost.createdAt > new Date()) {
                return false;
            }
            if (typeof photoPost.author !== 'string' || photoPost.author === '') {
                return false;
            }
            if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink === '') {
                return false;
            }
            if (!(photoPost.hashTags instanceof Array) || !photoPost.hashTags.every((element) => { return typeof element === 'string' })) {
                return false;
            }
            return true;
        },

        addPhotoPost: function (photoPost) {
            if (this.validatePhotoPost(photoPost)) {
                photoPosts.push(photoPost);
                photoPosts.sort((element1, element2) => { return element2.createdAt - element1.createdAt; });
                return true;
            } else return false;
        },

        editPhotoPost: function (id, photoPost) {
            let postToChange = this.getPhotoPost(id);
            if (postToChange !== undefined) {
                Object.assign(Object.assign({}, postToChange), photoPost);
                if (this.validatePhotoPost(postToChange)) {
                    Object.assign(postToChange, photoPost);
                    return true;
                }
            }
            return false;
        },

        removePhotoPost: function (id) {
            let index = photoPosts.findIndex((element) => { return element.id == id });
            if (index != -1) {
                photoPosts.splice(index, 1);
                return true;
            } else return false;
        },
    };
})()

for (let i = 0; i < 10; i++) {
    console.log(func.addPhotoPost(
        func.createPhotoPost('description of post #' + func.currentId++,
            new Date(('2018-02-' + func.currentId++),
                'Alex' + func.currentId++,
                'samplepng.png',
                ['fun' + func.currentId++, 'love'],
                ['Alex', 'Simon']
            )
        )
    ));
}

console.log('\n-func.getPhotoPosts')
console.log('10 posts:');
console.log(func.getPhotoPosts());
console.log('2 posts starting from the 3:');
console.log(func.getPhotoPosts(2, 2));
console.log('default 10 posts starting from 4:');
console.log(func.getPhotoPosts(4));
console.log('posts after filtering by date = 2018-02-5:');
console.log(func.getPhotoPosts(0, 10, filterDate));
console.log('posts after filtering by author = Alex3:');
console.log(func.getPhotoPosts(0, 10, filterAuthor));
console.log('posts after filtering by hashtag \'fun7\':');
console.log(func.getPhotoPosts(0, 10, filterTag));

console.log('\n-getPhotoPost');
console.log('post with id 2:');
console.log(func.getPhotoPost('2'));
console.log('post with id 11:');
console.log(func.getPhotoPost('11'));

console.log('\n-validatePhotoPost');
console.log('with valid properties:');
console.log(func.validatePhotoPost({
    id: '4',
    description: '123',
    createdAt: new Date('2007-2-2'),
    author: 'Alex',
    photoLink: 'link',
    hashTags: ['tag1', 'tag2'],
    likes: ['me'],
}));
console.log('with invalid createdAt:');
console.log(func.validatePhotoPost({
    id: '4',
    description: '123',
    createdAt: 100,
    author: 'Alex',
    photoLink: 'link',
    hashTags: ['tag1', 'tag2'],
    likes: ['me']
}));

console.log('\n-addPhotoPost');
console.log('all posts: ');
console.log(photoPosts);
console.log('trying to add invalid post: ');
console.log(func.addPhotoPost({
    id: '4',
    description: 'Hello',
    createdAt: 4
}));
console.log('all posts: ');
console.log(photoPosts);
console.log('trying to add valid post: ');
console.log(func.addPhotoPost({
    id: '4',
    description: '123',
    createdAt: new Date('2007-2-2'),
    author: 'Alex',
    photoLink: 'link',
    hashTags: ['tag1', 'tag2'],
    likes: ['me'],
}));
console.log('all posts: ');
console.log(photoPosts);

console.log('\n-editPhotoPost');
console.log('post #3 before editing:');
console.log(func.getPhotoPost('3'));
console.log('trying to edit post #3:');
console.log(func.editPhotoPost('3', {
    photoLink: 'new link',
    description: '456'
}));
console.log('post #3 after editing:');
console.log(func.getPhotoPost('3'));

console.log('\n-removePhotoPost');
console.log('removing post #3');
console.log(func.removePhotoPost('3'));
console.log('trying to get post #3');
console.log(func.getPhotoPost('3'));


