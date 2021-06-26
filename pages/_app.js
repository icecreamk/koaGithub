import App from "next/app";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import Layout from "../components/Layout";
import WithReduxApp from "../lib/with-redux";
class MyApp extends App {
  // 重写页面中的getInitialProps
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    if (!Component.getInitialProps) {
      return {};
    }
    const pageProps = await Component.getInitialProps(ctx);

    return {
      pageProps,
    };
  }
  render() {
    const { Component, pageProps = {}, reduxStore } = this.props;
    return (
      <div className="root">
        <Layout>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </div>
    );
  }
}

export default WithReduxApp(MyApp);
