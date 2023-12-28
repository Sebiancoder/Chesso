import React, { useEffect, useState } from "react";

const Feedback = (props: any) => {

    const [currFeedback, setCurrFeedback] = useState("Hi! Welcome to Chesso! Make a move to start learning.")

    useEffect(() => {

        

    }, [props.game_state_change_signal])
    
    return (
        <div>
            <p className="feedbackText">{currFeedback}</p>
        </div>
    )

}

export default Feedback