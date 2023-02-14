// All squares array.
let squares = Array.from(document.querySelectorAll(".cols div"));

// Event listener to listen for clicks and select or unselect square.
const squareSelection = () => {
    squares.forEach(sqr => sqr.addEventListener('click', () => {
        let isSelected = sqr.classList.contains('selected');
        let selectedIndex = squares.indexOf(sqr);

        if (sqr.firstChild) {
            isSelected ? sqr.classList.remove('selected')
                : sqr.classList.add('selected');
    
            cleanPrevSelectedSqr(selectedIndex, squares);
            getCoordsFromSelectedSqr(sqr);
        }
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
    const piecesWhite = {
        r: 'assets/90px-Chess_rlt45.svg.png',
        n: 'assets/90px-Chess_nlt45.svg.png',
        b: 'assets/90px-Chess_blt45.svg.png',
        q: 'assets/90px-Chess_qlt45.svg.png',
        k: 'assets/90px-Chess_klt45.svg.png',
        p: 'assets/90px-Chess_plt45.svg.png',
    };

    const square = getSquareFromCoordsString(squareCoord);
    const image = document.createElement('img');
    image.src = piecesWhite[piece];
    square.appendChild(image);
}

const initWhitePieces = () => {
    populateSquare('A1', 'r');
    populateSquare('A2', 'p');
    populateSquare('B1', 'n');
    populateSquare('B2', 'p');
    populateSquare('C1', 'b');
    populateSquare('C2', 'p');
    populateSquare('D1', 'q');
    populateSquare('D2', 'p');
    populateSquare('E1', 'k');
    populateSquare('E2', 'p');
    populateSquare('F1', 'b');
    populateSquare('F2', 'p');
    populateSquare('G1', 'n');
    populateSquare('G2', 'p');
    populateSquare('H1', 'r');
    populateSquare('H2', 'p');
}

const _showSquaresIndexes = () => {
    for (let i = 0; i < squares.length; i++)
        squares[i].textContent = i;
}




/* CALLING FUNCTIONS */
squareSelection();
themeSwitch();
//_showSquaresIndexes();
//getSquareFromCoordsString('H3');
initWhitePieces();
//populateSquare('E5', 'q');


