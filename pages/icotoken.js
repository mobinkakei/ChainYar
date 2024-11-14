import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
//INTERNAL IMPORT
import { useStateContext } from "../Context/index";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Contact from "../Components/Contact";
import Banner from "../Components/Banner";

const icotoken = () => {
  const router = useRouter();
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const {
    connectWallet,
    address,
    setAddress,
    shortenAddress,
    buyToken,
    withdrawToken,
    setLoader,
    loader,
    reCall,
    ERC20,
    accountBalance,
    SINGLE_TOKEN,
  } = useStateContext();

  const [openContact, setOpenContact] = useState(false);
  const [tokenQuantity, setTokenQuantity] = useState();
  const [tokenDetails, setTokenDetails] = useState();
  const [icoTokenDetails, setIcoTokenDetails] = useState();
  const [amount, setAmount] = useState();
  const [widthdrawQuantity, setWidthdrawQuantity] = useState();
  const [network, setNetwork] = useState();

  useEffect(() => {
    const tokenAddress = router.query.token;
    if (tokenAddress) {
      const loadToken = async () => {
        setLoader(true);

        const token = await ERC20(tokenAddress);
        setTokenDetails(token);

        //SINGLE TOKEN DETAIL
        const single = await SINGLE_TOKEN(tokenAddress);
        setIcoTokenDetails(single[0]);
        console.log(single);

        const networkObject = localStorage.getItem("ACTIVE_NETWORK");

        const network = networkObject ? JSON.parse(networkObject) : null;
        setNetwork(network);
        console.log(network?.nativeCurrency.symbol);
        setLoader(false);
      };

      loadToken();
    }
  }, [router.query, reCall]);

  const BUY_TOKEN = async (avalableQuantity, buyQuantity, tokenAddress) => {
    try {
      console.log(Number(avalableQuantity) >= Number(buyQuantity));
      if (Number(avalableQuantity) >= Number(buyQuantity)) {
        const buy = await buyToken(buyQuantity, tokenAddress);
      } else {
        notifyError(`Only ${avalableQuantity} tokens left`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const WIDTHDRAW_TOKEN = async (
    avalableQuantity,
    widthdrawQuantity,
    tokenAddress
  ) => {
    try {
      if (Number(avalableQuantity) >= Number(widthdrawQuantity)) {
        const buy = await withdrawToken(widthdrawQuantity, tokenAddress);
      } else {
        notifyError(`Only ${avalableQuantity} tokens left`);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      
      <div class="hellow_container">
        <div class="hellow_innerwrap">
          <section class="hellow_section2 hellow_clearfix">
            <div class="hellow_col2 hellow_column1 hellow_first">
              <img
                style={{
                  width: "100%",
                  heigth: "auto",
                }}
                src="9.svg"
                alt=""
              />
            </div>
            <div class="hellow_col2 hellow_column2 hellow_last">
              <div class="hellow_sec2innercont">
                <div class="hellow_sec2addr">
                  <h1>
                    در لحظه توکن  {tokenDetails?.symbol} خریداری کنید و برای آینده سرمایه گذاری کنید
                  </h1>
                  <h3>
                    <span class="hellow_collig">نام توکن :</span>{" "}
                    {tokenDetails?.name} {tokenDetails?.symbol}
                  </h3>
                  <h3>
                    <span class="hellow_collig">آدرس قرارداد هوشمند در بلاکچین :</span>{" "}
                    {shortenAddress(tokenDetails?.address)}
                  </h3>
                  <h3>
                    <span class="hellow_collig">میزان کل عرضه :</span>{" "}
                    {tokenDetails?.supply}
                  </h3>
                  <h3>
                    <span class="hellow_collig">قیمت هر واحد :</span>{" "}
                    {icoTokenDetails?.price} {network?.nativeCurrency.symbol}
                  </h3>
                  <h3>
                    <span class="hellow_collig">موجودی شما :</span>{" "}
                    {tokenDetails?.balance} {tokenDetails?.symbol}
                  </h3>
                  <h3>
                    <span class="hellow_collig">تعداد باقیمانده :</span>{" "}
                    {icoTokenDetails?.preSaleBal} {tokenDetails?.symbol}
                  </h3>
                </div>
              </div>
              <div class="hellow_sec2contactform">
                <div>
                  {Number(icoTokenDetails?.preSaleBal) != 0 && (
                    <>
                      <div class="hellow_clearfix">
                        <textarea
                          placeholder="مقدار خرید به واحد"
                          name="textarea"
                          id=""
                          cols="30"
                          rows="1"
                          onChange={(e) => setAmount(e.target.value)}
                        ></textarea>
                      </div>
                      <div class="hellow_clearfix">
                        <textarea
                          value={
                             `${amount * icoTokenDetails?.price} ${
                                  network?.nativeCurrency.symbol
                                }`
                          }
                          placeholder="هزینه پرداختی شما "
                          name="textarea"
                          id=""
                          cols="30"
                          rows="1"
                        ></textarea>
                      </div>
                      <div class="hellow_clearfix">
                        <button
                          onClick={() =>
                            BUY_TOKEN(
                              icoTokenDetails?.preSaleBal,
                              amount,
                              router.query.token
                            )
                          }
                        >
                          خرید توکن
                        </button>
                      </div>
                      {/* //WIDTHDRAW TOKEN ONLY OWNER */}
                      {icoTokenDetails?.creator.toLowerCase() == address && (
                        <>
                          <div class="hellow_clearfix">
                            <textarea
                              placeholder="در صورت تمایل می تونید از مقدار عرضه برای پیش فروش برداشت کنید"
                              name="textarea"
                              id=""
                              cols="30"
                              rows="1"
                              onChange={(e) =>
                                setWidthdrawQuantity(e.target.value)
                              }
                            ></textarea>
                          </div>
                          <div class="hellow_clearfix">
                            <button
                              onClick={() =>
                                WIDTHDRAW_TOKEN(
                                  icoTokenDetails?.preSaleBal,
                                  widthdrawQuantity,
                                  router.query.token
                                )
                              }
                            >
                              برداشت توکن 
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="content">
        <Banner />
      </div>
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      {loader && <Loader />}
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default icotoken;
