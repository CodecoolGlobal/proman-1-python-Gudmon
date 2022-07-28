export {dragManager}

let draggableStuff = null;

let dragManager = {

    dragStart: function () {
        draggableStuff = this;
        let dropTarget = document.querySelectorAll(".board-column-content")
        console.log(dropTarget)
        dropTarget.forEach(e => {
            e.style.backgroundColor = "green"
            e.style.opacity = "0.4"
        })
        this.style.opacity = "0.5"
        this.style.transform = "scale(0.7)"
        this.style.animation = "heartBeat 0.3s"
    },

    dragEnd: function () {
        let dropTarget = document.querySelectorAll(".board-column-content")
        dropTarget.forEach(e => {
            e.style.backgroundColor = "lightgrey"
            e.style.opacity = "1"
        })
        this.style.opacity = '1'
        this.style.transform = "scale(1)"
        draggableStuff = null;

    },

    dragOver: function (e) {
        e.preventDefault();

    },

    dragEnter: function () {
        this.style.border = "3px dashed"
    },

    dragLeave: function () {
        this.style.border = "none"
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
