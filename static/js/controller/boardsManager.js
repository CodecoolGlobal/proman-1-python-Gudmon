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
        let selected = document.querySelectorAll(`.board-column-content[data-board-id="${boardId}"]`);
        console.log(selected);
        selected.forEach(element => element.style.display= "none");
        this.innerHTML = "Show Cards";
    }
    else{
        this.innerHTML = "Hide Cards";
        cardsManager.loadCards(boardId);
    }
}
