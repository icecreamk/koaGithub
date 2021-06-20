import App from "next/app";
import "antd/dist/antd.css";
import Layout from "../components/Layout";

class MyApp extends App {
  // 重写页面中的getInitialProps
  static async getInitialProps({ Component }) {
    if (!Component.getInitialProps) {
      return {};
    }
    const pageProps = await Component.getInitialProps();

    return {
      pageProps,
    };
  }
  render() {
    const { Component, pageProps = {} } = this.props;
    return (
      <div className="root">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    );
  }
}

export default MyApp;
