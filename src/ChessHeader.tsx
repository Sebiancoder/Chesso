import React from "react";

const ChessHeader = (props: any) => {

    return (
        <div>
            <p id="chessHeader">{
                props.game_state.isGameOver()
            }</p>
        </div>
    )

}

export default ChessHeader;