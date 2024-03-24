let accounts = {};

const resetAccounts = () => {
  accounts = {};
};

const getBalance = (accountId) => {
  return accounts[accountId] || 0;
};

const deposit = (destination, amount) => {
  if (!accounts[destination]) {
    accounts[destination] = 0;
  }
  accounts[destination] += amount;
  return { id: destination, balance: accounts[destination] };
};

const withdraw = (origin, amount) => {
  if (!accounts[origin] || accounts[origin] < amount) {
    return null;
  }
  accounts[origin] -= amount;
  return { id: origin, balance: accounts[origin] };
};

const transfer = (origin, destination, amount) => {
  const withdrawal = withdraw(origin, amount);
  if (!withdrawal) {
    return null;
  }
  const depositResult = deposit(destination, amount);
  return {
    origin: withdrawal,
    destination: depositResult
  };
};

module.exports = {
  resetAccounts,
  getBalance,
  deposit,
  withdraw,
  transfer
};
