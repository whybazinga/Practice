const coreF = (function(params) {
  return {
    getPhotoPosts: function(skip = 0, top = 10, filterConfig) {
      let result;
      if (
        arguments.length < 3 ||
        filterConfig === undefined ||
        Object.getOwnPropertyNames(filterConfig).length === 0
      ) {
        result = photoPosts.slice(skip, skip + top);
      } else {
        result = photoPosts.slice(skip, skip + top).filter(element => {
          let flag = false;
          if (filterConfig.hasOwnProperty("author")) {
            flag = element.author === filterConfig.author;
          }
          if (filterConfig.hasOwnProperty("createdAt")) {
            flag =
              filterConfig.createdAt.getFullYear() ===
                element.createdAt.getFullYear() &&
              filterConfig.createdAt.getMonth() ===
                element.createdAt.getMonth() &&
              filterConfig.createdAt.getDate() === element.createdAt.getDate();
          }
          if (filterConfig.hasOwnProperty("hashTags")) {
            flag = filterConfig.hashTags.every(tag => {
              return element.hashTags.includes(tag);
            });
          }
          return flag;
        });
      }
      return result;
    },

    getPhotoPost: function(id) {
      return photoPosts.find(element => {
        return element.id == id;
      });
    },

    validatePhotoPost: function(photoPost) {
      if (
        typeof photoPost.description !== "string" ||
        photoPost.description.length > 200
      ) {
        return false;
      }
      if (new Date(photoPost.createdAt) > new Date()) {
        return false;
      }
      if (typeof photoPost.author !== "string" || photoPost.author === "") {
        return false;
      }
      if (
        typeof photoPost.photoLink !== "string" ||
        photoPost.photoLink === ""
      ) {
        return false;
      }
      if (
        !(photoPost.hashTags instanceof Array) ||
        !photoPost.hashTags.every(element => {
          return typeof element === "string";
        })
      ) {
        return false;
      }
      return true;
    },

    addPhotoPost: function(photoPost) {
      if (this.validatePhotoPost(photoPost)) {
        photoPosts.push(photoPost);
        photoPosts.sort((element1, element2) => {
          return new Date(element2.createdAt) - new Date(element1.createdAt);
        });
        return true;
      } else return false;
    },

    editPhotoPost: function(id, photoPost) {
      let postToChange = this.getPhotoPost.call({ photoPosts: photoPosts }, id);
      if (postToChange !== undefined) {
        Object.assign(Object.assign({}, postToChange), photoPost);
        if (this.validatePhotoPost(postToChange)) {
          Object.assign(postToChange, photoPost);
          return true;
        }
      }
      return false;
    },

    removePhotoPost: function(id) {
      let index = photoPosts.findIndex(element => {
        return element.id == id;
      });
      if (index != -1) {
        photoPosts.splice(index, 1);
        ls.savePosts(photoPosts);
        return true;
      } else return false;
    }
  };
})();

module.exports = coreF;
