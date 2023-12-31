import React, { useEffect, useState } from "react";
import gearsImg from './resources/images/settings-gears.png'
import LLMWrapper from "./llm_wrapper"
import { startFEN } from "./constants";

const Feedback = (props: any) => {

    const [currFeedback, setCurrFeedback] = useState<string>("Hi! Welcome to Chesso! Make a move to get started.")

    const [prompt, setPrompt] = useState<string>("");

    const [llmWrapper, setLLMWrapper] = useState<LLMWrapper>(new LLMWrapper(setPrompt, setCurrFeedback, 0.8))
    
    //listen for engine to finish calculating, then generate prompt
    useEffect(() => {

        console.log("Engine done calculating")

        //if we are not already generating a response, and the stockfish engine has stopped calculating,
        // and we are not in the start position
        if (!props.engine_calc && props.game_state.fen() !== startFEN) {
            
            // generate and set a new prompt
            llmWrapper.generatePrompt(
                props.game_state.turn(),
                props.game_state.history().slice(-1),
                props.game_state.fen(),
                props.curr_score,
                props.prev_score
                )

        }

        if (props.game_state.fen() === startFEN) {

            setCurrFeedback("Hi! Welcome to Chesso! Make a move to get started.")

        }

    }, [props.engine_calc])

    //when a new prompt is created, generate a response for it
    useEffect(() => {

        if (prompt !== "") {

            console.log("generating llm response")

            llmWrapper.getLLMResponse(prompt)

        }
        
        

    }, [prompt])

    //on any change of the game state, clear the currently displayed feedback
    useEffect(() => {

        if (props.game_state.fen() !== startFEN) {

            setCurrFeedback("Thinking ... ")

        }

    }, [props.game_state_change_signal])
    
    return (
        <div>
            {(props.engine_calc && props.game_state.fen() !== startFEN) ? (
              <div id="analysePos">
                <img width={100} src={gearsImg}/>
                <p className='feedbackTextNoMargin'>Analyzing Position ... </p>
              </div>
            ) : (
                <p className="feedbackText">{currFeedback}</p>
            )} 
        </div>
    )

}

export default Feedback