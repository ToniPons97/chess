// All squares array.
let squares = Array.from(document.querySelectorAll(".cols div"));
let userMoveSelection = [];

// Event listener to listen for clicks and select or unselect square.
const squareSelection = () => {
    squares.forEach(sqr => sqr.addEventListener('click', () => {
        let isSelected = sqr.classList.contains('selected');
        let selectedIndex = squares.indexOf(sqr);

        // if (sqr.firstChild && userMoveSelection.length < 2) {
        //     isSelected ? sqr.classList.remove('selected')
        //         : sqr.classList.add('selected');

        //     cleanPrevSelectedSqr(selectedIndex, squares);
        //     getCoordsFromSelectedSqr(sqr);
        // }
        getCoordsFromSelectedSqr(sqr);
    }));

    /*
    Unselect square clicking outside of the board.
    This isn't working
    
    document.querySelector('body').addEventListener('click', () => {
        squares.forEach(sq => {
            if (sq.classList.contains('selected'))
                sq.classList.remove('selected');
        });
    });
    */
}


const cleanPrevSelectedSqr = (sqrIndex, sqrArr) => {
    sqrArr.forEach(sqr => {
        if (sqrArr.indexOf(sqr) !== sqrIndex)
            sqr.classList.remove('selected')
    });
}

const getCoordsFromSelectedSqr = (selectedSqr) => {
    const coordinates = {
        'col': selectedSqr.parentNode.id,
        'row': selectedSqr.classList[0]
    }

    console.log(`${coordinates.col}${coordinates.row}`);
    userMoveSelection.push(`${coordinates.col}${coordinates.row}`);

    // Sending post request to server if this array has 2 coordinates
    console.log(userMoveSelection);

    if (userMoveSelection.length === 2) {

        updateBoard(userMoveSelection);

        const [from, to] = userMoveSelection;
        let moveObj = new Object();
        moveObj[from] = to;

        console.log(moveObj);
        sendMove(moveObj);
    }

    if (userMoveSelection.length >= 2)
        userMoveSelection.length = 0;


}

const getSquareFromCoordsString = (coords) => {
    const [col, row] = coords.split('');

    const column = Array.from(document.querySelectorAll('.cols')).find(c => {
        if (c.id === col)
            return c;
    })

    const square = Array.from(column.querySelectorAll('div')).find(r => {
        if (r.classList[0] === row)
            return row;
    })

    //console.log(square);
    return square;
}

const themeSwitch = () => {
    const colorPickersArr = Array.from(document.querySelectorAll('.edit-color > input'));
    document.querySelectorAll('.square-color').forEach(colorPicker => {
        colorPicker.addEventListener('input', (ev) => {
            console.log('Changed!', ev.target.value, ev.target.id);

            if (colorPickersArr.indexOf(ev.target) % 2 === 0)
                document.documentElement.style.setProperty('--sqr-color-1', ev.target.value);
            else
                document.documentElement.style.setProperty('--sqr-color-2', ev.target.value);
        });
    });
}

const populateSquare = (squareCoord, piece) => {
    const square = getSquareFromCoordsString(squareCoord);
    const image = document.createElement('img');
    image.src = piece;
    square.appendChild(image);
}

const initWhitePieces = () => {
    const pieces = {
        r: 'assets/90px-Chess_rlt45.svg.png',
        n: 'assets/90px-Chess_nlt45.svg.png',
        b: 'assets/90px-Chess_blt45.svg.png',
        q: 'assets/90px-Chess_qlt45.svg.png',
        k: 'assets/90px-Chess_klt45.svg.png',
        p: 'assets/90px-Chess_plt45.svg.png',
    };

    populateSquare('A1', pieces.r);
    populateSquare('A2', pieces.p);
    populateSquare('B1', pieces.n);
    populateSquare('B2', pieces.p);
    populateSquare('C1', pieces.b);
    populateSquare('C2', pieces.p);
    populateSquare('D1', pieces.q);
    populateSquare('D2', pieces.p);
    populateSquare('E1', pieces.k);
    populateSquare('E2', pieces.p);
    populateSquare('F1', pieces.b);
    populateSquare('F2', pieces.p);
    populateSquare('G1', pieces.n);
    populateSquare('G2', pieces.p);
    populateSquare('H1', pieces.r);
    populateSquare('H2', pieces.p);
}

const initBlackPieces = () => {
    const pieces = {
        r: 'assets/90px-Chess_rdt45.svg.png',
        n: 'assets/90px-Chess_ndt45.svg.png',
        b: 'assets/90px-Chess_bdt45.svg.png',
        q: 'assets/90px-Chess_qdt45.svg.png',
        k: 'assets/90px-Chess_kdt45.svg.png',
        p: 'assets/90px-Chess_pdt45.svg.png',
    };

    populateSquare('A8', pieces.r);
    populateSquare('A7', pieces.p);
    populateSquare('B8', pieces.n);
    populateSquare('B7', pieces.p);
    populateSquare('C8', pieces.b);
    populateSquare('C7', pieces.p);
    populateSquare('D8', pieces.q);
    populateSquare('D7', pieces.p);
    populateSquare('E8', pieces.k);
    populateSquare('E7', pieces.p);
    populateSquare('F8', pieces.b);
    populateSquare('F7', pieces.p);
    populateSquare('G8', pieces.n);
    populateSquare('G7', pieces.p);
    populateSquare('H8', pieces.r);
    populateSquare('H7', pieces.p);
}

const _showSquaresIndexes = () => {
    for (let i = 0; i < squares.length; i++)
        squares[i].textContent = i;
}

const updateBoard = (moves) => {
    console.log(moves);
    const [from, to] = moves;

    let originSqr = getSquareFromCoordsString(from);
    const img = originSqr.firstChild;

    let targetSqr = getSquareFromCoordsString(to);


    if (targetSqr.firstChild === null) {
        targetSqr.appendChild(img);
    }else if (targetSqr.firstChild !== null) {
        // targetSqr.firstChild.src = '';
        targetSqr.removeChild(targetSqr.firstChild);
        targetSqr.appendChild(img);
    }
}

const sendMove = async (move) => {
    const response = await fetch('http://localhost:8888/api/move', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: Object.keys(move)[0],
            to: Object.values(move)[0]
        })
    });

    console.log(response);

    const json = await response.json();
    console.log(json);

    console.log({
        from: Object.keys(json)[0],
        to: Object.values(json)[0]
    });

    await sleep(1000);

    updateBoard([
        Object.keys(json)[0],
        Object.values(json)[0]
    ]);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* CALLING FUNCTIONS */

squareSelection();
themeSwitch();
initWhitePieces();
initBlackPieces();