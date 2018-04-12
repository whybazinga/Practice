const addPhotoPage = new function () {
    this.page = () => {
        let main = document.createElement("main");
        main.className = "add-photo";
        main.innerHTML = `
        <form name="add-photo-form" method="post">
            <div class="photo-drag-input">
                <div class="drop-input-button-bar"></div>
                <input class="dnone" type="file"/>
                <div id="drop-zone">
                    <div class="drop-upload">
                        <img src="icons/upload.png">
                        <h3>Upload</h3>
                    </div>
                </div>
            </div>
            <div class="photo-info">
                <textarea placeholder="Once upon a time..." name="description" maxlength="200" required></textarea>
                <textarea placeholder="tag1 tag2 tag3..." name="hashTags"></textarea>
            </div>
            <div class="add-photo-form-buttons-bar">
                <input type="submit" class="tick-button button" value="">
                <button class="cross-button button">
            </div>
        </form>
        `;
        return main;
    };

    function initUpload() {
        let reader, file;
        let dropZone = document.querySelector("#drop-zone");
        function abortRead() {
            reader.abort();
        }

        function abortHandler(e) {
            alert("File read Canceled");
        }

        function errorHandler(e) {
            switch (e.target.error.code) {
                case e.target.error.NOT_FOUND_ERR:
                    alert("File Not Found!");
                    break;
                case e.target.error.NOT_READABLE_ERR:
                    alert("File is not readable");
                    break;
                case e.target.error.ABORT_ERR:
                    break;
                default:
                    alert("An error occurred reading this file.");
            }
        }

        function loadHandler(theFile) {
            return function (e) {
                let img = document.createElement("img");
                img.src = reader.result;
                img.className = "uploaded-image";
                let deleteButton = document.createElement("button");
                deleteButton.className = "cross-button button addPhoto-delete-image";
                deleteButton.addEventListener("click", handleDelete);
                dropZone.innerHTML = "";
                dropZone.style.alignItems = "flex-start";
                dropZone.parentElement.children[0].appendChild(deleteButton);
                dropZone.appendChild(img);
            };
        }

        function appendThumbnail(f) {
            reader = new FileReader();
            reader.onerror = errorHandler;
            reader.onabort = abortHandler;
            reader.onload = loadHandler(f);
            reader.readAsDataURL(f);
        }

        function handleFileSelect(e) {
            e.stopPropagation();
            e.preventDefault();
            dropZone.classList.remove("dragover");
            file = e.dataTransfer
                ? e.dataTransfer.files[0]
                : document.querySelector("input.dnone").files[0];
            if (file.type.match("image.*")) {
                appendThumbnail(file);
            }
        }

        function handleDelete() {
            dropZone.innerHTML = `
                    <div class="drop-upload">
                        <img src="icons/upload.png">
                        <h3>Upload</h3>
                    </div>
                `;
            dropZone.style.alignItems = "center";
            const deleteButton = document.querySelector("button.cross-button");
            deleteButton.removeEventListener("click", handleDelete);
            dropZone.parentElement.children[0].removeChild(deleteButton);
        }

        function handleClick(e) {
            e.stopPropagation();
            document.querySelector("input.dnone").click();
        }

        function handleDragEnter(e) {
            e.preventDefault();
            this.classList.add("dragover");
            if (this.children[0].children[1]) {
                this.children[0].children[1].innerHTML = "Drag here";
            }
        }

        function handleDragLeave(e) {
            e.preventDefault();
            this.classList.remove("dragover");
            if (this.children[0].children[1]) {
                this.children[0].children[1].innerHTML = "Upload";
            }
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
        }

        dropZone.addEventListener("click", handleClick, false);
        dropZone.addEventListener("dragenter", handleDragEnter, false);
        dropZone.addEventListener("dragleave", handleDragLeave, false);
        dropZone.addEventListener("dragover", handleDragOver, false);
        document
            .querySelector("input.dnone")
            .addEventListener("change", handleFileSelect, false);
        dropZone.addEventListener("drop", handleFileSelect, false);
    }

    function initEditFormActions(editModeId) {
        const form = document.forms["add-photo-form"];
        const dropZone = document.querySelector("#drop-zone");
        form.onsubmit = e => {
            e.preventDefault();
            db.get("/post", { id: editModeId })
                .then(res => {
                    let photoPost = JSON.parse(res);
                    photoPost.description = form.children[1].children[0].value;
                    photoPost.hashTags = form.children[1].children[1].value.split(" ");
                    goToPage("thread", true);
                    domF.editPhotoPost(editModeId, photoPost);
                })
                .catch(err => console.log(err));
        }
    }

    function initAddFormActions() {
        const form = document.forms["add-photo-form"];
        const dropZone = document.querySelector("#drop-zone");
        form.onsubmit = e => {
            e.preventDefault();
            let photoPost = {};
            photoPost.id = window.nextId();
            photoPost.createdAt = new Date();
            photoPost.likes = [];
            photoPost.author = currentUser;
            photoPost.description = form.children[1].children[0].value;
            photoPost.hashTags = form.children[1].children[1].value.split(" ");
            if (dropZone.children[0].nodeName === "DIV") {
                alert("You should upload image first!");
            } else {
                photoPost.photoLink = dropZone.children[0].src;
                goToPage("thread", true);
                domF.addPhotoPost(photoPost);
            }
        }
    }

    this.init = editModeId => {
        if (editModeId) {
            initEditFormActions(editModeId);
        } else {
            initUpload();
            initAddFormActions();
        }
    };

    this.load = (editModeId) => {
        document.querySelector(".header-search-bar").style.display = "none";
        document
            .querySelector("#root")
            .insertBefore(this.page(), document.querySelector("footer"));
        if (editModeId) {
            const dropZone = document.querySelector("#drop-zone");
            const formDescription = document.querySelector("textarea[name=description]");
            const formHashTags = document.querySelector("textarea[name=hashTags]");
            db.get("/post", { id: editModeId })
                .then(res => {
                    const { photoLink, description, hashTags } = JSON.parse(res);
                    let img = document.createElement("img");
                    img.src = photoLink;
                    img.className = "uploaded-image";
                    dropZone.innerHTML = "";
                    dropZone.style.alignItems = "flex-start";
                    dropZone.appendChild(img);
                    formDescription.innerHTML = description;
                    formHashTags.innerHTML = hashTags.reduce(
                        (accum, element) => accum + " " + element
                    );
                })
        }
        this.init(editModeId);
    };

    this.unload = () => {
        document.querySelector(".header-search-bar").style.display = "";
        let dropZone = document.querySelector("#drop-zone");
        dropZone.ondragenter = null;
        dropZone.ondragleave = null;
        dropZone.ondragover = null;
        dropZone.ondrop = null;
        dropZone.onclick = null;
    };

    this.changeUser = () => {
        window.goToPage("login");
    };
}();
