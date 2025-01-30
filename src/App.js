import React, { useState } from 'react';
import { connectWallet, mintFifty } from './utils/ethereum';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    await connectWallet();
    setIsConnected(true);
  };

  const handleMint = async () => {
    await mintFifty();
  };

  return (
    <div className="App">
      <h1>Mint LupusToken</h1>
      {!isConnected ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <>
          <p>Wallet Connected</p>
          <button onClick={handleMint}>Mint 50 LupusTokens</button>
        </>
      )}
    </div>
  );
}

export default App;
