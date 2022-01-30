import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

//gets the wallet object from the window thanks to metamask
const { ethereum } = window;

const getEthereumContract = async () => {
  //connects to the wallet
  const provider = new ethers.providers.Web3Provider(ethereum);

  const signer = provider.getSigner();

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

//PROVIDER STARTS
export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentdAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //get transactions
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const transactionContract = await getEthereumContract();
      const aviableTransactions =
        await transactionContract.getAllTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  //used to check if the wallet is connected
  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      if (accounts.length) {
        setCurrentdAccount(accounts[0]);
        const transactions = await getAllTransactions();
        console.log("im all the transactions", transactions);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkTransactions = async () => {
    try {
      const transactionContract = await getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    console.log("i go here");
    try {
      if (!ethereum) return alert("please install metamask");

      //this gets all the accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentdAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  //0xDD9d43701c74c0E0fe1D85815404759F90EB5b76
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const { addressTo, amount, keyword, message } = formData;

      const transactionContract = await getEthereumContract();

      //when comunicating with smart contracts every decimal number must be converted to hex
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log(currentAccount);
      //this only sends the eth from one wallet to another, but its still not recorded in the blockchain
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", //this is equal to 21000 Gwei, a eth sub unit
            value: parsedAmount._hex,
          },
        ],
      });
      //the addToBlockchain fun will automaticly return a transaction hash
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(transactionHash, isLoading);
      //this awaits for the transaction to be finished
      await transactionHash.wait();

      setIsLoading(false);
      console.log(transactionHash, isLoading);
      //transactionCount will be hex so with toNumber we can actually see it
      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWallet();
    checkTransactions();
  }, []);

  // useEffect(()=>{
  //  const transactionContract
  // },[])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
