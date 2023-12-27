import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js"

const ValidatedChessboard = () => {

    const [chessValidator, setChessValidator] = useState<Chess>(new Chess());

    const [boardPosition, setBoardPosition] = useState<string>("start")

    //function to run on drag, to determine if drag is allowable
    const allowDrag = (move_desc: {piece: string, sourceSquare: string}): boolean  => {

        var square_legal_moves: Array<string> = chessValidator.moves({square: move_desc.sourceSquare as Square})

        if (square_legal_moves.length == 0) {

            return false;

        } else {

            return true;

        }

    }
    
    //function to run on drop, to determine if move would be legal, and if so to perform such move
    const onDrop = (move_desc: {sourceSquare: string, targetSquare: string, piece: string}): void => {

        var square_legal_moves: Array<string> = chessValidator.moves({square: move_desc.sourceSquare as Square});

        //associate target squares to the Chess move notation that would bring a piece there
        var legal_move_targets: {[key: string]: string} = {}

        //for each legal move
        square_legal_moves.forEach((slm) => {

            //get square piece would move to
            var move_target: string = slm.replace("+", "").replace("#", "").slice(-2)

            legal_move_targets[move_target] = slm

        })

        console.log(square_legal_moves)
        console.log(legal_move_targets)

        //check if target we are attempting to move to has a valid move associated with it
        if (move_desc.targetSquare in legal_move_targets) {

            //play the move
            chessValidator.move(legal_move_targets[move_desc.targetSquare])

            //update chess board
            setBoardPosition(chessValidator.fen())

        }

        //castling edge cases
        //short castle
        if ((move_desc.targetSquare == "g1" || move_desc.targetSquare == "g8") && square_legal_moves.includes('O-O')) {

            chessValidator.move("O-O")
            setBoardPosition(chessValidator.fen())

        }

        //long castle
        if ((move_desc.targetSquare == "c1" || move_desc.targetSquare == "c8") && square_legal_moves.includes('O-O-O')) {

            chessValidator.move("O-O-O")
            setBoardPosition(chessValidator.fen())

        }

    }

    return (
        <Chessboard 
            position={boardPosition}
            width={300}
            allowDrag={allowDrag}
            onDrop={onDrop}/>
    );

}

export default ValidatedChessboard