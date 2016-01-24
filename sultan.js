var board;

var pieces = [
    {
        position: [4, 2],
        moveStyle: function () {
            var x = this.position[0],
                y = this.position[1],
                tiles = [];
            return [
                [x + 1, y],
                [x - 1, y],
                [x, y + 1],
                [x, y - 1]
            ];
        }
    },
    {
        position: [2,4]
    },
    {
        position: [6,4]
    },
    {
        position: [5,1]
    }
];

function randomInt(n) {
    return Math.floor(Math.random() * n);
}

function generateBoard(x, y) {
    var i,
        j,
        board = [],
        line;
    for (i = 0; i < x; i = i + 1) {
        line = [];
        for (j = 0; j < y; j = j + 1) {
            line.push(".");
        }
        board.push(line);
    }
    return board;
}

function placePieces() {
    var i,
        x,
        y;
    board = generateBoard(8, 8);
    for (i = 0; i < pieces.length; i = i + 1) {
        x = pieces[i].position[0];
        y = pieces[i].position[1];
        board[x][y] = "P";
    }
}

function board_to_string(board) {
    var rows = [],
        i;
    for (i = 0; i < board.length; i = i + 1) {
        rows.push(board[i].join(''));
    }
    return rows.join('\n');
}

function checkLegality(coord) {
    function is_on_coord (piece) {
        return piece.position[0] == coord[0] && piece.position[1] == coord[1];
    } 
    if (coord[0] < 0 || coord[0] >= board.length) {
        return false
    } else if (coord[1] < 0 || coord[1] >= board.length) {
        return false;
    } else if (pieces.some(is_on_coord)) {
        return false;
    }
    return true;
}

function drawBoard() {
    placePieces();
    document.querySelector('#board').textContent = board_to_string(board);
}

function move() {
    var tl = pieces[0].moveStyle(),
        legal_tl = tl.filter(checkLegality);
    if (legal_tl.length > 0) {
        pieces[0].position = legal_tl[randomInt(legal_tl.length)];
    } else {
        console.warn("PANIC")
    }
    drawBoard();
}

drawBoard();

document.querySelector('#move').addEventListener("click", move);

//var piece_types = [
//    {
//        name:'Bishop',
//        movement: function (x, y) {
//            move like a bishop
//            sing like a bird
//            die like an HTMLTableRowElement
//            return true/false'
//        }
//    }
//];

//function () {
//    genera tutte le coordinate
//    scegli una caso
//    la rimuovi dalla lista
//    e la dai a piece type appropriato
//    if true fai lamossa
//    if false ricomincie
//    draw board
//}

//genera tutte le coordinate
//crea una lista
//popolala di elementi [0,0-8] * numero di colonne


//function legal_tiles(board) {
//    var i,
//        j,
//        coords = [];
//    for (i = 0; i < board.length; i = i + 1) {
//        for (j = 0; j < board[i].length; j = j + 1) {
//            coords.push([i, j]);
//        }
//    }
//    return coords;
//}




//var deck = ["1", "2", "3", "4", "5", "6"];
//function shuffle() {
//var shuf_deck = [],
//    rand_card = Math.floor(Math.random() * deck.length),
//    i = deck.length;
//for (i; i > 0; i = i - 1) {
//    shuf_deck.push(deck[rand_card]);
//    deck.splice(rand_card, 1);
//    rand_card = Math.floor(Math.random() * deck.length);
//}
//deck = shuf_deck;
//document.querySelector('#deck').textContent = deck;
//}
//
//document.querySelector('#shuffle').addEventListener("click", shuffle);