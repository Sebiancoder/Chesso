import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js"

const ValidatedChessboard = () => {

    const [chessValidator, setChessValidator] = useState<Chess>(new Chess());

    const allowDrag = (move_desc: {piece: string, sourceSquare: string}): boolean  => {

        var square_legal_moves: Array<string> = chessValidator.moves({square: move_desc.sourceSquare as Square})

        if (square_legal_moves.length == 0) {

            return false;

        } else {

            return true;

        }

    }
    
    return (
        <Chessboard 
            position="start"
            allowDrag={allowDrag}/>
    );

}

export default ValidatedChessboard