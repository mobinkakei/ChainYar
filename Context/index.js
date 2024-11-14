import React, { useState, useContext, createContext, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";
//INTERNAL IMPORT
import {
  ERC20Generator_ABI,
  ERC20Generator_BYTECODE,
  connectWallet,
  shortenAddress,
  ICOMARKETPLACE_CONTARCT,
  TOKEN_CONTARCT,
  ICOMARKETPLACE_ADDRESS,
  ERC20,
  ERC20_CONTRACT,
  PINATA_AIP_KEY,
  PINATA_SECRECT_KEY,
  CHECK_ACCOUNT_BALANCE,
  GET_BALANCE,
  GET_POOL_ADDRESS,
  CREATOR_FEE,
  CREATOR_RECEIVER,
  ADD_TOKEN_FEE,
  ICO_FEE,
  TEST_POLYGON_ADDRESS,
  TEST_SEPOLIA_ADDRESS,
  TEST_BASE_ADDRESS,
  ETHEREUM_ADDRESS,
  POLYGON_ADDRESS,
  BINNANCE_ADDRESS,
  BASE_ADDRESS,
} from "./constants";
import {
  GET_CONTRACT_ABI,
  GET_CONTRACT_SOURCE_CODE,
  GET_CONTRACT_CREATOR,
  ENS_NAME,
  ETHER_LATEST_PRICE,
} from "./api";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  //STATE VERIABLE
  const [address, setAddress] = useState();
  const [accountBalance, setAccountBalance] = useState();

  const [loader, setLoader] = useState(false);
  const [reCall, setReCall] = useState(0);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("لطفا کیف پول وب 3 خود را نصب کنید");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);
        const bal = ethers.utils.formatEther(getBalance);

        setAccountBalance(bal);
        return accounts[0];
      } else {
        console.log("No account");
      }
    } catch (error) {
      console.log("not connected");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, [address]);

  //CONNECT WALLET
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MateMask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const firstAccount = accounts[0];

      setAddress(firstAccount);
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };

  const _deployContract = async (
    signer,
    account,
    name,
    symbol,
    supply,
    imageURL
  ) => {
    try {
      const factory = new ethers.ContractFactory(
        ERC20Generator_ABI,
        ERC20Generator_BYTECODE,
        signer
      );

      const totalSupply = Number(supply);
      const _initialSupply = ethers.utils.parseEther(
        totalSupply.toString(),
        "ether"
      );

      let contract = await factory.deploy(_initialSupply, name, symbol);

      const transaction = await contract.deployed();

      if (contract.address) {
        const today = Date.now();
        let date = new Date(today);
        const _tokenCreatedData = date.toLocaleDateString("en-US");

        //NETWORK
        const networkObject = localStorage.getItem("ACTIVE_NETWORK");

        const network = networkObject ? JSON.parse(networkObject) : null;

        let liveNetwork;

        if (network?.chainName == "Ethereum") {
          liveNetwork = "Ethereum";
        } else if (network?.chainName == "Polygon Mainnet") {
          liveNetwork = "Polygon Mainnet";
        } else if (network?.chainName == "Binance Chain") {
          liveNetwork = "Binance Chain";
        } else if (network?.chainName == "Base Mainnet") {
          liveNetwork = "Base Mainnet";
        } else if (network?.chainName == "Polygon Amoy") {
          liveNetwork = "Polygon Amoy";
        } else if (network?.chainName == "Base Sepolia") {
          liveNetwork = "Base Sepolia";
        } else if (network?.chainName == "Sepolia") {
          liveNetwork = "Sepolia";
        } else {
          liveNetwork = "Ethereum";
        }

        const _token = {
          network: liveNetwork,
          account: account,
          supply: supply.toString(),
          name: name,
          symbol: symbol,
          tokenAddress: contract.address,
          transactionHash: contract.deployTransaction.hash,
          createdAt: _tokenCreatedData,
          logo: imageURL,
        };

        let tokenHistory = [];

        const history = localStorage.getItem("TOKEN_HISTORY");
        if (history) {
          tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
          tokenHistory.push(_token);
          localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
          setLoader(false);
          setReCall(reCall + 1);
        } else {
          tokenHistory.push(_token);
          localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
          setLoader(false);
          setReCall(reCall + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createERC20 = async (token, account, imageURL) => {
    const { name, symbol, supply } = token;

    try {
      setLoader(true);
      notifySuccess("در حاب ساخت توکن در بلاکچین ...");
      if (!name || !symbol || !supply) {
        notifyError("لطفا اطلاعات را به درستی کامل وارد کنید !");
      } else {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        //CALLING CONTRACT
        const contract = await ICOMARKETPLACE_CONTARCT();

        const payAmount = ethers.utils.parseUnits(
          CREATOR_FEE.toString(),
          "ether"
        );

        const transaction = await contract.transferEther(
          CREATOR_RECEIVER,
          payAmount,
          {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000),
          }
        );
        const hash = await transaction.wait();
        if (hash) {
          _deployContract(signer, account, name, symbol, supply, imageURL);
        }
      }
    } catch (error) {
      setLoader(false);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      console.log(error);
    }
  };

  //ALL PRESALE
  const GET_ALL_PRESALE_TOKENS = async () => {
    try {
      const address = await connectWallet();
      const contract = await ICOMARKETPLACE_CONTARCT();

      if (address) {
        setLoader(true);
        const allPreSaleTokens = await contract.getAllTokens();

        const _tokenArray = Promise.all(
          allPreSaleTokens.map(async (token) => {
            const tokenContract = await TOKEN_CONTARCT(token?.token);

            const balance = await tokenContract.balanceOf(
              ICOMARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              preSaleBal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );
        setLoader(false);
        return _tokenArray;
      }
    } catch (error) {
      setLoader(false);
    }
  };

  //ALL PRESALE
  const GET_ALL_USER_PRESALE_TOKENS = async () => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await ICOMARKETPLACE_CONTARCT();

      if (address) {
        const allPreSaleTokens = await contract.getTokensCreatedBy(address);

        const _tokenArray = Promise.all(
          allPreSaleTokens.map(async (token) => {
            const tokenContract = await TOKEN_CONTARCT(token?.token);

            const balance = await tokenContract.balanceOf(
              ICOMARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              preSaleBal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );
        setLoader(false);
        return _tokenArray;
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  //SINGLE_TOKEN
  const SINGLE_TOKEN = async (TOKEN_ADDRESS) => {
    try {
      const address = await connectWallet();
      const contract = await ICOMARKETPLACE_CONTARCT();

      if (address) {
        setLoader(true);
        const allPreSaleTokens = await contract.getAllTokens();

        const _tokenArray = Promise.all(
          allPreSaleTokens.map(async (token) => {
            const tokenContract = await TOKEN_CONTARCT(token?.token);

            const balance = await tokenContract.balanceOf(
              ICOMARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              preSaleBal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );
        const newList = await _tokenArray;

        const _tokenArrayFlat = newList.flat();

        const result = _tokenArrayFlat.filter(
          (item) => item.token.toLowerCase() === TOKEN_ADDRESS.toLowerCase()
        );
        setLoader(false);
        return result;
      }
    } catch (error) {
      setLoader(false);
    }
  };

  //CREATE ICO CREATOR
  const ICO_CREATOR = async (icoCreator) => {
    try {
      const { address, price } = icoCreator;
      if (!address || !price) return console.log("Data missing");
      setLoader(true);
      notifySuccess("در حال ساخت ICO ...");
      const contract = await ICOMARKETPLACE_CONTARCT();

      //CHARGE FEE
      const IcoFee = ethers.utils.parseUnits(ICO_FEE.toString(), "ether");

      const ICO_Transaction = await contract.transferEther(
        CREATOR_RECEIVER,
        IcoFee,
        {
          value: IcoFee.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        }
      );

      const icoCharged = await ICO_Transaction.wait();

      if (icoCharged) {
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        console.log(payAmount);

        const transaction = await contract.createICOSale(address, payAmount, {
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();

        if (transaction.hash) {
          setLoader(false);
          setReCall(reCall + 1);
        }
      }
    } catch (error) {
      setLoader(false);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      console.log(error);
    }
  };

  //BUY TOKEN
  const buyToken = async (buyQuantity, tokenAddress) => {
    try {
      setLoader(true);
      notifySuccess("در حال پردازش ..");
      if (!buyQuantity || !tokenAddress) return notifyError("لطفا اطلاعات را به درستی کامل وارد کنید !");
      const address = await connectWallet();
      const contract = await ICOMARKETPLACE_CONTARCT();

      const _tokenBal = await contract.getBalance(tokenAddress);
      const _tokenDetails = await contract.getTokenDetails(tokenAddress);

      const avalableToken = ethers.utils.formatEther(_tokenBal.toString());

      if (avalableToken > 0) {
        const price =
          ethers.utils.formatEther(_tokenDetails.price.toString()) *
          Number(buyQuantity);

        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const transaction = await contract.buyToken(
          tokenAddress,
          Number(buyQuantity),
          {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000),
          }
        );

        await transaction.wait();
        setLoader(false);
        setReCall(reCall + 1);
      } else {
        setLoader(false);
        notifyError("موجودی توکن شما کافی نیست ...");
      }
    } catch (error) {
      setLoader(false);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      console.log(error);
    }
  };

  //TRANSFER TOKEN
  const transferTokens = async (transferTokenData) => {
    try {
      if (
        !transferTokenData.address ||
        !transferTokenData.amount ||
        !transferTokenData.tokenAdd
      )
        return notifyError("اطلاعات را بدرستی کامل وارد کنید !");
      setLoader(true);
      notifySuccess("در حال انتقال داده ...");
      const address = await connectWallet();
      const contract = await TOKEN_CONTARCT(transferTokenData.tokenAdd);

      const _avalibleBal = await contract.balanceOf(address);
      const avalableToken = ethers.utils.formatEther(_avalibleBal.toString());
      console.log(avalableToken);
      if (avalableToken > 1) {
        // console.log(contract);
        const payAmount = ethers.utils.parseUnits(
          transferTokenData.amount.toString(),
          "ether"
        );
        const transaction = await contract.transfer(
          transferTokenData.address,
          payAmount,
          {
            gasLimit: ethers.utils.hexlify(30000000),
          }
        );

        await transaction.wait();
        setLoader(false);
        setReCall(reCall + 1);
      } else {
        setLoader(false);
        notifyError("موجودی شما کافی نیست !");
      }
    } catch (error) {
      setLoader(false);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      console.log(error);
    }
  };

  //TRANSFER TOKEN
  const withdrawToken = async (widthdrawQuantity, tokenAddress) => {
    try {
      if (!widthdrawQuantity || !tokenAddress)
        return notifyError("لطفا اطلاعات را کامل کنید !");
      setLoader(true);
      notifySuccess("در حال برداشت دارایی ...");
      const address = await connectWallet();
      const contract = await ICOMARKETPLACE_CONTARCT();

      const payAmount = ethers.utils.parseUnits(
        widthdrawQuantity.toString(),
        "ether"
      );

      const transaction = await contract.withdrawToken(
        tokenAddress,
        payAmount,
        {
          gasLimit: ethers.utils.hexlify(8000000),
        }
      );

      await transaction.wait();
      setLoader(false);
      setReCall(reCall + 1);
    } catch (error) {
      setLoader(false);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      console.log(error);
    }
  };

  //ERC20 TOKEN TRANSFER
  const TRANSFER_TOKEN = async (transfer) => {
    try {
      //DATA
      const { _tokenAddress, _sendTo, _amount } = transfer;

      setLoader(true);

      const TOKEN_CONTRACT = await ERC20_CONTRACT(_tokenAddress);
      const transferAmount = ethers.utils.parseUnits(
        _amount.toString(),
        "ether"
      );
      const transaction = await TOKEN_CONTRACT.transfer(
        _sendTo,
        transferAmount,
        {
          gasLimit: ethers.utils.hexlify(1000000),
        }
      );
      await transaction.wait();

      setLoader(false);
      notifySuccess("عملیات موفقیت آمیز بود ...");
      setReCall(reCall + 1);
      window.location.reload();
    } catch (error) {
      setLoader(false);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      console.log(error);
    }
  };

  // /TRANSFER ETHER
  const TRANSFER_ETHER = async (_receiver, _amount) => {
    try {
      //DATA
      console.log(_receiver, _amount);

      setLoader(true);

      const contract = await ICOMARKETPLACE_CONTARCT();

      const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

      const transaction = await contract.transferEther(_receiver, payAmount, {
        value: payAmount.toString(),
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();
      setLoader(false);
      notifySuccess("انتقال با موفقیت انجام شد ...");
      console.log(transaction);
      return transaction;
    } catch (error) {
      console.log(error);
      notifyError("خطایی پیش آمده، لطفا دوباره تلاش کنید !");
      setLoader(false);
    }
  };

  return (
    <StateContext.Provider
      value={{
        GET_ALL_PRESALE_TOKENS,
        GET_ALL_USER_PRESALE_TOKENS,
        createERC20,
        connectWallet,
        shortenAddress,
        ERC20,
        ICO_CREATOR,
        buyToken,
        transferTokens,
        withdrawToken,
        TRANSFER_TOKEN,
        ENS_NAME,
        GET_CONTRACT_ABI,
        GET_CONTRACT_SOURCE_CODE,
        GET_CONTRACT_CREATOR,
        ETHER_LATEST_PRICE,
        CHECK_ACCOUNT_BALANCE,
        TRANSFER_ETHER,
        GET_BALANCE,
        GET_POOL_ADDRESS,
        SINGLE_TOKEN,
        PINATA_AIP_KEY,
        PINATA_SECRECT_KEY,
        TEST_POLYGON_ADDRESS,
        TEST_SEPOLIA_ADDRESS,
        TEST_BASE_ADDRESS,
        ETHEREUM_ADDRESS,
        POLYGON_ADDRESS,
        BINNANCE_ADDRESS,
        BASE_ADDRESS,
        ADD_TOKEN_FEE,
        CREATOR_RECEIVER,
        //VARIABLE
        address,
        setAddress,
        ICOMARKETPLACE_ADDRESS,
        setLoader,
        loader,
        reCall,
        accountBalance,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
