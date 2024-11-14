import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/header.module.css";
import Button from "./Ethereum/Button";
import Toolbar from "./Toolbar";

const Header = ({
  connectWallet,
  address,
  shortenAddress,
  accountBalance,
  setOpenContact,
  openContact,
  setAddress,
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [address]);

  const handleAccountsChanged = (accounts) => {
    console.log("Accounts changed:", accounts[0]);
    setAddress(accounts[0]);
  };
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Toolbar  />
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Image src="/logos/ChainYar.png" alt="چین یار" width={150} height={57} />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
          <li className="navigation">
            <a href="/">خــانه</a>
          </li>
          <li className="navigation">
            <a href="/profile">پـروفـایل</a>
          </li>
          <li className="navigation">
            <a href="/pricing">تـعـرفـه هـا</a>
          </li>
          <li className="navigation">
            <a href="/icotoken">دمو عرضه اولیه</a>
          </li>
          <li>
            <a
              onClick={() =>
                openContact ? setOpenContact(false) : setOpenContact(true)
              }
            >
              تـمـاس بـامـا
            </a>
          </li>
          </ul>
        </nav>
        {address ? (
            <li className={styles.connectWallet}>
              <Button
                name={`${shortenAddress(address)} `}
                handleClick={() => router.push(`/profile`)}
              />
            </li>
          ) : (
            <li className={styles.connectWallet}>
              <Button handleClick={connectWallet} name="اتصال به کیف پول" />
            </li>
          )}
      </div>
    </header>
  );
};

export default Header;


