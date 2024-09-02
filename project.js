
document.addEventListener('DOMContentLoaded', () => {
  const SYMBOLS = ['🍒', '🍋', '🍊', '🍎'];
  let balance = 0;

  const depositInput = document.getElementById('deposit');
  const depositButton = document.getElementById('depositButton');
  const linesInput = document.getElementById('lines');
  const betInput = document.getElementById('bet');
  const spinButton = document.getElementById('spinButton');
  const messageElement = document.getElementById('message');
  const balanceElement = document.getElementById('balance');
  
  const getRandomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  const spinReels = () => {
      const reels = [[], [], []];
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              reels[i].push(getRandomSymbol());
          }
      }
      return reels;
  };

  const displayReels = (reels) => {
      reels.forEach((reel, index) => {
          const reelElement = document.getElementById(`reel${index + 1}`);
          reelElement.innerHTML = reel.map(symbol => `<div>${symbol}</div>`).join('');
      });
  };

  const calculateWinnings = (reels, bet, lines) => {
      let winnings = 0;
      for (let i = 0; i < lines; i++) {
          const symbols = reels.map(reel => reel[i]);
          if (symbols.every(symbol => symbol === symbols[0])) {
              winnings += bet * 10; 
          }
      }
      return winnings;
  };

  const updateBalance = (amount) => {
      balance += amount;
      balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
  };

  const spinAnimation = () => {
      document.querySelectorAll('.reel').forEach(reel => {
          reel.classList.add('spinning');
      });

      setTimeout(() => {
          document.querySelectorAll('.reel').forEach(reel => {
              reel.classList.remove('spinning');
          });
      }, 2000); 
  };

  depositButton.addEventListener('click', () => {
      const depositAmount = parseFloat(depositInput.value);
      if (isNaN(depositAmount) || depositAmount <= 0) {
          messageElement.textContent = 'Invalid deposit amount.';
          return;
      }
      updateBalance(depositAmount);
      depositInput.value = '';
  });

  spinButton.addEventListener('click', () => {
      const lines = parseInt(linesInput.value, 10);
      const bet = parseFloat(betInput.value);

      if (isNaN(lines) || lines < 1 || lines > 3 || isNaN(bet) || bet <= 0 || bet * lines > balance) {
          messageElement.textContent = 'Invalid bet or number of lines.';
          return;
      }

      updateBalance(-bet * lines);

      const reels = spinReels();
      spinAnimation(); 
      setTimeout(() => {
          displayReels(reels);
          const winnings = calculateWinnings(reels, bet, lines);
          updateBalance(winnings);
          messageElement.textContent = `You won $${winnings.toFixed(2)}`;
      }, 2000); 
  });
});
