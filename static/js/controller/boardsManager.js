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
            )
            cardsManager.loadCards(`${board.id}`);
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(this)
    let selectedBoard = document.querySelectorAll(`.board-columns[data-board-id="${boardId}"`)
    if (selectedBoard[0].classList.value === 'board-columns camo') {
        selectedBoard[0].classList.value = "board-columns"
        console.log(selectedBoard[0].classList.value)
        this.innerText = "Hide Cards"
    }


        // if (this.innerText === "Hide Cards"){
        //     this.innerText = "Show Cards";
        // }
        // else {
        //     this.innerText = "Hide Cards";
        // }
    else{
        selectedBoard[0].classList.value = selectedBoard[0].classList.value + " camo"
        this.innerText = "Show Cards"
    }
}


