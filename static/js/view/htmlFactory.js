export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container">
                <div class="board" data-board-id=${board.id}></div>
                <div class="board-header"><span class="board-title">${board.title}</span></div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content" data-board-id=${board.id}></div>
                </div>    
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content" data-board-id=${board.id}></div>
                </div>   
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content" data-board-id=${board.id}></div>
                </div>     
                <div class="board-column">
                    <div class="board-column-title">Todo</div>
                    <div class="board-column-content" data-board-id=${board.id}></div>
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">
                <button class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i>Remove</button>
                <div class="card-title">${card.title}</div>
            </div>`;
}

function buttonBuilder(button) {

}

