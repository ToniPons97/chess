let squares = Array.from(document.querySelectorAll(".cols div"));
squares.forEach(sqr => sqr.addEventListener('click', () => {
    let isSelected = sqr.classList.contains('selected');
    let selectedIndex = squares.indexOf(sqr);
    
    isSelected ? sqr.classList.remove('selected')
        : sqr.classList.add('selected');

    cleanPrevSelectedSqr(selectedIndex, squares);
    getCoordsFromSelectedSqr(sqr);
}));

function cleanPrevSelectedSqr(sqrIndex, sqrArr) {
    sqrArr.forEach(sqr => {
        if (sqrArr.indexOf(sqr) !== sqrIndex) 
            sqr.classList.remove('selected')
    });
}

function getCoordsFromSelectedSqr(selectedSqr) {
    const coordinates = {
        'col': selectedSqr.parentNode.id,
        'row': selectedSqr.classList[0]
    }

    console.log(`${coordinates.col}${coordinates.row}`);
}