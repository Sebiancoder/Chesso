import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js";

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
    

    const onDrop = (move_desc: {sourceSquare: string, targetSquare: string, piece: string}): void => {

        var square_legal_moves: Array<string> = chessValidator.moves({square: move_desc.sourceSquare as Square});

        //console.log(square_legal_moves);
        console.log(move_desc.piece);
        //console.log(move_desc.targetSquare);

        var legal_move_targets: {[key: string]: string} = {}

        for (var i = 0; i < square_legal_moves.length; i++) {

            square_legal_moves[i].replace('+', '');
            square_legal_moves[i].replace('#', '');

            if (move_desc.targetSquare == square_legal_moves[i]) {

                var piece_wo_color: string = move_desc.piece.substring(1);

                if (piece_wo_color != 'P') {

                    var target_piece: string = piece_wo_color.concat(move_desc.targetSquare);

                    console.log(target_piece);

                    chessValidator.move(target_piece);

                    return;

                } 

                chessValidator.move(move_desc.targetSquare);

            }

        }

    }

    return (
        <Chessboard 
            position="start"
            allowDrag={allowDrag}
            onDrop={onDrop}/>
    );

}

export default ValidatedChessboard