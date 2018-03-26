const threadPage = new function () {
    this.page = () => {
        let main = document.createElement('main');
        main.className = 'main';
        return main;
    }

    this.load = (withPosts) => {
        document.querySelector('header').style.display = '';
        document.querySelector('#root').insertBefore(this.page(), document.querySelector('footer'));
        if (withPosts) {
            domF.addPhotoPosts();
        }
    }

    this.unload = () => {
        //document.querySelector('#root').removeChild(document.querySelector('main'));
    }

    this.changeUser = () => {
        domF.clearThread();
        domF.addPhotoPosts();
    }
}