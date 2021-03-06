import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";

const Transactions = () => {
  const { currentAccount } = useContext(TransactionContext);

  const TransactionCard = ({
    addressTo,
    addressFrom,
    timestamp,
    message,
    keyword,
    amount,
    url,
  }) => {
    return (
      <div className='bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px]'>
        <div className='flex flex-col items-center w-full mt-3'>
          <div className='w-full mb-6 p-2'>
            <a
              href={`https://ropsten.etherscan.io//address/${addressFrom}`}
              target='_blank'
            >
              <p className='text-white text-base'>
                From:{" "}
                {`${addressFrom.slice(0, 10)} ... ${addressFrom.slice(
                  addressFrom.length - 4
                )}`}
              </p>
            </a>
            <a
              href={`https://ropsten.etherscan.io//address/${addressTo}`}
              target='_blank'
            >
              <p className='text-white text-base'>
                To:{" "}
                {`${addressTo.slice(0, 10)} ... ${addressTo.slice(
                  addressTo.length - 4
                )}`}
              </p>
            </a>
            <p className='text-white text-base'>Amount {amount} ETH</p>
            {message && (
              <>
                <br />
                <p className='text-white text-base'>Message: {message}</p>
              </>
            )}
            <div className='bg-black p-3 px-5 w-max rounded-3xl -mt5- shadow-2xl'>
              <p className='text-[#37c7da] font-bold'>{timestamp}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:p-12 py-12 px-4'>
        {currentAccount ? (
          <h3 className='text-white text-3xl text-center my-2'>
            Latest transactions
          </h3>
        ) : (
          <h3 className='text-white text-3xl text-center my-2'>
            Connect your account to see the latest changes
          </h3>
        )}
        <div className='flex flex-wrap justify-center items-center mt-10'>
          {dummyData.reverse().map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
