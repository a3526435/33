import React, { useState, useEffect } from 'react';
import { web3, contract } from '../web3';

const SlotMachine = () => {
  const [account, setAccount] = useState('');
  const [houseEdge, setHouseEdge] = useState(0);
  const [winProbability, setWinProbability] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const houseEdge = await contract.methods.houseEdge().call();
      setHouseEdge(houseEdge);

      const winProbability = await contract.methods.winProbability().call();
      setWinProbability(winProbability);
    }
    load();
  }, []);

  const playGame = async () => {
    setMessage('Playing...');
    try {
      await contract.methods.play().send({
        from: account,
        value: web3.utils.toWei('0.1', 'ether') // Example value
      });
      setMessage('Game played! Check the result in the blockchain.');
    } catch (error) {
      setMessage('Error playing the game.');
    }
  };

  return (
    <div>
      <h1>Slot Machine Game</h1>
      <p>Account: {account}</p>
      <p>House Edge: {houseEdge}%</p>
      <p>Win Probability: {winProbability}%</p>
      <button onClick={playGame}>Play</button>
      <p>{message}</p>
    </div>
  );
};

export default SlotMachine;
