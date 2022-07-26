import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);

        for (let card of cards) {

            //let statuses = dataHandler.getStatus(card.status_id)


            const cardBuilder = htmlFactory(htmlTemplates.card);

            const content = cardBuilder(card);
            console.log("board id: " + boardId)
            console.log("card_board_id : " + card.board_id)
            console.log("card_status_id: " + card.status_id)


            if (boardId == card.board_id && card.status_id == 1) {
                domManager.addChild(`.board-column-content[data-card-title="${card.status_id}"]`, content);
                //domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
                //console.log("New")
            }
            else if (card.board_id == boardId && card.status_id == 2) {
                domManager.addChild(`.board-column-content[data-card-title="${card.status_id}"]`, content)
                //console.log("In Progress")
            }
            else if (card.board_id == boardId && card.status_id == 3) {
                domManager.addChild(`.board-column-content[data-card-title="${card.status_id}"]`, content)
                //console.log("Testing")
            }
            else if (card.board_id == boardId && card.status_id == 4) {
                domManager.addChild(`.board-column-content[data-card-title="${card.status_id}"]`, content)
                //console.log("Done")
            }
            //domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};

function deleteButtonHandler(clickEvent) {

}
