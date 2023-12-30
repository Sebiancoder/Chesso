import { PromptTemplate } from "langchain/prompts";
import OAI_KEY from "./resources/secrets/oai_key"
import { OpenAI } from "langchain/llms/openai";
import { Dispatch, SetStateAction } from "react";

//wrapper class for llm functionality

class LLMWrapper{

    initialized: boolean = false;

    llm_model: OpenAI;

    temperature: number;

    //some constants
    player_colo_abbr_flipped: {[key: string]: string} = {
        "w": "Black",
        "b": "White"
    }

    //methods to set feedback once response from LLM is recieved
    set_prompt: Dispatch<SetStateAction<string>>
    set_feedback: Dispatch<SetStateAction<string>>;

    //default prompt template
    default_prompt_template: PromptTemplate;
    
    constructor(
        set_prompt: Dispatch<SetStateAction<string>>,
        set_feedback: Dispatch<SetStateAction<string>>, 
        temperature: number) {

        this.temperature = temperature
        this.llm_model = new OpenAI({openAIApiKey: OAI_KEY})

        this.set_prompt = set_prompt
        this.set_feedback = set_feedback

        this.default_prompt_template = PromptTemplate.fromTemplate(
            "You are an expert chess coach coaching a player who is playing {playerColor} and has just made the move {lastMove}, which has resulted in the board position {boardPosition}. Stockfish, the best chess engine, is evaluating the board, and has calculated that the move has resulted in {changeDirection} by {scoreChange} centipawns in the score, where positive values favor white and negative values favor black. This brings the current stockfish score to {score}, and  implies that the player has made a {moveRating} move. Explain the move the player made and the theory behind it, and why it is a {moveRating} move. The response should be a few sentences long."
        )

    }

    async generatePrompt(
        playerColor: string,
        lastMove: string,
        boardPosition: string,
        currEval: number,
        prevEval: number,
    ) {

        //calc rating for move (neutral, good, bad)
        var evalChange: number = currEval - prevEval

        var moveRating: string = "neutral"
        
        if (playerColor === "w") {

            if (evalChange > 50) {

                moveRating = "good"

            }

            if (evalChange < -50) {

                moveRating = "bad" 

            }

        } else {

            if (evalChange > 50) {

                moveRating = "bad"

            }

            if (evalChange < -50) {

                moveRating = "good" 

            }

        }

        var formattedPrompt: string = await this.default_prompt_template.format({
            playerColor: this.player_colo_abbr_flipped[playerColor],
            lastMove: lastMove,
            boardPosition: boardPosition,
            changeDirection: currEval - prevEval > 0 ? "an increase" : "a decrease",
            scoreChange: (currEval - prevEval).toString().replace("-", ""),
            score: currEval,
            moveRating: moveRating
        })

        this.set_prompt(formattedPrompt)

    }

    async getLLMResponse(prompt: string) {

        var llm_result = await this.llm_model.predict(prompt)

        this.set_feedback(llm_result)

    }

}

export default LLMWrapper