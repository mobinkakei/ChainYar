import React, { useEffect, useState } from "react";

import { useStateContext } from "../Context/index";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Banner from "../Components/Banner";
import TokenCreator from "../Components/Ethereum/TokenCreator";
import Network from "../Components/Ethereum/Network";
import TokenBalance from "../Components/Ethereum/TokenBalance";
import TokenExplore from "../Components/Ethereum/TokenExplore";
import TokenTransfer from "../Components/Ethereum/TokenTransfer";
import ENSFinder from "../Components/Ethereum/ENSFinder";
import ContractABI from "../Components/Ethereum/ContractABI";
import SolidityContract from "../Components/Ethereum/SolidityContract";
import ContractOwner from "../Components/Ethereum/ContractOwner";
import Loader from "../Components/Loader";
import EthereumWalletGenerator from "../Components/Ethereum/EthereumWalletGenerator";
import AddToken from "../Components/Ethereum/AddToken";
import ICOCreator from "../Components/Ethereum/ICOCreator";
import ICOMarketplace from "../Components/Ethereum/ICOMarketplace";
import AddNetwork from "../Components/Ethereum/AddNetwork";
import ICOAddress from "../Components/Ethereum/ICOAddress";
import BitCoinWallet from "../Components/BitCoin/BitcoinWallet";
import QRCodeCreator from "../Components/QRCodeCreator";
import Helper from "../Components/Helper";

