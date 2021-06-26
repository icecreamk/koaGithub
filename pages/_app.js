import App from "next/app";
import { Provider } from "react-redux"
import "antd/dist/antd.css";
import Layout from "../components/Layout";
import store from '../store/store'
import TestHocComp from '../lib/test-hoc'
class MyApp extends App {
  // 重写页面中的getInitialProps
  static async getInitialProps({ Component, ctx }) {
    if (!Component.getInitialProps) {
      return {};
    }
    const pageProps = await Component.getInitialProps(ctx);

    return {
      pageProps,
    };
  }
  render() {
    const { Component, pageProps = {} } = this.props;
    return (
      <div className="root">
        <Layout>
          <Provider store={store()}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </div>
    );
  }
}

export default TestHocComp(MyApp);
