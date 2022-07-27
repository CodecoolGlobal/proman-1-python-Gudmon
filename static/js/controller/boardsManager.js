import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


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
            );
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    if (this.innerHTML === "Hide Cards"){
        this.innerHTML = "Show Cards";
        let selected = document.querySelectorAll(`.board-column-content[data-board-id="${boardId}"]`);
        selected.forEach(swapDisplay);
    }
    else if (this.innerHTML === "Show Cards"){
        this.innerHTML = "Hide Cards";
        let selected = document.querySelectorAll(`.board-column-content[data-board-id="${boardId}"]`);
        selected.forEach(swapDisplay);
    }
    else cardsManager.loadCards(boardId);
        this.innerHTML = "Hide Cards";
}

function swapDisplay(e){
    if (e.style.display === 'none'){
        e.style.display = 'block';
    }
    else e.style.display = 'none';
}

