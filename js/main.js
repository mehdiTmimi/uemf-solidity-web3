const main = async () => {
    const web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (e) {
        alert("Please install MetaMask or another Ethereum extension.");
        console.error(e);
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEth = parseFloat(web3.utils.fromWei(balanceWei, "ether")).toFixed(4);

    document.getElementById("balance").innerText = `${balanceEth} ETH`;
    document.getElementById("myAddress").innerText = account;

    // Ensure these are declared in your config.js
    console.log(contractAddr, ABI);
    const contract = new web3.eth.Contract(ABI, contractAddr);

    const recipient = await contract.methods.receipient().call();
    const target = await contract.methods.getTargetAmount().call();
    const left = await contract.methods.amountLeft().call(); // changed to amountLeft()

    receipient.innerText = recipient;
    targetAmount.innerText = parseInt(target)/10**18 + " ETH";
    amountLeft.innerText =  parseInt(left)/10**18 + " ETH";

    updateProgressBar(target, left);
};

// Progress Bar Update
function updateProgressBar(targetWei, leftWei) {
    const progressFill = document.getElementById("progressFill");

    const target = parseFloat(Web3.utils.fromWei(targetWei, "ether"));
    const left = parseFloat(Web3.utils.fromWei(leftWei, "ether"));
    const percentage = ((target - left) / target) * 100;

    progressFill.style.width = `${Math.min(percentage, 100)}%`;
}

main();
