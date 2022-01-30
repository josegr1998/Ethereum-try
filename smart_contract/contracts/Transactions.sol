//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
 uint256 transactionCount;

 event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp,string keyword);

 struct TransferStruct {
  address sender;
  address receiver;
  uint amount;
  string message;
  uint256 timestamp;
  string keyword;
 }

//this means the transactions will be an array with the transferStruc interface
 TransferStruct[] transactions;


//the receiver is a payable address that will get the eth
 function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public{
  transactionCount += 1;

  //msg.sender its the address that sends the eth //timestamp of the specific block that its being executed in the blockchain
  transactions.push(TransferStruct(msg.sender,receiver,amount,message, block.timestamp,keyword));

  emit Transfer(msg.sender,receiver,amount,message, block.timestamp,keyword);

 }

 //this function its going to return an array of objects with TransferStruc structure
 function getAllTransactions() public view returns (TransferStruct[] memory){
   return transactions;
 }
 function getTransactionCount() public view returns (uint){

  return transactionCount;

 }

}