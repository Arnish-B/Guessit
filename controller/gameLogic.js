
export function getDenner(room){
    let players=room.getPlayers();
    //choose a random player to start the game
    let random=Math.floor(Math.random()*players.length);
    let player=players[random];

    return player;
}
export function setWord(room,word){
    room.word=word;
}


