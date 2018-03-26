const ls = (function() {
  return {
    init: () => {
      storagePosts.sort((element1, element2) => {
        return element2.createdAt - element1.createdAt;
      });
      localStorage.setItem("0", JSON.stringify(storageUsers));
      ls.savePosts(storagePosts);
    },

    getUsers: () => {
      return JSON.parse(localStorage.getItem("0"));
    },

    getPosts: () => {
      return JSON.parse(localStorage.getItem("1"));
    },

    savePosts: photoPosts => {
      localStorage.setItem("1", JSON.stringify(photoPosts));
    }
  };
})();

window.nextId = (() => {
  let id = 1;
  return () => {
    return id++;
  };
})();

const storageUsers = [
  {
    username: "Alex",
    password: "123"
  },
  {
    username: "Gena",
    password: "0"
  }
];

const storagePosts = [
  {
    id: nextId(),
    description: "в Пхёнчхане!!!",
    createdAt: new Date(2014, 1, 20),
    author: "Alex",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: nextId(),
    description: "sample text",
    createdAt: new Date("2014-02-23T23:00:00"),
    author: "Alex",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: nextId(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdAt: new Date("2014-02-23T23:00:00"),
    author: "Alex",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: nextId(),
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdAt: new Date("2015-02-23T23:00:00"),
    author: "Xela",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: nextId(),
    description: "Its so boring to write this objects",
    createdAt: new Date("2016-02-23T23:00:00"),
    author: "Gena",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  },
  {
    id: nextId(),
    description: "Gena is really cool",
    createdAt: new Date("2015-02-23T23:00:00"),
    author: "Gena",
    photoLink: "http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg",
    hashTags: ["#sport"],
    likes: []
  }
];
