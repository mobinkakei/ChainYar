import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";
import Input from "./Input";

const ContractOwner = ({
  setOpenContractOwner,
  GET_CONTRACT_CREATOR,
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
        const token = await GET_CONTRACT_CREATOR(transferToken);
        if (token == undefined) {
          setNotFound("Token dose not exist, on the chain");
        } else {
          setTokenDetails(token);
          console.log(token);
        }
        setLoader(false);
      };

      loadToken();
    }
  }, [transferToken]);

  const copyABI = (data) => {
    navigator.clipboard.writeText(data);
    notifySuccess("با موفقیت در کلیپ بورد کپی شد");
  };
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenContractOwner(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">توسعه دهنده قرارداد ها</div>
              <div className="modal-desc">شما می تونید در صورت نیار آدرس کانترکت مورد نظر را وارد کرده و ولت مالک و تسعه دهنده آن را پیدا کنید و از آن در پروژه خود استفاده کنید</div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"آدرس قرارداد هوشمند"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <span
                      onClick={() =>
                        copyABI(tokenDetails?.data.result[0].contractAddress)
                      }
                    >
                      <Input
                        value={`Address: ${tokenDetails?.data.result[0].contractAddress} `}
                        onClick={() =>
                          copyABI(tokenDetails?.data.result[0].contractAddress)
                        }
                      />
                    </span>
                    <span
                      onClick={() =>
                        copyABI(tokenDetails?.data.result[0].contractCreator)
                      }
                    >
                      <Input
                        value={`Creator: ${tokenDetails?.data.result[0].contractCreator} `}
                      />
                    </span>

                    <span
                      onClick={() =>
                        copyABI(tokenDetails?.data.result[0].txHash)
                      }
                    >
                      <Input
                        value={`Hash: ${tokenDetails?.data.result[0].txHash} `}
                        onClick={() =>
                          copyABI(tokenDetails?.data.result[0].txHash)
                        }
                      />
                    </span>
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

export default ContractOwner;
