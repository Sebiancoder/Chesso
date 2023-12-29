import React, { useEffect, useState } from "react";
import LLMWrapper from "./llm_wrapper"

const Feedback = (props: any) => {

    const [currFeedback, setCurrFeedback] = useState<string>("Hi! Welcome to Chesso! Make a move to start learning.")

    const [llmWrapper, setLLMWrapper] = useState<LLMWrapper>()
    
    useEffect(() => {

        if (!llmWrapper) {

            setLLMWrapper(new LLMWrapper(0.8))

        }

    })
    
    useEffect(() => {

        

    }, [props.game_state_change_signal])
    
    return (
        <div>
            <p className="feedbackText">{currFeedback}</p>
            <p>{props.game_state_change_signal}</p>
        </div>
    )

}

export default Feedback