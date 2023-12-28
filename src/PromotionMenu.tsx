import React from "react"
import KnightImg from "./resources/images/knight.png"
import RookImg from "./resources/images/rook.png"
import BishopImg from "./resources/images/bishop.png"
import QueenImg from "./resources/images/queen.png"

const PromotionMenu = (props: any) => {
    
    return (
        <div id="promotionMenu">
            <button id="PromoteB" onClick={props.promSetter} className="promotionSelectionBtn"><img className="promoteMenuImg" src={BishopImg}/></button>
            <button id="PromoteN" onClick={props.promSetter} className="promotionSelectionBtn"><img className="promoteMenuImg" src={KnightImg}/></button>
            <button id="PromoteQ" onClick={props.promSetter} className="promotionSelectionBtn"><img className="promoteMenuImg" src={QueenImg}/></button>
            <button id="PromoteR" onClick={props.promSetter} className="promotionSelectionBtn"><img className="promoteMenuImg" src={RookImg}/></button>
        </div>
    )

}

export default PromotionMenu