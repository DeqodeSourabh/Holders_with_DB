/*
Fetch the Holders of The ERC 721 Tokens and Balnce without any Api

-----------------------APPROCH----------------------

1. connect with Infura
2. connect with web3
3. Use getPastEvents Method -- Every time when transection success Transfer Event is emit,
 By this we find all the Previous logs of that Contract and inside that 
logs we have the recepients transection address.
4. getBalanceOf()-- Inside this method we pass the address
5. Print the Holders    


*/
const express = require('express');
const mongoose = require('mongoose');
const User = require('./DB/User');
const route = express.Router();


const CONTRACT_ACCOUNT = "0xE9e3F9cfc1A64DFca53614a0182CFAD56c10624F";
const INFURA_KEY = "55397e793412497fb349e0ff77f154f2";
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + INFURA_KEY));
const erc721 = require("@0xcert/ethereum-erc721/build/erc721.json").ERC721;
const contract = new web3.eth.Contract(erc721.abi, CONTRACT_ACCOUNT);

const Holders_And_Balance={}
// contract.getPastEvents('Transfer', {fromBlock: '0', toBlock: 'latest'}).then(events => {
//   console.log(events.forEach(event => {
    
//   web3.eth.getBalance(event.returnValues._to).then((val) => {
//       Holders_And_Balance[event.returnValues._to] = val;

//       //console.log(Holders_And_Balance);
//     });
//     arra.push(event.returnValues._to)
//     //console.log(event.returnValues._to)
//     //Holders[event.returnValues._to] = web3.eth.getBalance(event.returnValues._to).then(
// }));
// });
//console.log(arra)
// contract.getPastEvents('Transfer',{fromBlock: '0', toBlock: 'latest'}).then(events => {
//     for(let i=0; i<10;i++ ){
//         console.log(events.returnValues._to);
//     }
// });



const init = async () =>{
   const AllEvents = await contract.getPastEvents('Transfer',{fromBlock: '0', toBlock: 'latest'});

    for (let i=0; i<50; i++){
        const Balance = await web3.eth.getBalance(AllEvents[i].returnValues._to) ;
        let user = {}; 
        user.HolderAddress = AllEvents[i].returnValues._to;
        user.HolderBalance = Balance;
        //console.log(user);
        let userModel = new User(user);
        console.log(userModel);
        await userModel.save();
        console.log('inserted');
        
        
}
}
    
init();