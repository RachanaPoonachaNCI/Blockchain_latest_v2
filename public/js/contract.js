// DO NOT MODIFY AUTO GENERATED CONTENT

// AUTO-GENERATED CONTENT - START
payment_abi = '[{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
payment_address = '0x65CE52604D3DDC7308DB58c17E09A2c2F6b3471E'
appointment_abi = '[{"inputs":[],"name":"getAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_value","type":"string"}],"name":"setString","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
appointment_address = '0x8a4297836f985521f8fe42F9E947673871945F6b'
// AUTO-GENERATED CONTENT - END


// the below script code is convention in web3 in forming the communication with Web

const contracts = {
    payment : {
        ABI : payment_abi,
        Address : payment_address
    },
    appointment : {
        ABI : appointment_abi,
        Address : appointment_address
    }
}

const connectMetamask = async () => {
    let account;
    console.log(window.ethereum);
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account = accounts[0];
        document.getElementById("userArea").innerHTML = `User Account: ${account}`;
    }
    return account
}

const connectContract = async (isPayment=true) => {
    const ABI = isPayment?contracts.payment.ABI:contracts.appointment.ABI;
    const Address = isPayment?contracts.payment.Address:contracts.appointment.Address; // Taking Address from Remix 
    try{
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

const getContractAccount = async (isPayment=true) => {
    const connection = await connectContract(isPayment);
    if(!connection) throw Error("Error connecting to contract");
    const contract_address = await window.contract.methods.getAddress().call();
    return contract_address
}

const getContractBalance = async () => {
    const contract_balanace = await window.contract.methods.getBalance().call();
    return contract_balanace
}

const depositContract = async (account,amount,message) => {
    let transactionHash;
    let transactionReceipt;
    await window.contract.methods.deposit().send({
            from: account,
            value: amount,
        })
        .on('transactionHash', function(hash){
            transactionHash = hash;
            console.log("Transaction Hash:", hash);
        })
        .on('receipt', function(receipt){
            transactionReceipt = receipt;
            console.log("Transaction Receipt:", receipt);

            data = {
                address : account,
                data : {
                    amount : amount,
                    transactionHash : transactionHash,
                    transactionReceipt : transactionReceipt
                }
            }
            data.data.message = message
            fetch("/enroll", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                })
                .then((response)=>{
                    return response.json();
                })
                .then(data => {
                    console.log("Enrolled to the course");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .on('confirmation', function(confirmationNumber, receipt){
        })
        .on('error', console.error);
}

const addDataToContract = async (account,message)=>{
    await window.contract.methods.setString(JSON.stringify(message))
        .send({ from:account , gas: 1000000 })
        .then(function (result) {
            console.log("Transaction Successful:", result);
            var data = {
                address : account,
                data : result
            }
            data.data.message = message
                        
            fetch("/appointment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                })
                .then((response)=>{
                    return response.json();
                })
                .then(data => {
                    console.log("Appointment added");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(function (error) {
                console.error("Transaction Failed:", error);
            });
}


const withdraw = async (address,amount,account) => {
    await window.contract.methods.withdraw(address, amount).send({from: account});
    return true;
}
