import { PromptTemplate } from "langchain/prompts";
import OAI_KEY from "./resources/secrets/oai_key"
import { OpenAI } from "langchain/llms/openai";

//wrapper class for llm functionality

class LLMWrapper{

    initialized: boolean = false;

    llm_model: OpenAI;

    temperature: number;

    //default prompt template
    default_prompt_template: PromptTemplate;
    
    constructor(temperature: number) {

        this.temperature = temperature
        this.llm_model = new OpenAI({openAIApiKey: OAI_KEY})

        this.default_prompt_template = PromptTemplate.fromTemplate(
            "You are an expert chess coach coaching a player who is playing {playerColor} and has just made the move {lastMove}, which has resulted in the board position {boardPosition}. Stockfish, the best chess engine, is evaluating the board, and has calculated that the move has resulted in {changeDirection} of {scoreChange} centipawns for {playerColor}, bringing their current stockfish score to {score}. This implies that the player has made a {moveRating} move. Explain the move the player made and the theory behind it, and why it is a {moveRating} move."
        )

    }

}

export default LLMWrapper