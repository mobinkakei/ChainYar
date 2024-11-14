import React from "react";
import styles from "../styles/Footer.module.css";
import { SiTwitter, SiGithub, SiInstagram, SiTelegram } from "react-icons/si"

const Footer = ({ setOpenContact, openContact }) => {
  return (
      <footer className={styles.footer}>
        <div className={styles.footerrow}>
          <div className={styles.footercol}>
            <h4>دسترسی سریع</h4>
            <ul className={styles.links}>
              <li><a href="/">خــانه</a></li>
              <li><a onClick={() =>
                openContact ? setOpenContact(false) : setOpenContact(true)
              }>تماس با ما</a></li>
              <li><a href="#">دربـاره مــا</a></li>
              <li><a href="/profile">پـروفـایـل </a></li>
              <li><a href="icotoken">دمـوی ضفحه فروش</a></li>
              <li><a href="/pricing">تـعرفـه هـا</a></li>
            </ul>
          </div>
          <div className={styles.footercol}>
            <h4>مستندات توسعه</h4>
            <ul className={styles.links}>
              <li><a href="#">گزارش طرح</a></li>
              <li><a href="#">فایل ارائه طرح</a></li>
              <li><a href="#">ویدیو معرفی</a></li>
              <li><a href="#">گیت هاب پروژه</a></li>
            </ul>
          </div>
          <div className={styles.footercol}>
            <h4>خبرنامه</h4>
            <p>
              اگر می خواید که از آخرین تغییرات و ویژگی های چین یار اطلاع داشته باشید ایمیل خود را وارد کنید و عضو خبرنامه شوید !
            </p>
            <form action="#">
              <input type="text" placeholder="آدرس ایمیل" required />
              <button>عضویت</button>
            </form>
            <div className={styles.icons}>
              <i><SiGithub className={styles.recatIcon} /></i>
              <i><SiInstagram className={styles.recatIcon} /></i>
              <i><SiTelegram className={styles.recatIcon} /></i>
              <i><SiTwitter className={styles.recatIcon} /></i>
            </div>
          </div>
        </div>
        <div className={styles.copy}>
          <span>تمامی حقوق مادی و معنوی برای چین یار مخفوظ است ©️ | جهت ارائه در جشنواره خوارزمی</span>
        </div>
      </footer>
  );
};

export default Footer;
