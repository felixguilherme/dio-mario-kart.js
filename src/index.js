import readline from "node:readline";

const characters = [
  { NAME: "Mario", SPEED: 4, MANEUVERABILITY: 3, POWER: 3, SCORE: 0 },
  { NAME: "Peach", SPEED: 3, MANEUVERABILITY: 4, POWER: 2, SCORE: 0 },
  { NAME: "Yoshi", SPEED: 2, MANEUVERABILITY: 4, POWER: 3, SCORE: 0 },
  { NAME: "Bowser", SPEED: 5, MANEUVERABILITY: 2, POWER: 5, SCORE: 0 },
  { NAME: "Luigi", SPEED: 3, MANEUVERABILITY: 4, POWER: 4, SCORE: 0 },
  { NAME: "Donkey Kong", SPEED: 2, MANEUVERABILITY: 2, POWER: 5, SCORE: 0 },
];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function showCharacterList() {
  console.log(`0 - 🔴 Mario \t 1 - 🍑 Peach \t 2 - 🐢 Yoshi`);
  console.log(`3 - 🦖 Bowser \t 4 - 🟢 Luigi \t 5 - 🐵 Donkey Kong`);
}

async function getRandomBlock() {
  const trackBlocks = ["STRAIGHT LINE", "TURN", "CLASH"];
  const random = Math.floor(Math.random() * 3);
  return trackBlocks[random];
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `🎲 ${characterName} rolled a ${block} dice and got ${diceResult} + ${attribute} (attribute), for a total of ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Round ${round}:\n`);

    let block = await getRandomBlock();
    console.log(`🚗 Block Type: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "STRAIGHT LINE") {
      totalTestSkill1 = diceResult1 + player1.SPEED;
      totalTestSkill2 = diceResult2 + player2.SPEED;

      await logRollResult(player1.NAME, block, diceResult1, player1.SPEED);
      await logRollResult(player2.NAME, block, diceResult2, player2.SPEED);
    }

    if (block === "TURN") {
      totalTestSkill1 = diceResult1 + player1.MANEUVERABILITY;
      totalTestSkill2 = diceResult2 + player2.MANEUVERABILITY;

      await logRollResult(
        player1.NAME,
        block,
        diceResult1,
        player1.MANEUVERABILITY
      );
      await logRollResult(
        player2.NAME,
        block,
        diceResult2,
        player2.MANEUVERABILITY
      );
    }

    if (block === "CLASH") {
      let powerResult1 = diceResult1 + player1.POWER;
      let powerResult2 = diceResult2 + player2.POWER;

      console.log(`💥 ${player1.NAME} vs ${player2.NAME} Clash!`);
      await logRollResult(player1.NAME, block, diceResult1, player1.POWER);
      await logRollResult(player2.NAME, block, diceResult2, player2.POWER);

      if (powerResult1 > powerResult2 && player2.SCORE > 0) {
        console.log(
          `🐢 ${player1.NAME} won the clash! ${player2.NAME} lost a point.`
        );
        player2.SCORE--;
      }

      if (powerResult2 > powerResult1 && player1.SCORE > 0) {
        console.log(
          `🐢 ${player2.NAME} won the clash! ${player1.NAME} lost a point.`
        );
        player1.SCORE--;
      }

      powerResult2 === powerResult1
        ? console.log(`🤝 It's a tie! No score change.`)
        : null;
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`🏆 ${player1.NAME} scored!`);
      player1.SCORE++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`🏆 ${player2.NAME} scored!`);
      player2.SCORE++;
    }

    console.log(`\n-------------------------------\n`);
  }
}

async function declareWinner(player1, player2) {
  console.log(
    `🏆 ${player1.NAME} scored ${player1.SCORE} and ${player2.NAME} scored ${player2.SCORE}.`
  );

  if (player1.SCORE > player2.SCORE) {
    console.log(`🏁 ${player1.NAME} won!`);
  } else if (player2.SCORE > player1.SCORE) {
    console.log(`🏁 ${player2.NAME} won!`);
  } else {
    console.log(`🤝 It's a tie!`);
  }
}

(async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
  }

  console.log("⚔ Welcome to the JavaScript Mario Kart!\n");
  console.log("🎮 Character list:");

  showCharacterList();

  const p1 = parseInt(await ask("\n🕹️ Choose your character: "));
  const p2 = parseInt(await ask("⚔ Choose your opponent: "));

  if (
    isNaN(p1) ||
    p1 < 0 ||
    p1 >= characters.length ||
    isNaN(p2) ||
    p2 < 0 ||
    p2 >= characters.length ||
    p1 === p2
  ) {
    console.log("\n❌ Invalid choice. Please restart the game.");
    rl.close();
    return;
  }

  const player1 = characters[p1];
  const player2 = characters[p2];

  console.log(
    `🏁 🚥 Race between ${player1.NAME} and ${player2.NAME} starting...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);

  rl.close();
})();
