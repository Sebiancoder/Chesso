# Chesso ♛

An LLM-driven web app for teaching Chess.

LLMs, as language models, are not great at playing chess. They have no ability to think logically or truly understand the rules of Chess. However, can they teach it? This project aims to develop a tool that combines an LLM with the stockfish chess engine and other chess resources like opening books to see if it can effectively teach someone chess. The goal is to have the LLM use its language skills to convert information about the quality of a position or move, which it acquires from a chess engine, into a conversational narrative that a chess beginner can easily understand.

![alt text](https://github.com/sebiancoder/Chesso/blob/main/chesso.png?raw=true)

This project is currently deployed [here](https://www.sebiancoder.github.io/Chesso). Fair warning, the css may not look great on mobile, as that is a work-in-progress.

## How does this work?

Chesso works as a sort-of Chess RAG (Retrieval Augmented Generation) System. When the user makes a move and creates a new position, a lookup is performed in a Chess openings book. Specifically, Chesso uses the Encyclopedia of Chess Openings (ECO) data, found [here](https://github.com/hayatbiralem/eco.json). From the database, Chesso recieves the name of the opening and variation, if it exists. That data is then combined with the position FEN itself, as well as the current stockfish evaluation for that position, and fed into the GPT3.5 Turbo model, which is asked to write a short description reviewing the position, given the data from the openings database and the stockfish evaluation.

![alt text](https://github.com/sebiancoder/Chesso/blob/main/chesso_system.png?raw=true)
