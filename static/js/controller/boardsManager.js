import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {dragManager} from "../controller/dragManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            )
            cardsManager.loadCards(`${board.id}`).then(
                dragManager.initDrag
            )

        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let selectedBoard = document.querySelectorAll(`.board-columns[data-board-id="${boardId}"`)
    if (selectedBoard[0].classList.value === 'board-columns camo') {
        selectedBoard[0].classList.value = "board-columns"
        selectedBoard[0].style.animation = "boardOpen 0.3s ease-out"
        this.innerText = "^^^"
    }
    else{
        selectedBoard[0].classList.value = selectedBoard[0].classList.value + " camo"
        this.innerText = "vvv"
    }
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


