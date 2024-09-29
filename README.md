---

# NeoX Web3 Telegram Bot - Hackathon Project
# NeoHack TG BOT

## Overview

This project was built for the NeoX Web3 Blockchain Hackathon. We’ve created a Telegram bot that opens into a web app, offering three major functionalities designed to enhance user engagement, streamline blockchain transactions, and provide AI-powered assistance for developers. Leveraging Telegram’s widespread Web3 community, this project capitalizes on the platform’s bot functionalities for ease of game development and distribution.

## Tech Stack

- **Frontend & Backend**: MERN Stack (MongoDB, Express.js, React, Node.js)
- **Blockchain**: Solidity for smart contracts on NeoX blockchain
- **AI & Data**: Python for vector database and AI chatbot
- **Bot Platform**: Telegram bot API

## Features

### 1. **Tap to Earn Game**
A fun and engaging game on Telegram designed to boost user interaction. Users can play and earn real money through gameplay, increasing the number of on-chain transactions. The rewards earned during gameplay are transferred directly to the user's wallet via a smart contract.

### 2. **AI-Integrated Chatbot**
This feature has multiple functionalities:
- **Transaction Insights**: By providing a transaction hash (`txnHash`), users can get in-depth, real-time transaction details explained in simple language, tailored for both blockchain developers and laypeople.
- **Wallet Analysis**: Query wallet details by specifying conditions such as sender, receiver, transaction amount (greater than, less than), to retrieve any relevant transaction information.
  
### 3. **NeoX AI (RAG)**
We built a custom AI chatbot trained on data from Neo's whitepaper, NeoX documentation, and other resources. This assists developers in querying NeoX-related information and smoothens the development process on NeoX.


## Usage

1. Launch the Telegram bot using the provided link.
2. Open the web app through the Telegram bot.
3. Start playing the "Tap to Earn" game or query transaction details via the AI chatbot.
4. Use the wallet analysis tool to extract data from specific wallet transactions.

## Smart Contract Details

- **Transfer Function**: We implemented a smart contract that enables users to transfer rewards earned in the game directly to their wallets. The contract is built on NeoX, ensuring secure and fast transactions.
  
- **Cross-Chain Token Swap**: Users can swap tokens between different blockchains, including Ethereum and Arbitrum, using a cross-chain bridge integrated within the smart contract. This expands the user’s flexibility and provides a seamless cross-chain experience.

## Screenshots
![Screenshot 2024-09-29 133529](https://github.com/user-attachments/assets/ee110e98-60ee-4866-86cc-7e1ac1f47103)
![Screenshot 2024-09-29 133612](https://github.com/user-attachments/assets/627a33bb-5673-4980-bdc0-569b2d68aa2b)
![Screenshot 2024-09-29 133641](https://github.com/user-attachments/assets/2da8bb9a-4e91-4395-9bd9-2781c6bcce4a)
![Screenshot 2024-09-29 133909](https://github.com/user-attachments/assets/6a36710f-1ba2-43e6-8231-906d73f2462f)

## Deployed Link
- **https://hackathon-nine-eta.vercel.app/837414318**

## Demo Video Link
- **https://drive.google.com/file/d/1k6ZgjWGha_w8scyFAF7nZA0ZhGdEBfOI/view?usp=sharing**

## Challenges

- **RPC Delays**: Verifying transactions via RPC takes more than 1 minute, which affects the user experience during token transfers and swaps.
  
- **Coingecko API Limitations**: The Coingecko API has a strict rate limit, making it challenging to efficiently build and maintain the wallet database for the token swap functionality.

## Future Enhancements

- **DEX and Bridge Functionality**: We plan to expand the bot to include all decentralized exchange (DEX) and bridge functionalities, enabling one-click operations directly through the Telegram bot for seamless cross-chain asset transfers.
  
- **NeoX AI RAG Chatbot Improvement**: The AI chatbot can be further enhanced by integrating more NeoX documentation and additional data into the vector database, making it even more powerful for developers.
  
- **Cross-Chain Transactions**: Integrating cross-chain transaction functionality within the "Tap to Earn" game to enhance user experience and flexibility when moving assets across different blockchains.

- **Multi-Chain AI Query Builder**: We aim to build a multi-chain AI query builder that allows both developers and non-developers to access blockchain data through natural language processing (NLP) directly on their phones.

## Contributors

- **Rachit Sharma**
- **Abhishek Garg**
- **Divyansh Sharma**
- **Ramzan Khan**

## License

This project does not approve commercial use of the code.

## Contact

For more information, reach out to the team at [abhishek@thewasserstoff.com](mailto:abhishek@thewasserstoff.com).

---
