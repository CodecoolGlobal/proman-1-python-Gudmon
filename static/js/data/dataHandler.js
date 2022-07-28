export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        return await apiGet('/api/boards/'+boardId+'/');
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        return await apiGet(`/api/boards/${statusId}/cards/`)
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (board_id, status_id, title, text, card_order) {
        const payload = {
            "board_id": board_id,
            "status_id": status_id,
            "title": title,
            "text": text,
            "card_order": card_order
        };
        console.log('POST')
        return await apiGet(`/api/boards/${board_id}/cards/`);
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json()
    } else {
        return console.log("Something went wrong")
    }
}

async function apiPost(url, payload) {
    let message = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (message.ok) {
        return await message.json();
    } else {
        return console.log("Something went wrong");
    }
}

async function apiDelete(url) {
}

async function apiPut(url, payload) {
    let message = await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (message.ok) {
        return await message.json();
    } else {
        return console.log("Something went wrong");
    }
}

async function apiPatch(url) {
}
