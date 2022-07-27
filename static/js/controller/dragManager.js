



let dragManager = {
    dragStart: function () {
        let draggable = this;
        console.log("dragStart");
    },

    dragEnd: function () {
        draggable = null;
        console.log("dragend");
    },

    dragOver: function (e) {
        e.preventDefault();
        console.log('dragOver');
    },

    dragEnter: function () {
        this.style.border = '1px dashed #ccc'
        console.log("dragenter");
    },

    dragLeave: function () {
        this.style.border = 'none';
        console.log("dragleave");
    },

    dragDrop: function () {
        this.style.border = 'none';
        this.appendChild(draggableTodo);
        console.log("drop");
    }
}