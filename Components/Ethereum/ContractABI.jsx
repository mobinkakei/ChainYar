import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";
import Input from "./Input";

const ContractABI = ({ setOpenontractABI, GET_CONTRACT_ABI, setLoader }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await GET_CONTRACT_ABI(transferToken);
        if (token == undefined) {
          setNotFound("Token dose not exist, on the chain");
        } else {
          setTokenDetails(token.data.result);
          console.log(token);
        }
        setLoader(false);
      };

      loadToken();
    }
  }, [transferToken]);

  const copyABI = (abi) => {
    navigator.clipboard.writeText(abi);
    notifySuccess("ABI قرارد مورد نظر در کلیپ بورد کپی شد.");
  };
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenontractABI(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">دریافت ABI قرارداد های هوشمند</div>
              <div className="modal-desc">آدرس قرارد هوشمند رو وارد کنید تا ABI آن را دریافت کرده و از آن در پروژه های خود استفاده کنید</div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"آدرس قرارداد هوشمند"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <textarea
                      rows="15"
                      className="form-control"
                      cols="15"
                      style={{ width: "100%" }}
                      value={tokenDetails}
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

export default ContractABI;
