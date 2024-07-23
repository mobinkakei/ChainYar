import React from "react";

const Footer = ({ setOpenContact, openContact }) => {
  return (
    <footer>
      <div class="container">
        <div class="footer-menu">
          <div class="copyright">
            &copy; تمامی حقوق برای چین بار محفوظ است | جهت ارائه در جشنواره جوان خوارزمی
          </div>
          <ul>
            <li>
              <a href="/pricing">تــعـرفـه هـا</a>
            </li>
            <li>
              <a href="/profile">پـروفـایل | تـاریخچه</a>
            </li>
            <li>
              <a
                onClick={() =>
                  openContact ? setOpenContact(false) : setOpenContact(true)
                }
              >
                تمـاس بـامـا
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
