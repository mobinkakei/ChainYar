import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const SolidityContract = ({
  setOpenSolidityContract,
  GET_CONTRACT_ABI,
  GET_CONTRACT_SOURCE_CODE,
  setLoader,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await GET_CONTRACT_SOURCE_CODE(transferToken);
        if (token == undefined) {
          setNotFound("Token dose not exist, on the chain");
        } else {
          setTokenDetails(token);
          console.log(token);
          console.log(token.data.result[0]);
        }
        setLoader(false);
      };

      loadToken();
    }
  }, [transferToken]);

  const copyABI = (abi) => {
    navigator.clipboard.writeText(abi);
    notifySuccess("سورس کد در کلیپ بورد کپی شد");
  };
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenSolidityContract(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">سورس کد کانترکت توکن</div>
              <div className="modal-desc">آدرس کانترکت (قرارداد) توکن خودتون یا هر توکن دیگه ای رو وارد کنید تا به سرورس کد آن دسترسی پیدا کنید</div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"ادرس کانترکت توکن را وارد کنید"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <Input
                      value={`نام توکن | کانترکت: ${tokenDetails?.data.result[0].ContractName} `}
                    />
                    <textarea
                      rows="15"
                      className="form-control"
                      cols="15"
                      style={{ width: "100%" }}
                      value={tokenDetails.data.result[0].SourceCode}
                      onClick={() => copyABI(tokenDetails)}
                    ></textarea>
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

export default SolidityContract;
