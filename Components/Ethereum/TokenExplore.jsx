import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const TokenExplore = ({ setOpenTokenExplore, ERC20, setLoader }) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await ERC20(transferToken);
        if (token == undefined) {
          notifyError("توکن در شبکه موجود نیست !");
          console.log("Token dose not exist, on the chain");
        } else {
          setTokenDetails(token);
          console.log(token);
        }
        setLoader(false);
      };

      loadToken();
    }
  }, [transferToken]);
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenTokenExplore(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">توکن اکسپلور</div>
              <div className="modal-desc">آدرس کانترکت توکن خود را در بخش توکن های من وارد کنید تا تمام اطلاعات مورد نیاز را دریافت کنید</div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"آدرس کانترکت توکن را وارد کنید"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <Input
                      value={`موجودی: ${tokenDetails?.name} ${tokenDetails?.balance} ${tokenDetails?.symbol}`}
                    />
                    <Input value={`نام: ${tokenDetails?.name} `} />
                    <Input value={`نماد: ${tokenDetails?.symbol} `} />
                    <Input value={`ChainID: ${tokenDetails?.chainId} `} />
                    <Input value={`اعشار: ${tokenDetails?.decimals} `} />
                    <Input value={`میزان عرضه: ${tokenDetails?.supply} `} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenExplore;
