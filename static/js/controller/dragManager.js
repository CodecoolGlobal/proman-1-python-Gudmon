let cards = document.querySelectorAll(".card");
let all_status = document.querySelectorAll(".status");
let draggableTodo = null;

cards.forEach(cards=>{
    cards.addEventListener('dragstart', dragStart);
    cards.addEventListener('dragend', dragEnd);
});

function dragStart(){
    draggableTodo = this;
    console.log("dragStart");
}

function dragEnd(){
    draggableTodo = null;
    console.log("dragend");
}

all_status.forEach(status=>{
    status.addEventListener('dragover', dragOver);
    status.addEventListener('dragenter', dragEnter);
    status.addEventListener('dragleave', dragLeave);
    status.addEventListener('drop', dragDrop);
})

function dragOver(e){
    e.preventDefault();
    console.log('dragOver');
}

function dragEnter(){
    this.style.border = '1px dashed #ccc'
    console.log("dragenter");
}

function dragLeave(){
    this.style.border = 'none';
    console.log("dragleave");
}

function dragDrop(){
    this.style.border = 'none';
    this.appendChild(draggableTodo);
    console.log("drop");
}