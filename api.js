const express = require('express');
const accountService = require('./accountService');

const router = express.Router();

router.post('/reset', (req, res) => {
  accountService.resetAccounts();
  res.status(200).send('OK');
});

router.get('/balance', (req, res) => {
  const { account_id } = req.query;
  const balance = accountService.getBalance(account_id);
  if (balance > 0) {
    res.send(balance.toString());
  } else {
    res.status(404).send('0');
  }
});

router.post('/event', (req, res) => {
  const { type, destination, origin, amount } = req.body;
  switch (type) {
    case 'deposit':
      const depositResult = accountService.deposit(destination, amount);
      res.status(201).json({ destination: depositResult });
      break;
    case 'withdraw':
      const withdrawalResult = accountService.withdraw(origin, amount);
      if (!withdrawalResult) {
        res.status(404).send('0');
      } else {
        res.status(201).json({ origin: withdrawalResult });
      }
      break;
    case 'transfer':
      const transferResult = accountService.transfer(origin, destination, amount);
      if (!transferResult) {
        res.status(404).send('0');
      } else {
        res.status(201).json(transferResult);
      }
      break;
    default:
      res.status(400).send('Invalid event type');
  }
});

module.exports = router;
