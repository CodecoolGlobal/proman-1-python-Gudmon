import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dragManager} from "../controller/dragManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);

        for (let card of cards) {

            let statuses = dataHandler.getStatus(card.status_id)


            const cardBuilder = htmlFactory(htmlTemplates.card);

            const content = cardBuilder(card);
            // console.log("board id: " + boardId)
            // console.log("title: " + card.title)
            // console.log("card_board_id : " + card.board_id)
            // console.log("card_status_id: " + card.status_id)

            domManager.addChild(`.board[data-board-id="${boardId}"] .board-column-content[data-card-title="${card.status_id}"]`, content)
            // domManager.addChild(`.toggle-board-btn[data-board-id="${boardId}"]`, content);
            //domManager.addChild(`.board-column-content[data-card-title="${card.status_id}"]`, content)


            domManager.addEventListener(
                `.card-remove[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};

function deleteButtonHandler(clickEvent) {
    clickEvent.target.parentElement.remove();
}
