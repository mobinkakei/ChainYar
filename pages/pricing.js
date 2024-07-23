import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { useStateContext } from "../Context/index";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";

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
      <div className="content">
        <div className="index-blocks-2">
          <div className="wide-bg">
            <div className="app-desc max-width">
              <div className="text">
                <h2>تـعرفه سـرویـس هـای چین یار</h2>
                <p>
                  سـرویـس های چین یار شامل سرویس رایگان برای توسعه دهنده ها و همچنین سرویس هایی سات که باید برای استفاده هزینه پرداخت کنید، در ادامه سرویس ها به تفکیک جدا شده و هزینه استفاده از سرویس ها رو مشاهده می کنید. 
                  توجه : هزینه gas fee کیف پول و تراکنش متعلق به چین یار نیست و جداگانه بصورت خودکار بسته به ترافی شبکه محاسبه کی گردد 
                </p>
              </div>
              <img
                src="/assets/i/v3/universe/vcutter-veditor.svg"
                alt="Video Editor"
              />
            </div>
          </div>
          <article className="block-padding max-width">
            <h2>تـعرفه سرویس های ویژه</h2>
            <p>
              با استفاده از سرویس های ویژه چین سار شما می تونید بدون محدودیت و وابستگی به شبکه و بلاکچین خاصی در هزینه و زمان خود صرفه جویی کنید
            </p>
            <ol>
              <li>
                <h3>سـاخت تـوکـن</h3>
                <p>
                با چین یار، دیگه لازم نیست تخصص بالایی در زمینه بلاکچین داشته باشید تا بتونید توکن‌های سفارشی بسازید. به سادگی می‌تونید توکن‌های خودتون رو بر روی بلاکچین‌های معروف مثل اتریوم، بایننس چین، سولانا و پالیگان بسازید.
                </p>
                <span className="Price-tag">0.0025 matic/eth</span>
              </li>
              <li>
                <h3>ساخت ICO | پیش فروش</h3>
                <p>
                با استفاده از چین یار، راه‌اندازی و مدیریت ICO برای توکن‌های جدید خیلی راحت‌تر میشه. شما می‌تونید به سرعت صفحات پیش‌فروش رو راه بندازید و کمپین‌های تبلیغاتی رو مدیریت کنید.
                </p>
                <span className="Price-tag">0.005 matic/eth</span>
              </li>
              <li>
                <h3>اضافه کردن توکت به دیتابیس متاماسک</h3>
                <p>
                  توکن خودتون رو به استاندارد و دیتابیس متاماسک اضافه کنید
                </p>
                <span className="Price-tag">0.0015 matic/eth</span>
              </li>
            </ol>
          </article>
          <div className="line" />
          <div className="line" />
          <div className="block-padding">
          </div>
          <div className="line" />
        </div>
      </div>
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default pricing;
