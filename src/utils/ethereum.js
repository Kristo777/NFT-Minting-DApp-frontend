import { BrowserProvider, Contract } from 'ethers';

let provider;
let signer;
let contract;

// Replace this with your actual contract address
const contractAddress = "0x40FbBbc5A66d33346072A0dDd033cc93920De772";  // Example: "0x1234567890abcdef1234567890abcdef12345678"
const contractABI = [
  "function mintFifty() public",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export const connectWallet = async () => {
  if (window.ethereum) {
    provider = new BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();

    // Check if the network supports ENS (e.g., mainnet or testnets)
    if (network.chainId !== 1 && network.chainId !== 5 && network.chainId !== 11155111) {
      console.warn("ENS is not supported on this network. Skipping ENS resolution.");
    }

    signer = await provider.getSigner();
    contract = new Contract(contractAddress, contractABI, signer);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("Please install MetaMask!");
  }
};

export const mintFifty = async () => {
  if (contract) {
    const tx = await contract.mintFifty();
    await tx.wait();
    console.log("Minting successful!");
  } else {
    console.error("Contract not connected!");
  }
};