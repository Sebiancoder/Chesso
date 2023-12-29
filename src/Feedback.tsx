import React, { useEffect, useState } from "react";
import LLMWrapper from "./llm_wrapper"
import { startFEN } from "./constants";

const Feedback = (props: any) => {

    const [currFeedback, setCurrFeedback] = useState<string>("Hi! Welcome to Chesso! Make a move to start learning.")

    const [prompt, setPrompt] = useState<string>("");

    const [llmWrapper, setLLMWrapper] = useState<LLMWrapper>(
        new LLMWrapper(setPrompt, setCurrFeedback, 0.8)
        )
    
    //listen for engine to finish calculating, then generate prompt
    useEffect(() => {

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

    }, [props.engine_calc])

    //when a new prompt is created, send it off
    useEffect(() => {

        if (prompt !== "") {

            llmWrapper.getLLMResponse(prompt)

        }
        
        

    }, [prompt])
    
    return (
        <div>
            <p className="feedbackText">{currFeedback}</p>
            <p>{llmWrapper?.toString()}</p>
        </div>
    )

}

export default Feedback