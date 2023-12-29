import React, { useState, useEffect } from "react"
import { startPosValue } from "./constants";

const EvalBar = (props: any) => {

    const [barHeight, setBarHeight] = useState<number>(50);

    useEffect(() => {

        var currPlayerBarPercent: number = ((props.eval / (startPosValue * 100)) * 100) + 50;
        
        //different cases for eval reading

        if (props.mate) {

            //if checkmate occured
            
            if (props.turn === "b") {

                setBarHeight(0)

            } else {

                setBarHeight(100)

            }

        } else if (props.mate_on_board != -1) {

            //if checkmate on board
            
            if (props.turn === "b") {

                setBarHeight(100)

            } else {

                setBarHeight(0)

            }

        } else if (currPlayerBarPercent < 5) {

            //white has massive advantage
            setBarHeight(95)

        } else if (currPlayerBarPercent > 95) {

            //black has massive advantage
            setBarHeight(5)

        } else {

            // all other cases
            setBarHeight(100 - currPlayerBarPercent)

        }

    }, [props.eval, props.mate, props.mate_on_board])
    
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