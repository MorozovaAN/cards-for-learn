## Project:
Cards for learn

## Description:
Learn the information you need with question-and-answer cards.  

The basis of the project is a pack of cards. The card contains a question and an answer. In tutorial mode, you see a card with a question, mentally answer it, click "see answer" and rate how correctly you answered it.  

Then your score is taken into account when you show the cards. You will rarely be shown a question that you know the answer. You will be shown a card with the question you need to learn. Showing cards in tutorial mode is endless.  

You can create your own card packs or learn from public packs. You can edit, delete, and make your packs private.

## How to use our project:
- register or use a demo account
- you can learn cards from other people's packs
- create your own packs with cards, filling them with the information you want. For example, you can create a deck with words in different languages and their translation
- learn the cards until you remember them
- manage your packs and cards (make packs private, edit titles/questions/answers, delete packs/cards)
- to start learning the cards, open the menu and click learn

## Authors:
### Frontend:
![github icon](src/assets/img/icons/github.svg) [Morozova Anastasiya](https://github.com/MorozovaAN)  
![github icon](src/assets/img/icons/github.svg)  [Svetlana Mysliatska](https://github.com/lily1215z)  
![github icon](src/assets/img/icons/github.svg)  [Oleg Kozikov](https://github.com/Oldeg)
### QA:
![github icon](src/assets/img/icons/github.svg)  [Kirill Andronov](https://github.com/kirill-0)   
![github icon](src/assets/img/icons/github.svg)  [Daria Razumovskaya](https://github.com/RazDaria) 

## Stack:
- React
- TypeScript
- Redux toolkit
- RTK Query
- SCSS
- CSS Modules
- MUI
- Storybook
- Framer Motion

## What was implemented on the project:
- registration
- login, logout
- profile page, where you can load your user avatar and update your user name
- The packs page and the cards page for each pack with all the information on the packs and cards
- filters:
  + search by packs/cards name
  + sorting into my and other people's packs (by number of cards in packs, alphabetically, by date of creation))
  + page switching
  + choosing the number of packs to display
  + button reset all filters
- CRUD operations with packs and cards
- modal windows for CRUD operations
- two types of card questions - text question or picture question
- choice of pack privacy - available to all or only to the creator
- card rating, depending on user rating
- clever randomness when displaying cards in tutorial mode: the card will be shown more often if it has a low rating
- responsive design for all device sizes