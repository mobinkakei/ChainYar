import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

///INTERNAL
import Button from "./Button";
import Cart from "./SVG/Cart";

const CreatedWallet = ({ shortenAddress, setOpenCreatedWallet }) => {
  const router = useRouter();
  const [createdAllToken, setCreatedAllToken] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  useEffect(() => {
    const tokens = localStorage.getItem("wallets");

    const tokenLists = tokens ? JSON.parse(tokens) : null;
    setCreatedAllToken(tokenLists);
    console.log(tokenLists);
  }, []);

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("در کلیپ بورد کپی شد");
  };

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenCreatedWallet(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">تاریخچه ولت های ساخته شده</div>
              <div className="modal-desc">
                تاریخچه تمام ولت های اختصاصی رو که ساختید مشاهده می کنید
              </div>
            </div>
            <div className="body_overFlow">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>بلاکچین </th>
                      <th>آدرس </th>
                      <th>کلید خصوصی (رمز)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdAllToken?.map((token, index) => (
                      <tr key={index + 1}>
                        <td>{token?.network}</td>
                        <td>
                          {shortenAddress(token?.address)}{" "}
                          <FaRegCopy
                            onClick={() => copyAddress(token?.address)}
                          />
                        </td>
                        <td>
                          {shortenAddress(token?.privateKey)}{" "}
                          <FaRegCopy
                            onClick={() => copyAddress(token?.privateKey)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedWallet;
