import { Dispatch, SetStateAction } from "react"

// class to interface with stockfish chess engine
class StockfishWrapper{

    sf_worker: Worker
    sf_initialized: Boolean = false

    //handler for messages from web worker
    sf_worker_listener: (this: Worker, ev: MessageEvent<any>) => any

    //methods to update web app state, passed in to constructor
    set_sf_ready: Dispatch<SetStateAction<boolean>>
    set_sf_init: Dispatch<SetStateAction<boolean>>
    set_best_move: Dispatch<SetStateAction<string>>
    set_curr_eval: Dispatch<SetStateAction<number>>

    constructor(
        setSfReady: Dispatch<SetStateAction<boolean>>,
        setSfInit: Dispatch<SetStateAction<boolean>>,
        set_best_move: Dispatch<SetStateAction<string>>,
        set_curr_eval: Dispatch<SetStateAction<number>>
        ) {

        this.sf_worker = new Worker("/stockfish.js");

        //set functions to update web app state
        this.set_sf_ready = setSfReady;
        this.set_sf_init = setSfInit;
        this.set_best_move = set_best_move
        this.set_curr_eval = set_curr_eval

        //define the listener for handling response from stockfish
        this.sf_worker_listener = (event: MessageEvent) => {

            var recievedMessage: string = event.data;

            console.log(recievedMessage)

            //handle all response from stockfish
            if (recievedMessage === "uciok") {

                this.set_sf_init(true)

            } else if(recievedMessage === "readyok") {

                this.set_sf_ready(true)

            } else if(recievedMessage.slice(0, 8) === "bestmove") {

                this.set_best_move(recievedMessage.split(" ")[1])

            } else if(recievedMessage.slice(0, 4) === "info") {

                var info_objs: Array<string> = recievedMessage.split(" ")

                this.set_curr_eval(parseInt(info_objs[9]))

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

    //send ready generation signal
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

    //clear hash
    clear_hash() {

        this.sf_worker.postMessage("setoption name Clear Hash")

    }

    //set position on internal chessboard
    set_position(position: string) {

        console.log("setting position")
        this.sf_worker.postMessage("position fen " + position)

    }

    //start analysis
    start_analysis(depth: number) {

        console.log("starting analysis")
        this.sf_worker.postMessage("go depth " + depth.toString())

    }

}

export default StockfishWrapper