const index = () => {
  const {
    createERC20,
    connectWallet,
    address,
    setAddress,
    shortenAddress,
    GET_ALL_PRESALE_TOKENS,
    GET_ALL_USER_PRESALE_TOKENS,
    ICO_CREATOR,
    buyToken,
    transferTokens,
    withdrawToken,
    PRESALE_ADDRESS,
    setLoader,
    loader,
    reCall,
    ERC20,
    TRANSFER_TOKEN,
    ENS_NAME,
    GET_CONTRACT_ABI,
    GET_CONTRACT_SOURCE_CODE,
    GET_CONTRACT_CREATOR,
    CHECK_ACCOUNT_BALANCE,
    GET_BALANCE,
    PINATA_AIP_KEY,
    PINATA_SECRECT_KEY,
    TRANSFER_ETHER,
    GET_POOL_ADDRESS,
    ADD_TOKEN_FEE,
    CREATOR_RECEIVER,
    accountBalance,
    TEST_POLYGON_ADDRESS,
    TEST_SEPOLIA_ADDRESS,
    TEST_BASE_ADDRESS,
    ETHEREUM_ADDRESS,
    POLYGON_ADDRESS,
    BINNANCE_ADDRESS,
    BASE_ADDRESS,
  } = useStateContext();

  //COMPONENTS STATE
  const [openNetworkModel, setOpenNetworkModel] = useState(false);
  const [openTokenCreatorModel, setOpenTokenCreatorModel] = useState(false);
  const [openTokenBalace, setOpenTokenBalace] = useState(false);
  const [openTokenExplore, setOpenTokenExplore] = useState(false);
  const [openTokenTransfer, setOpenTokenTransfer] = useState(false);
  const [openENSFinder, setOpenENSFinder] = useState(false);
  const [openontractABI, setOpenontractABI] = useState(false);
  const [openSolidityContract, setOpenSolidityContract] = useState(false);
  const [openContractOwner, setOpenContractOwner] = useState(false);
  const [openEthereunWalletGenerator, setOpenEthereunWalletGenerator] =
    useState(false);
  const [openAddToken, setOpenAddToken] = useState(false);
  const [openICOCreator, setOpenICOCreator] = useState(false);
  const [openICOMarketplace, setOpenICOMarketplace] = useState(false);
  const [openTableModel, setOpenTableModel] = useState(false);
  const [openAddNetwork, setOpenAddNetwork] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openQRCodeCreator, setOpenQRCodeCreator] = useState(false);
  const [openICOAddress, setOpenICOAddress] = useState(false);
  //BITCOIN
  const [openBitCoinWallet, setOpenBitCoinWallet] = useState(false);
  const [networkActive, setNetworkActive] = useState();
  const [features, setFeatures] = useState();
  const [countNet, setCountNet] = useState(0);
  const [ICOContractAddress, setICOContractAddress] = useState();
  const [network, setNetwork] = useState("");
  //ICO ARRAY
  const [userICOLists, setUserICOLists] = useState();
  const [allICOLists, setAllICOLists] = useState();

  // ETHEREUM MAINNET
  const ETHEREUM_MAIN = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "دامنه بلاکچین",
      image: "universe-vcutter-vrotate",
      new: false,
    },
    {
      name: "ABI قرار داد | ابزار توسعه",
      image: "universe-vcutter-vflip",
      new: false,
    },
    {
      name: "ابزار توسعه | سورس کد",
      image: "universe-vcutter-vresolution",
      new: false,
    },
    {
      name: "ابزار توسعه | کانترکت",
      image: "universe-vcutter-vspeed",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  // POLYGON MAINNET
  const POLYGON_MAINNET = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  // BASE MAINNET
  const BASE_MAINNET = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },

    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  // BINANCE MAINNET
  const BINANCE_MAINNET = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },

    {
      name: "ICO های چین یار",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  // POLYGON AMOY TEST
  const POLYGON_AMOY = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "ساخت ICO",
      image: "universe-vcutter-screenrecorder",
      new: true,
    },
    {
      name: "ICO های من",
      image: "universe-pdf-rotate",
      new: true,
    },
    {
      name: "ICO های چین یار",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  // POLYGON AMOY TEST
  const SEPOLIA = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "ساخت ICO",
      image: "universe-vcutter-screenrecorder",
      new: true,
    },
    {
      name: "ICO های من",
      image: "universe-pdf-rotate",
      new: true,
    },
    {
      name: "ICO های چین یار",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  // BESE SEPOLIA TEST
  const BESE_SEPOLIA = [
    {
      name: "تنظیمات شبکه | اتصال",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "افزودن اتصال | شبکه",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ICO های چین یار",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "انتقال توکن | ارز",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "توکن اکسپلور",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "مدیریت موجودی",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "افزودن توکن",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "ولت اختصاصی",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];
  //BITCOIN
  const BITCOIN = [
    {
      name: "ولت اختصاصی",
      image: "universe-pdf-merge",
      new: false,
    },
    {
      name: "QR Code وب 3",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  useEffect(() => {
    const handleNetworkChange = (newNetworkId) => {
      setNetwork(newNetworkId);
    };

    // Check if MetaMask is installed
    if (window.ethereum) {
      // Get initial network
      window.ethereum
        .request({ method: "net_version" })
        .then((networkId) => setNetwork(networkId))
        .catch((error) => console.error(error));

      // Listen for network changes
      window.ethereum.on("chainChanged", handleNetworkChange);

      // Clean up listener on component unmount
      return () => {
        window.ethereum.removeListener("chainChanged", handleNetworkChange);
      };
    } else {
      console.log("MetaMask is not installed.");
    }
  }, []);

  useEffect(() => {
    const networkObject = localStorage.getItem("ACTIVE_NETWORK");

    const network = networkObject ? JSON.parse(networkObject) : null;

    if (network?.chainName == "Ethereum") {
      setFeatures(ETHEREUM_MAIN);
    } else if (network?.chainName == "Polygon Mainnet") {
      setFeatures(POLYGON_MAINNET);
    } else if (network?.chainName == "Binance Chain") {
      setFeatures(BINANCE_MAINNET);
    } else if (network?.chainName == "Base Mainnet") {
      setFeatures(BASE_MAINNET);
    } else if (network?.chainName == "Polygon Amoy") {
      setFeatures(POLYGON_AMOY);
    } else if (network?.chainName == "Base Sepolia") {
      setFeatures(BESE_SEPOLIA);
    } else if (network?.chainName == "Sepolia") {
      setFeatures(SEPOLIA);
    } else {
      setFeatures(ETHEREUM_MAIN);
    }
    setNetworkActive(network);
  }, [countNet]);

  useEffect(() => {
    const networkObject = localStorage.getItem("ACTIVE_NETWORK");
    const network = networkObject ? JSON.parse(networkObject) : null;

    const fetchData = async () => {
      const singleUser = await GET_ALL_USER_PRESALE_TOKENS();
      const allICO = await GET_ALL_PRESALE_TOKENS();

      setUserICOLists(singleUser);
      setAllICOLists(allICO);
    };
    if (network?.id == "polygon_amoy" && TEST_POLYGON_ADDRESS != "ADDRESS") {
      setICOContractAddress(TEST_POLYGON_ADDRESS);
      fetchData();
    } else if (network?.id == "sepolia" && TEST_SEPOLIA_ADDRESS != "ADDRESS") {
      setICOContractAddress(TEST_SEPOLIA_ADDRESS);
      fetchData();
    } else if (
      network?.id == "base_sepolia" &&
      TEST_BASE_ADDRESS != "ADDRESS"
    ) {
      setICOContractAddress(TEST_BASE_ADDRESS);
      fetchData();
    } else if (network?.id == "ethereum" && ETHEREUM_ADDRESS != "ADDRESS") {
      setICOContractAddress(ETHEREUM_ADDRESS);
      fetchData();
    } else if (network?.id == "polygon" && POLYGON_ADDRESS != "ADDRESS") {
      setICOContractAddress(POLYGON_ADDRESS);
      fetchData();
    } else if (network?.id == "bsc" && BINNANCE_ADDRESS != "ADDRESS") {
      setICOContractAddress(BINNANCE_ADDRESS);
      fetchData();
    } else if (network?.id == "base_mainnet" && BASE_ADDRESS != "ADDRESS") {
      setICOContractAddress(BASE_ADDRESS);
      fetchData();
    }
  }, [address, network, reCall]);

  return (
    <>
      <Header
        connectWallet={connectWallet}
        address={address}
        shortenAddress={shortenAddress}
        accountBalance={accountBalance}
        setOpenContact={setOpenContact}
        openContact={openContact}
        setAddress={setAddress}
      />
      
      <Helper 
      title={"چین یار | دروازه ورود شما به دنیای بلاکچین"} 
      par={" آیا به دنبال راهی ساده و سریع برای ورود به دنیای بلاکچین هستید؟ با چین یار، بدون نیاز به دانش فنی پیچیده، توکن‌های سفارشی خود را بسازید و کمپین‌های ICO را به آسانی مدیریت کنید. چین یار با ارائه ابزارهای متنوع و کاربردی، شما را از نیاز به هر برنامه دیگری بی‌نیاز می‌کند. به کمک چین یار می‌توانید با چند کلیک ساده توکن‌های خود را بر روی شبکه‌های مختلف از جمله اتریوم، بایننس چین، سولانا و پالیگان ایجاد کنید. همچنین، ابزارهای بازاریابی و صفحات پیش‌فروش ما به شما کمک می‌کنند تا سرمایه‌گذاران جدید جذب کنید و پروژه‌های خود را به موفقیت برسانید."} 
      source={"18.svg"} 
      />

      <div className="content">
        <div className="d1">
          <h3>
           بلاکچین ارتباطی شما با چین یار :     
          {networkActive ? (
            <>
              <span>  {networkActive?.chainName}  </span>
            </>
          ) : (
           <span>لطفا کیف پول خود را وصل کنید</span>
          )}
          </h3>
        </div>
        <div className="line" />
        <div className="groups">
          <div className="group vtools">
            <div className="title">سرویس ها برای ارائه در بلاکچین : {networkActive?.chainName}</div>
            <div className="items">
              {features?.map((tool, index) => (
                <a
                  className="item new"
                  onClick={() =>
                    tool.name == "تنظیمات شبکه | اتصال"
                      ? setOpenNetworkModel(true)
                      : tool.name == "ساخت توکن"
                      ? setOpenTokenCreatorModel(true)
                      : tool.name == "مدیریت موجودی"
                      ? setOpenTokenBalace(true)
                      : tool.name == "توکن اکسپلور"
                      ? setOpenTokenExplore(true)
                      : tool.name == "انتقال توکن | ارز"
                      ? setOpenTokenTransfer(true)
                      : tool.name == "دامنه بلاکچین"
                      ? setOpenENSFinder(true)
                      : tool.name == "ABI قرار داد | ابزار توسعه"
                      ? setOpenontractABI(true)
                      : tool.name == "ابزار توسعه | سورس کد"
                      ? setOpenSolidityContract(true)
                      : tool.name == "ابزار توسعه | کانترکت"
                      ? setOpenContractOwner(true)
                      : tool.name == "ولت اختصاصی"
                      ? setOpenEthereunWalletGenerator(true)
                      : tool.name == "افزودن توکن"
                      ? setOpenAddToken(true)
                      : tool.name == "ساخت ICO"
                      ? setOpenICOCreator(true)
                      : tool.name == "ICO های چین یار"
                      ? setOpenTableModel(true)
                      : tool.name == "افزودن اتصال | شبکه"
                      ? setOpenAddNetwork(true)
                      : tool.name == "QR Code وب 3"
                      ? setOpenQRCodeCreator(true)
                      : tool.name == "ICO های من"
                      ? setOpenICOAddress(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> وِیـژه </span>
                    </div>
                  )}

                  <div className={`img ${tool.image}`} />
                  <div className="name">{tool.name}</div>
                </a>
              ))}
            </div>
          </div>
          <div id="bitcon" className="group pdftools">
            <div className="title">ابزار هایی برای بلاکچین بیتکوین</div>
            <div className="items">
              {BITCOIN?.map((tool, index) => (
                <a
                  className="item new"
                  onClick={() =>
                    tool.name == "ولت اختصاصی"
                      ? setOpenBitCoinWallet(true)
                      : tool.name == "QR Code وب 3"
                      ? setOpenQRCodeCreator(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> وِیـژه </span>
                    </div>
                  )}

                  <div className={`img ${tool.image}`} />
                  <div className="name">{tool.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {openNetworkModel && (
        <Network
          setOpenNetworkModel={setOpenNetworkModel}
          setCountNet={setCountNet}
          countNet={countNet}
        />
      )}
      {openTokenCreatorModel && (
        <TokenCreator
          setOpenTokenCreatorModel={setOpenTokenCreatorModel}
          setLoader={setLoader}
          PINATA_AIP_KEY={PINATA_AIP_KEY}
          PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
          address={address}
          createERC20={createERC20}
        />
      )}
      {openTokenBalace && (
        <TokenBalance
          setOpenTokenBalace={setOpenTokenBalace}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {openTokenExplore && (
        <TokenExplore
          setOpenTokenExplore={setOpenTokenExplore}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {openTokenTransfer && (
        <TokenTransfer
          setOpenTokenTransfer={setOpenTokenTransfer}
          TRANSFER_TOKEN={TRANSFER_TOKEN}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {openENSFinder && (
        <ENSFinder
          setOpenENSFinder={setOpenENSFinder}
          ENS_NAME={ENS_NAME}
          setLoader={setLoader}
        />
      )}
      {openontractABI && (
        <ContractABI
          setOpenontractABI={setOpenontractABI}
          GET_CONTRACT_ABI={GET_CONTRACT_ABI}
          setLoader={setLoader}
        />
      )}
      {openSolidityContract && (
        <SolidityContract
          setOpenSolidityContract={setOpenSolidityContract}
          GET_CONTRACT_SOURCE_CODE={GET_CONTRACT_SOURCE_CODE}
          setLoader={setLoader}
        />
      )}
      {openContractOwner && (
        <ContractOwner
          setOpenContractOwner={setOpenContractOwner}
          GET_CONTRACT_CREATOR={GET_CONTRACT_CREATOR}
          setLoader={setLoader}
        />
      )}
      {openEthereunWalletGenerator && (
        <EthereumWalletGenerator
          setOpenEthereunWalletGenerator={setOpenEthereunWalletGenerator}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openAddToken && (
        <AddToken
          ERC20={ERC20}
          setOpenAddToken={setOpenAddToken}
          setLoader={setLoader}
          PINATA_AIP_KEY={PINATA_AIP_KEY}
          PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
          address={address}
          TRANSFER_ETHER={TRANSFER_ETHER}
          ADD_TOKEN_FEE={ADD_TOKEN_FEE}
          CREATOR_RECEIVER={CREATOR_RECEIVER}
        />
      )}
      {openICOCreator && (
        <ICOCreator
          ERC20={ERC20}
          setOpenICOCreator={setOpenICOCreator}
          setLoader={setLoader}
          ICO_CREATOR={ICO_CREATOR}
        />
      )}
      {openTableModel && (
        <ICOMarketplace
          data={allICOLists}
          setOpenTableModel={setOpenTableModel}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openAddNetwork && (
        <AddNetwork
          setOpenAddNetwork={setOpenAddNetwork}
          setLoader={setLoader}
          setCountNet={setCountNet}
          countNet={countNet}
        />
      )}
      {openQRCodeCreator && (
        <QRCodeCreator
          setOpenQRCodeCreator={setOpenQRCodeCreator}
          shortenAddress={shortenAddress}
        />
      )}
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      {openICOAddress && (
        <ICOAddress
          setOpenICOAddress={setOpenICOAddress}
          shortenAddress={shortenAddress}
          ICOContractAddress={ICOContractAddress}
        />
      )}
      {openBitCoinWallet && (
        <BitCoinWallet
          setOpenBitCoinWallet={setOpenBitCoinWallet}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
          address={address}
        />
      )}
      {loader && <Loader />}
      <div className="content">
      <Banner />
      </div>
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default index;
