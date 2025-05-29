const main = async () => {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account)
}
main()