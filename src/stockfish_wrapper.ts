import { Dispatch, SetStateAction } from "react"

// class to interface with stockfish chess engine
class StockfishWrapper{

    sf_worker: Worker
    sf_initialized: Boolean = false
    sf_ready: Boolean = false

    sf_worker_listener: (this: Worker, ev: MessageEvent<any>) => any

    //methods to update web app state, passed in to constructor
    set_best_move: Dispatch<SetStateAction<string>>

    constructor(set_best_move: Dispatch<SetStateAction<string>>) {

        this.sf_worker = new Worker("/stockfish.js")

        //set functions to update web app state
        this.set_best_move = set_best_move

        //define the listener for handling response from stockfish
        this.sf_worker_listener = (event: MessageEvent) => {

            var recievedMessage: string = event.data;

            console.log(recievedMessage)

            //switch statement to handle various response from the stockfish engine
            switch (recievedMessage) {

                case "uciok": {

                    console.log("Stockfish initialized");
                    break;

                }
                
                case "readyok": {

                    this.sf_ready = true;
                    break;

                }

                default: {

                    break;

                }

            }

        }

    }

    //initialize stockfish
    init_sf() {

        if (!this.sf_initialized) {

            console.log("STOCKFISH: INITIALIZING STOCKFISH ENGINE")

            this.sf_worker.onmessage = this.sf_worker_listener;

            this.sf_worker.postMessage("uci")

            this.sf_initialized = true

        }

    }

    //terminate the engine
    quit_engine() {
        
        this.sf_worker.postMessage("quit")

        this.sf_initialized = false

    }

}

export default StockfishWrapper