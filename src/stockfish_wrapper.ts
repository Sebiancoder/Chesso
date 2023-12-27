// class to interface with stockfish chess engine
class StockfishWrapper{

    sf_worker: Worker

    constructor() {

        this.sf_worker = new Worker("/stockfish.js")

        this.sf_worker.postMessage("uci")

        this.sf_worker.onmessage = this.stockfish_listener;

    }

    // function to handle response from stockfish
    stockfish_listener(event: Event){

        console.log(event)

    }

}

export default StockfishWrapper