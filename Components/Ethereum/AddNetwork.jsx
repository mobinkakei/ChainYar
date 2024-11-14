import React, { useState, useEffect } from "react";

const AddNetwork = ({ setOpenAddNetwork, setCountNet, countNet }) => {
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

  const addNetwork = async (network) => {
    if (window.ethereum) {
      const networkParams = {
        chainId: network.chainId,
        chainName: network.chainName,
        nativeCurrency: {
          name: network.nativeCurrency.name,
          symbol: network.nativeCurrency.symbol,
          decimals: Number(network.nativeCurrency.decimals),
        },
        rpcUrls: network.rpcUrls,
        blockExplorerUrls: network.blockExplorerUrls,
      };
      try {
        const added = await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkParams],
        });
        localStorage.setItem("ACTIVE_NETWORK", JSON.stringify(network));
        let allNetworks = [];
        const poolLists = localStorage.getItem("ALL_NETWORK");
        if (poolLists) {
          allNetworks = JSON.parse(poolLists);
          allNetworks.push(network);
          localStorage.setItem("ALL_NETWORK", JSON.stringify(allNetworks));
        } else {
          allNetworks.push(network);
          localStorage.setItem("ALL_NETWORK", JSON.stringify(allNetworks));
        }

        console.log("Network added successfully");
        setCountNet(countNet + 1);
      } catch (error) {
        console.log("Failed to add network", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenAddNetwork(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">تنظیمات شبکه</div>
              <div className="modal-desc">
                بلاکچین و شبکه مد نظر خود را انتخاب کنید تا بصورت خودکار به کیف پول شما اضافه شود و از آن استفاده کنید، شما می توانید در دو شبکه اصلی و آزمایشی فعالیت کنید.
              </div>
            </div>
            <div className="modal-body">
              {activeNetwork == "MAINNET" ? (
                <div className="login-with">
                  <div className="providers">
                    {MAIN_NETWORKS.map((network, index) => (
                      <div
                        className="provider google"
                        onClick={() => addNetwork(network)}
                      >
                        <img
                          className="icon icon-google"
                          src={network.image}
                          alt=""
                        />
                        <span>اضافه کردن {network.chainName} به کیف پول</span>
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
                        onClick={() => addNetwork(network)}
                      >
                        <img
                          className="icon icon-google"
                          src={network.image}
                          alt=""
                        />
                        <span>اضافه کردن {network.chainName} به کیف پول</span>
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

export default AddNetwork;
