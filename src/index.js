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

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `🎲 ${characterName} rolled a ${block} dice and got ${diceResult} + ${attribute} (attribute), for a total of ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Round ${round}:\n`);

    let block = await getRandomBlock();
    console.log(`🚗 Block Type: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "STRAIGHT LINE") {
      totalTestSkill1 = diceResult1 + character1.SPEED;
      totalTestSkill2 = diceResult2 + character2.SPEED;

      await logRollResult(player1.NAME, block, diceResult1, character1.SPEED);
      await logRollResult(player2.NAME, block, diceResult2, character2.SPEED);
    }

    if (block === "TURN") {
      totalTestSkill1 = diceResult1 + character1.MANEUVERABILITY;
      totalTestSkill2 = diceResult2 + character2.MANEUVERABILITY;

      await logRollResult(
        player1.NAME,
        block,
        diceResult1,
        character1.MANEUVERABILITY
      );
      await logRollResult(
        player1.NAME,
        block,
        diceResult2,
        character2.MANEUVERABILITY
      );
    }

    if (block === "CLASH") {
      let powerResult1 = diceResult1 + character1.POWER;
      let powerResult2 = diceResult2 + character2.POWER;

      console.log(`💥 ${character1.NAME} vs ${character2.NAME} Clash!`);
      await logRollResult(player1.NAME, block, diceResult1, character1.POWER);
      await logRollResult(player2.NAME, block, diceResult2, character2.POWER);

      if (powerResult1 > powerResult2 && character2.SCORE > 0) {
        console.log(
          `🐢 ${character1.NAME} won the clash! ${character2.NAME} lost a point.`
        );
        character2.SCORE--;
      }

      if (powerResult2 > powerResult1 && character1.SCORE > 0) {
        console.log(
          `🐢 ${character2.NAME} won the clash! ${character1.NAME} lost a point.`
        );
        character1.SCORE--;
      }

      powerResult2 === powerResult1
        ? console.log(`🤝 It's a tie! No score change.`)
        : null;
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`🏆 ${character1.NAME} scored!`);
      character1.SCORE++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`🏆 ${character2.NAME} scored!`);
      character2.SCORE++;
    }

    console.log(`\n-------------------------------\n`);
  }
}

