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

    refreshMyBalance(web3,account);
  
    document.getElementById("myAddress").innerText = account;

    // Ensure these are declared in your config.js
    console.log(contractAddr, ABI);
    const contract = new web3.eth.Contract(ABI, contractAddr);

    const recipient = await contract.methods.receipient().call();
    console.log(recipient)
    const target = await contract.methods.getTargetAmount().call();
    console.log(target)
   
    receipient.innerText = recipient;

    updateUI(contract,target);



    amountToDonateInput.addEventListener('input', () => {
        let value = amountToDonateInput.value / 10 ** 18
        spanEth.innerText = value + " ETH"
    })
    donateBtn.addEventListener('click', () => {
        let value = amountToDonateInput.value
        contract.methods.donate().send({
            from: account,
            value
        }).then(() => {
            // update UI
        })
            .catch(e => {
                alert("transaction failed")
                console.error(e)
            })
    })
    redeemBtn.addEventListener('click', () => {
        contract.methods.redeem().send({
            from: account
        }).then(() => {
            alert("success")
        })
            .catch(e => {
                alert("transaction failed")
                console.error(e)
            })
    })
    contract.events.Donated({}).on('data',()=>{
        updateUI(contract,target);
    })
    contract.events.Closed({}).on('data',()=>{
       document.body.innerHTML = "<h1>donations are closed . thank you</h1>"
    })
    contract.methods.receipient().call().then((addressRecipient)=>{
        if(addressRecipient!=account)
            redeemBtn.remove()
    })
};

// Progress Bar Update
function updateProgressBar(targetWei, leftWei) {
    const progressFill = document.getElementById("progressFill");

    const target = parseFloat(Web3.utils.fromWei(targetWei, "ether"));
    const left = parseFloat(Web3.utils.fromWei(leftWei, "ether"));
    const percentage = ((target - left) / target) * 100;

    progressFill.style.width = `${Math.min(percentage, 100)}%`;
}

const refreshMyBalance = async (web3,account) => {
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEth = parseFloat(web3.utils.fromWei(balanceWei, "ether")).toFixed(4);
    document.getElementById("balance").innerText = `${balanceEth} ETH`;
}
const updateUI = async (contract,target)=>{
    const left = await contract.methods.amountLeft().call(); // changed to amountLeft()
    console.log(left)
    targetAmount.innerText = parseInt(target) / 10 ** 18 + " ETH";
    amountLeft.innerText = parseInt(left) / 10 ** 18 + " ETH";

    updateProgressBar(target, left);
}
main();

