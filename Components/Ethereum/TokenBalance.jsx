import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const TokenBalance = ({ setOpenTokenBalace, ERC20, setLoader }) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await ERC20(transferToken);
        if (token == undefined) {
          setNotFound("توکن در شبکه وجود ندارد");
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
              onClick={() => setOpenTokenBalace(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">بررسی میزان موجودی و عرضه توکن</div>
              <div className="modal-desc">
                 میتونید میزان موجودی و عرضه توکن بررسی کنید تا استراتژی فروش و عرضه خود را بهتر مدیریت کنید
              </div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"آدرس کانترت توکن"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <Input
                      value={`${tokenDetails?.name} ${tokenDetails?.balance} ${tokenDetails?.symbol}`}
                    />
                  </>
                )}
              </div>
              {notFound && <div className="text-center notice">{notFound}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
