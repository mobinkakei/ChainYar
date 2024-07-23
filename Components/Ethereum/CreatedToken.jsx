import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

///INTERNAL
import Button from "./Button";
import Cart from "./SVG/Cart";

const CreatedToken = ({ shortenAddress, setOpenCreatedToken }) => {
  const router = useRouter();
  const [createdAllToken, setCreatedAllToken] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  useEffect(() => {
    const tokens = localStorage.getItem("TOKEN_HISTORY");

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
              onClick={() => setOpenCreatedToken(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">تاریخچه توکن هایی که ساختید</div>
              <div className="modal-desc">
                شما میتونید در اینجا به تمام اطلاعات و تاریخچه توکن هایی که توسعه داید دسترسی پیدا کنید
              </div>
            </div>
            <div className="body_overFlow">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>بلاکچین</th>
                      <th>لوگو</th>
                      <th>نام</th>
                      <th>نماد</th>
                      <th>عرضه</th>
                      <th>آدرس قرارداد</th>
                      <th>هش تراکنش </th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdAllToken?.map((token, index) => (
                      <tr key={index + 1}>
                        <td>{token?.network || "Ethereum"}</td>
                        <td
                          onClick={() =>
                            navigator.clipboard.writeText(token?.tokenAddress)
                          }
                        >
                          <img
                            src={token?.logo || ""}
                            alt={token?.name}
                            style={{
                              with: "30px",
                              height: "30px",
                              borderRadius: "10px",
                            }}
                          />
                        </td>
                        <td>{token?.name}</td>
                        <td>{token?.symbol}</td>
                        <td>{token?.supply}</td>
                        <td>
                          <a>
                            {shortenAddress(token?.tokenAddress)}{" "}
                            <FaRegCopy
                              onClick={() => copyAddress(token?.tokenAddress)}
                            />
                          </a>
                        </td>
                        <td>
                          <a>
                            {shortenAddress(token?.transactionHash)}{" "}
                            <FaRegCopy
                              onClick={() =>
                                copyAddress(token?.transactionHash)
                              }
                            />
                          </a>
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

export default CreatedToken;
