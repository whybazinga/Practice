const coreF = (function () {
  return {
    getPhotoPosts(skip = 0, top = 10, filterConfig) {
      let result;
      if (
        arguments.length < 3 ||
                filterConfig === undefined ||
                Object.getOwnPropertyNames(filterConfig).length === 0
      ) {
        result = this.photoPosts.slice(skip, skip + top);
      } else {
        result = this.photoPosts.slice(skip, skip + top).filter((element) => {
          let flag = false;
          if (filterConfig.hasOwnProperty('author')) {
            flag = element.author === filterConfig.author;
          }
          if (filterConfig.hasOwnProperty('createdAt')) {
            flag =
                            filterConfig.createdAt.getFullYear() ===
                            element.createdAt.getFullYear() &&
                            filterConfig.createdAt.getMonth() ===
                            element.createdAt.getMonth() &&
                            filterConfig.createdAt.getDate() === element.createdAt.getDate();
          }
          if (filterConfig.hasOwnProperty('hashTags')) {
            flag = filterConfig.hashTags.every(tag => element.hashTags.includes(tag));
          }
          return flag;
        });
      }
      return result;
    },

    getPhotoPost(id) {
      return this.photoPosts.find(element => element.id == id);
    },

    validatePhotoPost(photoPost) {
      if (
        typeof photoPost.description !== 'string' ||
                photoPost.description.length > 200
      ) {
        return false;
      }
      if (new Date(photoPost.createdAt) > new Date()) {
        return false;
      }
      if (typeof photoPost.author !== 'string' || photoPost.author === '') {
        return false;
      }
      if (
        typeof photoPost.photoLink !== 'string' ||
                photoPost.photoLink === ''
      ) {
        return false;
      }
      if (
        !(photoPost.hashTags instanceof Array) ||
                !photoPost.hashTags.every(element => typeof element === 'string')
      ) {
        return false;
      }
      return true;
    },

    addPhotoPost(photoPost) {
      if (this.validatePhotoPost(photoPost)) {
        this.photoPosts.push(photoPost);
        this.photoPosts.sort((element1, element2) => new Date(element2.createdAt) - new Date(element1.createdAt));
        return true;
      } return false;
    },

    editPhotoPost(id, photoPost) {
      const postToChange = this.getPhotoPost.call({ photoPosts: this.photoPosts }, id);
      if (postToChange !== undefined) {
        Object.assign(Object.assign({}, postToChange), photoPost);
        if (this.validatePhotoPost(postToChange)) {
          Object.assign(postToChange, photoPost);
          return true;
        }
      }
      return false;
    },

    removePhotoPost(id) {
      const index = this.photoPosts.findIndex(element => element.id == id);
      if (index != -1) {
        this.photoPosts.splice(index, 1);
        return true;
      } return false;
    },
  };
}());

module.exports = coreF;
