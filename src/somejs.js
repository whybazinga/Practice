const users = [
    {
        username: 'Alex',
        password: '123',
        posts: ['1', '2'],
    },
    {
        username: 'Xela',
        password: '321',
        posts: ['3', '4'],
    },
    {
        username: 'Gena',
        password: '111',
        posts: ['5', '6'],
    },
]

const photoPosts = [
    {
        id: '1',
        description: 'в Пхёнчхане!!!',
        createdAt: new Date('2014-02-23T23:00:00'),
        author: 'Alex',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#sport'],
        likes: [],
    },
    {
        id: '2',
        description: 'sample text',
        createdAt: new Date('2014-02-23T23:00:00'),
        author: 'Alex',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#sport'],
        likes: [],
    },
    {
        id: '3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        createdAt: new Date('2014-02-23T23:00:00'),
        author: 'Xela',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#sport'],
        likes: [],
    },
    {
        id: '4',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        createdAt: new Date('2015-02-23T23:00:00'),
        author: 'Xela',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#sport'],
        likes: [],
    },
    {
        id: '5',
        description: 'Its so boring to write this objects',
        createdAt: new Date('2016-02-23T23:00:00'),
        author: 'Gena',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#sport'],
        likes: [],
    },
    {
        id: '6',
        description: 'Gena is really cool',
        createdAt: new Date('2015-02-23T23:00:00'),
        author: 'Gena',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#sport'],
        likes: [],
    },
]

function currentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function logOut() {
    sessionStorage.removeItem('currentUser');
}