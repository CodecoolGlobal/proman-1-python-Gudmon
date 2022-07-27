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
            cardsManager.loadCards(board.id);
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
    try{
        const selected = document.querySelectorAll(`.board-column[data-board-id="${boardId}"]`);
        selected.forEach(swapDisplay)
        if (this.innerText === "Hide Cards"){
            this.innerText = "Show Cards";
        }
        else {
            this.innerText = "Hide Cards";
        }
    }
    catch (e) {
        console.log(e)
    }
}

function swapDisplay(e){
    if (e.style.display === 'none'){
        e.style.display = 'block';
    }
    else{
        e.style.display = 'none';
    }
}

