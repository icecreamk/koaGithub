export default (Comp) => {
  function TestHocComp({ Component, pageProps, ...rest }) {
    if (pageProps) {
      pageProps.test = "kkk";
    }
    console.log(pageProps)
    return <Comp Component={Component} pageProps={pageProps} {...rest} />;
  }

  TestHocComp.getInitialProps = Comp.getInitialProps;

  return TestHocComp;
};
