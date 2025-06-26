const PLAYER1 = {
  name: "Mario",
  speed: 4,
  maneuverability: 3,
  power: 3,
  score: 0,
};

const PLAYER2 = {
  name: "Luigi",
  speed: 3,
  maneuverability: 4,
  power: 4,
  score: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  const trackBlocks = ["STRAIGHT LINE", "TURN", "CLASH"];
  const random = Math.floor(Math.random() * 3);
  return trackBlocks[random];
}

