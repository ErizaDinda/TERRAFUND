
export const CONTRACT_ADDRESS = "0x324420A7f104a673Ff595271761a0113aCf315dE";

// 2. ABI (Resep Kontrak - Ini sudah saya siapkan sesuai kode Solidity tadi, JANGAN UBAH)
export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "donor", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "projectId", "type": "string" }
    ],
    "name": "DonationReceived",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "string", "name": "projectId", "type": "string" }],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];