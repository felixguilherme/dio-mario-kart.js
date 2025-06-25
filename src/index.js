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
