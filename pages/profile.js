import React, { useEffect, useState } from "react";

//INTERNAL IMPORT

import { useStateContext } from "../Context/index";
import UserICO from "../Components/Ethereum/UserICO";
import Helper from "../Components/Helper"
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
import CreatedToken from "../Components/Ethereum/CreatedToken";
import MetaMassAdded from "../Components/Ethereum/MetaMassAdded";
import CreatedWallet from "../Components/Ethereum/CreatedWallet";
import ICOAddress from "../Components/Ethereum/ICOAddress";
import BitCoinWallet from "../Components/BitCoin/BitcoinWallet";
import QRCodeCreator from "../Components/QRCodeCreator";
const profile = () => {
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
    accountBalance,
    CREATOR_RECEIVER,
    TEST_POLYGON_ADDRESS,
    TEST_SEPOLIA_ADDRESS,
    TEST_BASE_ADDRESS,
    ETHEREUM_ADDRESS,
    POLYGON_ADDRESS,
    BINNANCE_ADDRESS,
    BASE_ADDRESS,
  } = useStateContext();

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
  const [openCreatedICOTable, setOpenCreatedICOTable] = useState(false);
  const [openCreatedToken, setOpenCreatedToken] = useState(false);
  const [openAddedMetaMass, setOpenAddedMetaMass] = useState(false);
  const [openCreatedWallet, setOpenCreatedWallet] = useState(false);
  const [openICOAddress, setOpenICOAddress] = useState(false);
  const [openQRCodeCreator, setOpenQRCodeCreator] = useState(false);

  //BITCOIN
  const [openBitCoinWallet, setOpenBitCoinWallet] = useState(false);

  const [features, setFeatures] = useState();
  const [countNet, setCountNet] = useState(0);
  const [network, setNetwork] = useState("");
  const [networkActive, setNetworkActive] = useState();

  //ICO ARRAY
  const [userICOLists, setUserICOLists] = useState();
  const [allICOLists, setAllICOLists] = useState();
  const [ICOContractAddress, setICOContractAddress] = useState();

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
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
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
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
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
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
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
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "ICO های چین یاز",
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
      name: "تاریخچه ICO",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "اشتراک گذاری ICO",
      image: "universe-pdf-rotate",
      new: true,
    },
    {
      name: "تاریخچه توکن ها",
      image: "universe-acutter-atrim",
      new: false,
    },
    {
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "ساخت ICO ",
      image: "universe-vcutter-screenrecorder",
      new: true,
    },
    {
      name: "ICO های چین یاز",
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
      name: "تاریخچه ICO",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "تاریخچه توکن ها",
      image: "universe-acutter-atrim",
      new: false,
    },
    {
      name: "اشتراک گذاری ICO",
      image: "universe-pdf-rotate",
      new: true,
    },
    {
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "ساخت توکن",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "ساخت ICO ",
      image: "universe-vcutter-screenrecorder",
      new: true,
    },
    {
      name: "ICO های چین یاز",
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
      name: "تاریخچه توکن متاماسک",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "تاریخچه ولت",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "ICO های چین یاز",
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
      console.log(`Network changed to: ${newNetworkId}`);
      setNetwork(newNetworkId);
    };

    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((networkId) => setNetwork(networkId))
        .catch((error) => console.error(error));

      window.ethereum.on("chainChanged", handleNetworkChange);

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
        title={"تاریخچه فعالیت شما در پروفایل شخصی چین یار"}
        par={"تمام فعالیت های خود را روی بلاکیچن های مختلف در کیف پول خود را مشاهده کنید و راحت تر به کار های خور بپردازید و بهتر مدیریت کنید همچنین در اینج صفحه از چین یار به یه سری ابزار مخوف دست پیدا خواهید کرد !!!"}
        source={"17.svg"}
        />

        {openCreatedICOTable && (
          <UserICO
            data={userICOLists}
            shortenAddress={shortenAddress}
            setOpenCreatedICOTable={setOpenCreatedICOTable}
          />
        )}
      <div className="content">
        <div className="groups">
          <div className="group vtools">
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
                      : tool.name == "ولت اختصاصی"
                      ? setOpenEthereunWalletGenerator(true)
                      : tool.name == "افزودن توکن"
                      ? setOpenAddToken(true)
                      : tool.name == "ساخت ICO "
                      ? setOpenICOCreator(true)
                      : tool.name == "ICO های چین یاز"
                      ? setOpenTableModel(true)
                      : tool.name == "افزودن اتصال | شبکه"
                      ? setOpenAddNetwork(true)
                      : tool.name == "تاریخچه ICO"
                      ? setOpenCreatedICOTable(true)
                      : tool.name == "تاریخچه توکن ها"
                      ? setOpenCreatedToken(true)
                      : tool.name == "تاریخچه توکن متاماسک"
                      ? setOpenAddedMetaMass(true)
                      : tool.name == "تاریخچه ولت"
                      ? setOpenCreatedWallet(true)
                      : tool.name == "اشتراک گذاری ICO"
                      ? setOpenICOAddress(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> ویژه </span>
                    </div>
                  )}

                  <div className={`img ${tool.image}`} />
                  <div className="name">{tool.name}</div>
                </a>
              ))}
            </div>
          </div>
          <div id="bitcon" className="group pdftools">
            <div className="title">ابزار های بیتکوین</div>
            <div className="items">
              {BITCOIN?.map((tool, index) => (
                <a
                  className="item new"
                  onClick={() =>
                    tool.name == "ولت اختصاصی"
                      ? setOpenBitCoinWallet(true)
                      : tool.name == "QR code وب 3"
                      ? setOpenQRCodeCreator(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> ویژه </span>
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
      {openCreatedToken && (
        <CreatedToken
          setOpenCreatedToken={setOpenCreatedToken}
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
      {openAddedMetaMass && (
        <MetaMassAdded
          setOpenAddedMetaMass={setOpenAddedMetaMass}
          shortenAddress={shortenAddress}
        />
      )}
      {openCreatedWallet && (
        <CreatedWallet
          setOpenCreatedWallet={setOpenCreatedWallet}
          shortenAddress={shortenAddress}
        />
      )}
      {openICOAddress && (
        <ICOAddress
          setOpenICOAddress={setOpenICOAddress}
          shortenAddress={shortenAddress}
          ICOContractAddress={ICOContractAddress}
        />
      )}
      {/* //BITCOIN */}
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

export default profile;
