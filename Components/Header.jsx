import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//IMPORT
import Button from "./Ethereum/Button";

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
    <header class="header">
      <nav>
        <div class="logo">
          <a href="/">
            چـیـن <span>یــار</span>
          </a>
        </div>
        <input type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="menu-icon">
          &#9776;
        </label>
        <ul class="menu">
          <li>
            <a href="/">خــانه</a>
          </li>
          <li>
            <a href="/profile">پـروفـایل</a>
          </li>
          <li>
            <a href="/pricing">تـعـرفـه هـا</a>
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
          {address ? (
            <li>
              <Button
                name={`${shortenAddress(address)} `}
                handleClick={() => router.push(`/profile`)}
              />
            </li>
          ) : (
            <li>
              <Button handleClick={connectWallet} name="اتصال به کیف پول" />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
