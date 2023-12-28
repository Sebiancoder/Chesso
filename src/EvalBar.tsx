import React, { useState, useEffect } from "react"
import { startPosValue } from "./constants";

const EvalBar = (props: any) => {

    const [barHeight, setBarHeight] = useState<number>(50);

    useEffect(() => {

        var currPlayerBarPercent: number = ((props.eval / (startPosValue * 100)) * 100) + 50;
        
        if (currPlayerBarPercent < 5) {

            setBarHeight(5)

        } else if (currPlayerBarPercent > 95) {

            setBarHeight(95)

        } else {

            setBarHeight(props.turn === 'w' ? 100 - currPlayerBarPercent : currPlayerBarPercent)

        }

    }, [props.eval])
    
    return (
        <div id="evalBar">
            <div id="blackEvalFill" style={
                {height: barHeight.toString() + "%"}
                }>
                </div>
        </div>
    )

}

export default EvalBar;