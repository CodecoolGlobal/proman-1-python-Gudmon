import data_manager


def get_card_status(status_id):
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_new_card(board_id, status_id, title, text, card_order):
    data_manager.execute_insert(
        """
        INSERT INTO cards (board_id, status_id, title, text, card_order)
        VALUES (%(board_id)s, %(status_id)s, %(title)s, %(text)s, %(card_order)s)
        """, variables={
            'board_id': board_id,
            'status_id': status_id,
            'title': title,
            'text': text,
            'card_order': card_order
        }
    )


