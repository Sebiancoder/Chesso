import { Dispatch, SetStateAction } from "react"

// class to interface with stockfish chess engine
class StockfishWrapper{

    sf_worker: Worker
    sf_initialized: Boolean = false

    //control whether web worker is ready
    sf_ready: boolean
    set_sf_ready: Dispatch<SetStateAction<boolean>>
    set_sf_init: Dispatch<SetStateAction<boolean>>

    //handler for messages from web worker
    sf_worker_listener: (this: Worker, ev: MessageEvent<any>) => any

    //methods to update web app state, passed in to constructor
    set_best_move: Dispatch<SetStateAction<string>>

    constructor(
        sfReady: boolean,
        setSfReady: Dispatch<SetStateAction<boolean>>,
        setSfInit: Dispatch<SetStateAction<boolean>>,
        set_best_move: Dispatch<SetStateAction<string>>
        ) {

        this.sf_ready = sfReady;
        this.set_sf_ready = setSfReady;
        this.set_sf_init = setSfInit;
        this.sf_worker = new Worker("/stockfish.js");

        //set functions to update web app state
        this.set_best_move = set_best_move

        //define the listener for handling response from stockfish
        this.sf_worker_listener = (event: MessageEvent) => {

            var recievedMessage: string = event.data;

            console.log(recievedMessage)

            //switch statement to handle various response from the stockfish engine
            switch (recievedMessage) {

                case "uciok": {

                    this.set_sf_init(true)
                    break;

                }
                
                case "readyok": {

                    this.set_sf_ready(true)
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

    //terminatee the engine
    quit_engine() {
        
        this.sf_worker.postMessage("quit")

        this.sf_worker.terminate()
        this.sf_initialized = false

    }

    //wait for ready signal
    check_ready() {
        
        this.sf_worker.postMessage("isready")

    }

    //start new game
    new_game() {

        console.log("starting new game")
        this.sf_worker.postMessage("ucinewgame")

    }

    //set analyze mode
    set_analyze_mode(analyse: boolean) {

        console.log("setting analyze mode")
        this.sf_worker.postMessage("setoption name UCI_AnalyseMode value " + analyse.toString())

    }

    //start analysis
    start_analysis(position: string, depth: number) {

        console.log("starting analysis")
        this.sf_worker.postMessage("position " + position)

        this.sf_worker.postMessage("go depth " + depth.toString())

    }

}

export default StockfishWrapper