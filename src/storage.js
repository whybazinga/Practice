const ls = (function() {
  return {
    init: () => {},

    getUsers: () => {
      localStorage.getItem(0);
    },
    getPosts: () => {
      localStorage.getItem(1);
    }
  };
})();

const users = [
  {
    username: "Alex",
    password: "123"
    // posts: ["1", "2", "3"]
  },
  {
    username: "Gena",
    password: "0"
  }
];

const photoPosts = [
  {
    id: "1",
    description: "в Пхёнчхане!!!",
    createdAt: new Date(2014, 1, 20),
    author: "Alex",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: "2",
    description: "sample text",
    createdAt: new Date("2014-02-23T23:00:00"),
    author: "Alex",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: "3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdAt: new Date("2014-02-23T23:00:00"),
    author: "Alex",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: "4",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdAt: new Date("2015-02-23T23:00:00"),
    author: "Xela",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: "5",
    description: "Its so boring to write this objects",
    createdAt: new Date("2016-02-23T23:00:00"),
    author: "Gena",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: "6",
    description: "Gena is really cool",
    createdAt: new Date("2015-02-23T23:00:00"),
    author: "Gena",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  }
];

// function getCurrentUser() {
//     return JSON.parse(sessionStorage.getItem('currentUser'));
// }

// function logOut() {
//     sessionStorage.removeItem('currentUser');
// }
