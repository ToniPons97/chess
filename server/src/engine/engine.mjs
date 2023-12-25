import jsChessEngine from 'js-chess-engine';

export default class Engine {
    game;

    constructor() {
        this.game = new jsChessEngine.Game();
        this.game.printToConsole();
    }

    move(from, to) {
        console.log(this.game.board);
        try {
            this.game.move(from, to);
            const aiMove = this.game.aiMove();
            this.game.printToConsole();
            return aiMove;
        } catch (error) {
            console.error(error);
        }
    }

    getState() {
        return status;
    }
}