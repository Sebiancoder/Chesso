import { PromptTemplate } from "langchain/prompts";
import OAI_KEY from "./resources/secrets/oai_key";
import { OpenAI } from "langchain/llms/openai";
import { Dispatch, SetStateAction } from "react";
import openings from "./resources/openings.json";

//wrapper class for llm functionality

class LLMWrapper{

    initialized: boolean = false;

    llm_model: OpenAI;

    temperature: number;

    opening_book: {[key: string]: any};

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

        this.opening_book = {}

        openings.forEach((opening) => {

            this.opening_book[opening["fen"]] = opening;

        });

        this.default_prompt_template = PromptTemplate.fromTemplate(
            "You are an expert chess coach coaching a player who is playing {playerColor} and has just made the move {lastMove}, which has resulted in the board position {boardPosition}. From the opening book, we know that this is part of the {openingName}. Stockfish, the best chess engine, is evaluating the board, and seems to think that this move is {moveRating}. What can you tell me about this move and opening? The response should be a brief sentence or two, and directly address the player, while not mentioning stockfish."
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

        if (this.opening_book[boardPosition] === undefined) {

            var opening_name: string = "NOT IN BOOK. Since this move is not in the book, tell whether or not you think the move is a good move."

        } else {

            var opening_name: string = this.opening_book[boardPosition].name

        }

        console.log(opening_name)

        var formattedPrompt: string = await this.default_prompt_template.format({
            playerColor: this.player_colo_abbr_flipped[playerColor],
            lastMove: lastMove,
            boardPosition: boardPosition,
            moveRating: moveRating,
            openingName: opening_name
        })

        this.set_prompt(formattedPrompt)

    }

    async getLLMResponse(prompt: string) {

        var llm_result = await this.llm_model.predict(prompt)

        this.set_feedback(llm_result)

    }

}

export default LLMWrapper