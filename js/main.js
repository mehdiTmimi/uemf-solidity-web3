const main = async () => {
    const web3 = new Web3(window.ethereum);
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    catch (e) {
        alert("please install metamask alike extensions")
        console.error(e)
        return
    }
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    let solde = await web3.eth.getBalance(account)
    
    balance.innerText=parseInt(solde)/10**18,"ETH"
    myAddress.innerText= account
}
main()