import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";
import Input from "./Input";

const ENSFinder = ({ setOpenENSFinder, ENS_NAME, setLoader }) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [history, setHistory] = useState([]);
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (transferToken) {
      const getAddressName = async () => {
        setLoader(true);
        try {
          const addressName = await ENS_NAME(transferToken);
          setTokenDetails(
            addressName == null ? "دامنه ای برای این آدرس ثبت نشده" : addressName
          );
          console.log(addressName);
          //LOCAL STORAGE
          const currentTime = new Date();
          // Extract individual components of the current time
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const seconds = currentTime.getSeconds();

          const ENS = {
            address: transferToken,
            name: addressName,
            time: `${hours}:${minutes}:${seconds}`,
          };
          let ENSArray = [];
          const poolLists = localStorage.getItem("ENS_NAME");
          if (poolLists) {
            ENSArray = JSON.parse(localStorage.getItem("ENS_NAME"));
            ENSArray.push(ENS);
            localStorage.setItem("ENS_NAME", JSON.stringify(ENSArray));
            setLoader(false);
          } else {
            ENSArray.push(ENS);
            localStorage.setItem("ENS_NAME", JSON.stringify(ENSArray));
            setLoader(false);
          }
        } catch (error) {
          setLoader(false);
          console.log(error);
        }
      };

      getAddressName();
    }
  }, [transferToken]);

  useEffect(() => {
    const pools = JSON.parse(localStorage.getItem("ENS_NAME"));
    console.log(pools);
    setHistory(pools);
  }, [tokenDetails]);
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button onClick={() => setOpenENSFinder(false)} className="close" />
            <div className="modal-header">
              <div className="modal-title">شناسایی شناسه (دامنه) ENS</div>
              <div className="modal-desc">نام و دامنه ولت ها رو شناسایی کنید</div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"آدرس ولت"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <Input value={`${tokenDetails} `} />
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

export default ENSFinder;
