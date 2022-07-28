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
            domManager.addEventListener(
                `.board[data-board-id="${board.id}"] .card-add[data-new-card="${board.id}"]`,
                "click",
                addCard
            )

            cardsManager.loadCards(`${board.id}`);
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let selectedBoard = document.querySelectorAll(`.board-columns[data-board-id="${boardId}"`)
    if (selectedBoard[0].classList.value === 'board-columns camo') {
        selectedBoard[0].classList.value = "board-columns"
        selectedBoard[0].style.animation = "boardOpen 0.3s ease-out"
        this.innerText = "Hide Cards"
    }
    else{
        selectedBoard[0].classList.value = selectedBoard[0].classList.value + " camo"
        this.innerText = "Show Cards"
    }
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


function addCard(clickEvent) {
// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.
    let parentBoard = (clickEvent.target.parentElement.parentElement)
    let parentBoardId = parentBoard.dataset.boardId
    let modal = document.querySelector(`.modal[data-new-modal="${parentBoardId}"]`);
    let btn = document.querySelector(`.card-add[data-new-card="${parentBoardId}"]`);


    // Get the <span> element that closes the modal
    let span = document.querySelector(`.close[data-card-close="${parentBoardId}"]`);


    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }

}


}

