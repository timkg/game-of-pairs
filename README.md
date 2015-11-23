# Game of Pairs
This repo contains a game of pairs, displaying images from EyeEm's public API.
The game is made for two players and uses WebSockets for real-time communication.

## Installation
Please run:

```
npm install
npm run build
npm start
```

And point two different browser windows or tabs to `localhost:3000`.

## Limitations
### Look & Feel
This is far from what I would consider "done", specially the user interface.
I know that a professional look & feel is imperative for modern customer-facing
applications. However, there is a time constraint involved, and I decided
to focus more on the application logic than on the surface layer.

### EyeEm API communication
Currently, the game only serves a statically saved sample of photos,
retrieved during development. Dynamically retrieving photos based on the
location of the players would make for a great future extension.
