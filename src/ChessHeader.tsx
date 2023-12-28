import React, { useEffect, useState} from "react";
import './ChessHeader.css'
const ChessHeader = (props: any) => {

    const [currTurn, setCurrTurn] = useState<string>("");
    useEffect(() => {
        console.log(currTurn);
        setCurrTurn(props.game_state.turn())
    }, [props])
    // console.log(currTurn);
    // var curr_player: string = "It's white's turn";
    // if (currTurn == 'w') {
    //     curr_player = "It's white's turn";
    // } else if (currTurn == 'b'){
    //     curr_player = "It's black's turn";
    // }
    return (
        <div>
            <p id="chessHeader">{
                //props.game_state.turn()
                currTurn == 'w' ? "White to move" : "Black to move"
                //props.game_state.isGameOver() ? "Game Over!" :  currTurn
            }</p>
        </div>
    )

}

export default ChessHeader;