import React, { useState, useEffect } from "react";
import styles from "../styles/Toolbar.module.css";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineUser, AiOutlineMessage, AiOutlineSetting, AiOutlineInfo } from "react-icons/ai";

const Toolbar = ({ }) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { name: "خانه", icon: <AiOutlineHome />, href: "/" },
    { name: "پروفایل", icon: <AiOutlineUser />, href: "/profile" },
    { 
      name: "تماس باما", 
      icon: <AiOutlineMessage />,
      href: "#"
    },
    { name: "تعرفه ها", icon: <AiOutlineInfo />, href: "/pricing" },
    { name: "دمو", icon: <AiOutlineSetting />, href: "/icotoken" },
  ];

  useEffect(() => {
    const currentPath = router.pathname;
    const activeItemIndex = menuItems.findIndex(item => item.href === currentPath);
    setActiveIndex(activeItemIndex);
  }, [router.pathname]);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();  // Execute the custom action (e.g., toggle the contact modal)
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navBox}>
        <ul className={styles.navContainer}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.navItem} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => handleItemClick(index, item)}
            >
              <a className={styles.navItemLink}>
                <div className={styles.navItemIcon}>
                  {item.icon}
                </div>
                <span className={styles.navItemText}>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
