let provider;
let signer;

const contractAddress = "0x0000000000000000000000000000000000000000"; 
const contractABI = [
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256","name":"_amount","type":"uint256"}],
        "name": "borrow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "repay",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

async function connectWallet() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    alert("Wallet connected");
}

async function deposit() {
    const amount = document.getElementById("depositAmount").value;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    await contract.deposit({ value: ethers.utils.parseEther(amount) });
    alert("Deposit successful");
}

async function borrow() {
    const amount = document.getElementById("borrowAmount").value;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    await contract.borrow(ethers.utils.parseEther(amount));
    alert("Borrow successful");
}

async function repay() {
    const amount = document.getElementById("repayAmount").value;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    await contract.repay({ value: ethers.utils.parseEther(amount) });
    alert("Repay successful");
}
