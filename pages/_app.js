import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";

import { StateContextProvider } from "../Context/index";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>چین یار | دروازه ورود شما به دنیای بلاکچین</title>
        <meta name="description" content="چین یار (ChainYar) یک پلتفرم کاربرپسند است که به شما امکان می‌دهد بدون نیاز به دانش فنی پیچیده، توکن‌های سفارشی بسازید و کمپین‌های ICO را مدیریت کنید. با چین یار، به راحتی و با هزینه کمتر به فناوری‌های بلاکچین دسترسی پیدا کنید." />
        <meta name="keywords" content="چین یار" />
      </Head>

        <StateContextProvider>
          <Component {...pageProps} />
          <Toaster />
        </StateContextProvider>

      <script src="assets/js/plugin.js"></script>
      <script src="assets/js/lightbox.js"></script>
      <script src="assets/js/scripts.js"></script>
    </>
  );
}
