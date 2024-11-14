import React, { useEffect, useState, useCallback } from "react";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

const ICOAddress = ({
  setOpenICOAddress,
  shortenAddress,
  ICOContractAddress,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("در کلیپ بورد کپی شد ");
  };

  return (
    <div className="bootstrap">
      <div className="modal fade modal-language"></div>
      <div
        className="modal fade modal-feedback show"
        tabIndex={-1}
        id="modal-feedback"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-custom modal-custom-xl modal-dialog-centered modal-feedback">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={() => setOpenICOAddress(false)}
            />
            <div className="state initial" style={{ display: `block` }}>
              <div className="modal-header">
                <div className="modal-title" id="modal_feedback_title">
                  آدرس کانترکت ICO
                </div>
                <div className="modal-desc" id="modal_feedback_desc">
                  شما می تونید آدرس آخرین پیش فروش  ICO به اشتراک بذارید
                </div>
              </div>

              <div className="state success" style={{ display: `block` }}>
                <QRCode value={ICOContractAddress} size={200} />
                <p className="h">
                  {shortenAddress(ICOContractAddress)}{" "}
                  <FaRegCopy onClick={() => copyAddress(ICOContractAddress)} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOAddress;
