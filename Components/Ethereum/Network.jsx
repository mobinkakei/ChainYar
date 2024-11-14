import React, { useState, useEffect } from "react";

const Network = ({ setOpenNetworkModel, setCountNet, countNet }) => {
  const [activeNetwork, setActiveNetwork] = useState("MAINNET");

  const MAIN_NETWORKS = [
    {
      id: "ethereum",
      chainId: `0x${Number(1).toString(16)}`,
      chainName: "Ethereum",
      image: "/logos/ethereum.png",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io/"],
    },
    {
      id: "polygon",
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      image: "/logos/polygon.png",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    {
      id: "bsc",
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Chain",
      image: "/logos/binance.png",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/bsc"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    {
      id: "base_mainnet",
      chainId: `0x${Number(8453).toString(16)}`,
      chainName: "Base Mainnet",
      image: "/logos/base.png",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org/"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  ];

  const TEST_NETWORKS = [
    {
      id: "polygon_amoy",
      chainId: `0x${Number(80002).toString(16)}`,
      chainName: "Polygon Amoy",
      image: "/logos/polygon.png",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-amoy.polygon.technology/"],
      blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    {
      id: "sepolia",
      chainId: `0x${Number(11155111).toString(16)}`,
      chainName: "Sepolia",
      image: "/logos/ethereum.png",
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "SepoliaETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/eth_sepolia"],
      blockExplorerUrls: ["https://sepolia.etherscan.io/"],
    },
    {
      id: "base_sepolia",
      chainId: `0x${Number(84532).toString(16)}`,
      chainName: "Base Sepolia",
      image: "/logos/base.png",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.base.org"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  ];

  const changeNetwork = async (networkParams) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkParams.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkParams],
          });
        } catch (addError) {
          console.error(addError);
        }
      } else {
        console.error(switchError);
      }
    }
  };

  const handleNetworkChange = (network) => {
    changeNetwork(network);
    localStorage.setItem("ACTIVE_NETWORK", JSON.stringify(network));
    setCountNet(countNet + 1);
  };

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenNetworkModel(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">اتصال به بلاکچین</div>
              <div className="modal-desc">
                شبکه مورد نظر خود را برای اتصال و استفاده از از چین یار انتخاب کنید، توجه داشته باشید که قبل انتخاب شبکه ها در کیف پول شما وجود داشته باشند
              </div>
            </div>
            <div className="modal-body">
              {activeNetwork == "MAINNET" ? (
                <div className="login-with">
                  <div className="providers">
                    {MAIN_NETWORKS.map((network, index) => (
                      <div
                        className="provider google"
                        onClick={() => handleNetworkChange(network)}
                      >
                        <img
                          className="icon icon-google"
                          src={network.image}
                          alt=""
                        />
                        <span>{network.chainName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="login-with">
                  <div className="providers">
                    {TEST_NETWORKS.map((network, index) => (
                      <div
                        className="provider google"
                        onClick={() => handleNetworkChange(network)}
                      >
                        <img
                          className="icon icon-google"
                          src={network.image}
                          alt=""
                        />
                        <span>{network.chainName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group newtowr-btn">
                <button
                  onClick={() => setActiveNetwork("MAINNET")}
                  className="btn btn-primary btn-block "
                >
                  شبکه اصلی
                </button>
                <button
                  onClick={() => setActiveNetwork("TESTNET")}
                  className="btn btn-primary btn-block "
                  style={{ marginTop: "0" }}
                >
                  شبکه آزمایشی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
