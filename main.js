const jsChessEngine = require('js-chess-engine');
const prompt = require('prompt-sync')({sigint: true});
const game = new jsChessEngine.Game();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

game.printToConsole();

let userMove;

const main = async () => {
    while(userMove !== 'EXIT') {
        userMove = prompt('Enter your move:').toUpperCase();
        //console.log(userMove.split(' '));
        const [from, to] = userMove.split(' ');
        game.move(from, to);
        game.printToConsole();
        await sleep(1000);
        console.clear();
        game.aiMove();
        game.printToConsole();
    }
}

main();

/*
try {
    game.move("G1", "F3");
} catch(e) {
    console.error(`${e}`);
}

let move = game.aiMove();
console.log(move);
game.printToConsole();
//console.clear();
*/