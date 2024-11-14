import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { useStateContext } from "../Context/index";
import Helper from "../Components/Helper";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Banner from "../Components/Banner";

const pricing = () => {
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
    ETHER_LATEST_PRICE,
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
  } = useStateContext();

  const [openContact, setOpenContact] = useState(false);
  const [activeTap, setActiveTap] = useState(0);
  console.log(activeTap);
  return (
    <>
      <Header
        connectWallet={connectWallet}
        address={address}
        shortenAddress={shortenAddress}
        accountBalance={accountBalance}
        setOpenContact={setOpenContact}
        openContact={openContact}
      />
      <Helper 
      title={"تـعرفه سـرویـس هـای چین یار"}
      par={"سـرویـس های چین یار شامل سرویس رایگان برای توسعه دهنده ها و همچنین سرویس هایی سات که باید برای استفاده هزینه پرداخت کنید، در ادامه سرویس ها به تفکیک جدا شده و هزینه استفاده از سرویس ها رو مشاهده می کنید.توجه : هزینه gas fee کیف پول و تراکنش متعلق به چین یار نیست و جداگانه بصورت خودکار بسته به ترافی شبکه محاسبه کی گردد "}
      source={"4.svg"}
      />
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      <div className="content">
      <Banner />
      </div>
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default pricing;
