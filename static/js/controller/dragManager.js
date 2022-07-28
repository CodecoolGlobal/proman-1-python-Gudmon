export {dragManager}

let draggableStuff = null;

let dragManager = {

    dragStart: function () {
        draggableStuff = this;

    },

    dragEnd: function () {
        draggableStuff = null;

    },

    dragOver: function (e) {
        e.preventDefault();

    },

    dragEnter: function () {
        this.style.border = '1px dashed #ccc'

    },

    dragLeave: function () {
        this.style.border = 'none';
        console.log("dragleave");
    },

    dragDrop: function () {
        this.style.border = 'none';
        this.appendChild(draggableStuff);

    },


    initDrag: function () {
        let draggables = document.querySelectorAll(".card")
        let dropTarget = document.querySelectorAll(".board-column-content")

        dropTarget.forEach(status => status.addEventListener('dragover', dragManager.dragOver))
        dropTarget.forEach(status => status.addEventListener('dragenter', dragManager.dragEnter))
        dropTarget.forEach(status => status.addEventListener('dragleave', dragManager.dragLeave))
        dropTarget.forEach(status => status.addEventListener('drop', dragManager.dragDrop))
        draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", dragManager.dragStart);
         draggable.addEventListener("dragend", dragManager.dragEnd);
    })
    }
}
