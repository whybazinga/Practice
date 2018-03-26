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
    description: "Fantastic, neo-punk illustrations by artist Jor-Ros",
    createdAt: new Date(2017, 1, 20),
    author: "Alex",
    photoLink:
      "https://i.pinimg.com/originals/80/5f/fe/805ffe6b5120ac4345d577504f134ecb.jpg",
    hashTags: ["#jorros", "#artist"],
    likes: []
  },
  {
    id: nextId(),
    description: "Fantastic, neo-punk illustrations by artist Jor-Ros",
    createdAt: new Date("2014-02-23T23:00:00"),
    author: "Alex",
    photoLink:
      "https://78.media.tumblr.com/639a15872d56858e2d39ee421d288e3d/tumblr_on6og0v1y31qz9v0to6_1280.jpg",
    hashTags: ["#neo", "#punk", "#jorros"],
    likes: []
  },
  {
    id: nextId(),
    description: "Fantastic, neo-punk illustrations by artist Jor-Ros",
    createdAt: new Date("2014-02-23T23:00:00"),
    author: "Alex",
    photoLink:
      "https://78.media.tumblr.com/e37c07979856f2104fd328e98399e8ea/tumblr_on6og0v1y31qz9v0to2_1280.jpg",
    hashTags: ["#artist"],
    likes: []
  },
  {
    id: nextId(),
    description: "Childish Gambino",
    createdAt: new Date("2015-02-23T23:00:00"),
    author: "Xela",
    photoLink:
      "https://s-media-cache-ak0.pinimg.com/originals/1a/be/13/1abe13e0f00c492f045f4f37a87cfdc3.jpg",
    hashTags: ["#art", "#childish"],
    likes: []
  },
  {
    id: nextId(),
    description: "Its so boring to write this objects",
    createdAt: new Date("2016-02-23T23:00:00"),
    author: "Gena",
    photoLink:
      "https://static1.squarespace.com/static/59eb225f18b27d7095ce47d3/59eb56e06957da7471d600b8/59eb5700edaed8b0a791a3b9/1508595475557/scar2.png?format=1000w",
    hashTags: ["#scarface"],
    likes: []
  },
  {
    id: nextId(),
    description: "Jor-Ros is perfect",
    createdAt: new Date("2015-02-23T23:00:00"),
    author: "Gena",
    photoLink:
      "https://i.pinimg.com/736x/43/f3/ee/43f3eee694d4199a7e22a3efe3679884.jpg",
    hashTags: ["#sport"],
    likes: []
  }
];
