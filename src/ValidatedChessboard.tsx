import React, { useState, useEffect } from "react";
import PromotionMenu from "./PromotionMenu"
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js";

const ValidatedChessboard = (props: any) => {

    const [boardPosition, setBoardPosition] = useState<string>("start")
    
    //promotion related states
    const [promotionMenuOpen, setPromotionMenuOpen] = useState<boolean>(false)
    const [promoteMove, setPromoteMove] = useState<Array<string>>([])
    
    //function to run on drag, to determine if drag is allowable
    const allowDrag = (move_desc: {piece: string, sourceSquare: string}): boolean  => {

        var square_legal_moves: Array<string> = props.game_state.moves({square: move_desc.sourceSquare as Square})

        if (square_legal_moves.length == 0) {

            return false;

        } else {

            return true;

        }

    }
    
    //function to run on drop, to determine if move would be legal, and if so to perform such move
    const onDrop = (move_desc: {sourceSquare: string, targetSquare: string, piece: string}): void => {

        var square_legal_moves: Array<string> = props.game_state.moves({square: move_desc.sourceSquare as Square});

        //associate target squares to the Chess move notation that would bring a piece there
        var legal_move_targets: {[key: string]: any} = {}

        //for each legal move
        square_legal_moves.forEach((slm) => {
            
            //get square piece would move to
            var move_target: string = slm.replace("+", "").replace("#", "").split("=")[0].slice(-2)

            if (slm.includes("=")) {

                //in the case that the move involves a promotion, we want to account for all possible promotions on that square
                //this is the unique case where a sourceSquare and targetSquare does not uniquely identify a move

                if (move_target in legal_move_targets) {

                    legal_move_targets[move_target].push(slm)

                } else {

                    legal_move_targets[move_target] = [slm]

                }

            } else {

                legal_move_targets[move_target] = slm

            }

        })

        //check if target we are attempting to move to has a valid move associated with it, and that it is not a promotion move
        if (move_desc.targetSquare in legal_move_targets && 
            (typeof(legal_move_targets[move_desc.targetSquare]) == "string")) {

            //play the move
            props.game_state.move(legal_move_targets[move_desc.targetSquare])

            //update chess board
            setBoardPosition(props.game_state.fen())

        }

        //castling edge cases
        //short castle
        if ((move_desc.targetSquare == "g1" || move_desc.targetSquare == "g8") && square_legal_moves.includes('O-O')) {

            props.game_state.move("O-O")
            setBoardPosition(props.game_state.fen())

        }

        //long castle
        if ((move_desc.targetSquare == "c1" || move_desc.targetSquare == "c8") && square_legal_moves.includes('O-O-O')) {

            props.game_state.move("O-O-O")
            setBoardPosition(props.game_state.fen())

        }

        //promotion edge case
        if (move_desc.piece[1] == 'P' && ((move_desc.piece[0] === "w" && move_desc.targetSquare[1] === "8") || 
            (move_desc.piece[0] === "b" && move_desc.targetSquare[1] === "1"))) {

                setPromoteMove(legal_move_targets[move_desc.targetSquare])
                setPromotionMenuOpen(true)

        }

    }

    //function to run when a pawn promotion is occuring
    const onPromote = (clickEvent: Event): void => {

        var clickTarget: HTMLElement = clickEvent.currentTarget as HTMLElement
        
        var promoteChoice: string = clickTarget.id.slice(-1)
        
        promoteMove.forEach((pmov) => {

            if (promoteChoice == pmov.replace("+", "").replace("#", "").slice(-1)) {

                props.game_state.move(pmov)
                setBoardPosition(props.game_state.fen())

            }

        })

        setPromotionMenuOpen(false)

    }

    return (
        <div>
            <div id="chessInterface">
                <Chessboard
                    id="mainChessBoard" 
                    position={boardPosition}
                    width={500}
                    allowDrag={allowDrag}
                    draggable={!promotionMenuOpen}
                    onDrop={onDrop}/>
                {promotionMenuOpen ? <PromotionMenu promSetter={onPromote}/> : ""}
            </div>
            
        </div>
    );

}

export default ValidatedChessboard