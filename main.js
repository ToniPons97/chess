const jsChessEngine = require('js-chess-engine');
const prompt = require('prompt-sync')({sigint: true});
const game = new jsChessEngine.Game();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

game.printToConsole();

let userMove;
const main = async () => {
    let counter = 0;
    while(userMove !== 'EXIT') {
        let isWhitesTurn = counter % 2 === 0;
        if (isWhitesTurn) {
            userMove = prompt('Enter your move: ').toUpperCase();
            const [from, to] = userMove.split(' ');
            
            try {
                game.move(from, to);
                game.printToConsole();
            } catch {
                game.printToConsole();
                console.log('Invalid move!');
                --counter;
            }
            await sleep(1000);
        } else {
            const aiMoved = game.aiMove();
            game.printToConsole();            
        }
        counter++;
    }
}

main();