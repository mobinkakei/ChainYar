import React, { useEffect, useState, useCallback } from "react";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";

import { FaRegCopy } from "react-icons/fa";

//INTERNAL IMPORT
import UploadICON from "../Components/Ethereum/SVG/UploadICON";
import Input from "../Components/Ethereum/Input";

const QRCodeCreator = ({ setOpenQRCodeCreator, shortenAddress }) => {
  const [success, setSuccess] = useState(false);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const [qrAddress, setQrAddress] = useState();

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("آدرس ولت در کلیپ بورد کپی شد");
  };
  const createQRCode = () => {
    setSuccess(true);
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
              onClick={() => setOpenQRCodeCreator(false)}
            />
            <div
              className="state initial"
              style={{ display: `${success ? "none" : "block"}` }}
            >
              <div className="modal-header">
                <div className="modal-title" id="modal_feedback_title">
                  ایجاد QR Code بلاکچین
                </div>
                <div className="modal-desc" id="modal_feedback_desc">
                  در اینجا شما میتونید آدرس یا کانترکت هر چیزی بر بسنر بلاکچین رو قرار بدید تا QR Code مخصوص آن تولید شده و ذخره کنید.
                </div>
              </div>
              <div className="modal-body">
                <Input
                  placeholder={"Address"}
                  handleChange={(e) => setQrAddress(e.target.value)}
                />
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => createQRCode()}
                  >
                    تولید QR Code
                  </button>
                </div>
              </div>
            </div>
            <div
              className="state success"
              style={{ display: `${success ? "block" : "node"}` }}
            >
              <QRCode value={qrAddress} size={200} />
              <p className="h">
                {shortenAddress(qrAddress)}{" "}
                <FaRegCopy onClick={() => copyAddress(qrAddress)} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeCreator;
