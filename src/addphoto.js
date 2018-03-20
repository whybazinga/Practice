const addPhoto = new function () {
    this.page = () => {
        let main = document.createElement('main');
        main.className = 'add-photo';
        main.innerHTML = `
            <div class="photo-drag-input">
                <div id="drop-zone">
                    <div class="drop-upload">
                        <img src="icons/upload.png">
                        <h3>Upload</h3>
                    </div>
                </div>
            </div>
            <div class="photo-info"></div>
        `;
        return main;
    }

    this.init = () => {
        let reader, file;
        let dropZone = document.querySelector('#drop-zone');
        function abortRead() {
            reader.abort();
        }

        function abortHandler(e) {
            alert('File read Canceled');
        }

        function errorHandler(e) {
            switch (e.target.error.code) {
                case e.target.error.NOT_FOUND_ERR:
                    alert('File Not Found!');
                    break;
                case e.target.error.NOT_READABLE_ERR:
                    alert('File is not readable');
                    break;
                case e.target.error.ABORT_ERR:
                    break;
                default:
                    alert('An error occurred reading this file.');
            }
        }

        function loadHandler(theFile) {
            let img = document.createElement('img');
            img.src = reader.result;
            img.title = escape(theFile.name);
            img.className = 'uploaded-image';
            dropZone.innerHTML = '';
            dropZone.appendChild(img);
        }

        function appendThumbnail(f) {
            reader = new FileReader();
            reader.onerror = errorHandler;
            reader.onabort = abortHandler;
            reader.onload = loadHandler;
            reader.readAsDataURL(f);
        }

        function handleFileSelect(e) {
            e.stopPropagation();
            e.preventDefault();
            dropZone.classList.remove('dragover');
            file = e.dataTransfer.files[0];
            if (file.type.match('image.*')) {
                appendThumbnail(file);
            }
        }

        function handleDragEnter(e) {
            e.preventDefault();
            this.classList.add('dragover');
            if (this.children[0].children[1]) {
                this.children[0].children[1].innerHTML = 'Drag here';
            }
        }

        function handleDragLeave(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            if (this.children[0].children[1]) {
                this.children[0].children[1].innerHTML = 'Upload';
            }
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }

        dropZone.addEventListener('dragenter', handleDragEnter, false);
        dropZone.addEventListener('dragleave', handleDragLeave, false);
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
    }

    this.load = () => {
        document.querySelector('#root').insertBefore(this.page(), document.querySelector('footer'));
        this.init();
    }

    this.unload = () => {
        let dropZone = document.querySelector('#drop-zone');
        dropZone.ondragenter = null;
    }
}

addPhoto.load();