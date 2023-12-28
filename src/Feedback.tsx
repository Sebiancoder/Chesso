import React, { useState } from "react";

const Feedback = (props: any) => {

    const [currFeedback, setCurrFeedback] = useState("Hi! Welcome to Chesso! Make a move to start learning.")
    
    return (
        <div>
            <p className="feedbackText">{currFeedback}</p>
        </div>
    )

}

export default Feedback