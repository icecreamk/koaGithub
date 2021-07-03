function Detail() {
  return <span>detail</span>;
}

Detail.getInitialProps = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, 2000);
  }); 
};

export default Detail;
