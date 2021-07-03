import { withRouter } from "next/router";
import styled from "styled-components";
// import moment from "moment";
import dynamic from "next/dynamic";

const LazyCom = dynamic(import("../components/Lazy"));

const Title = styled.h1`
  color: #ddd;
`;

const A = ({ router, name, time }) => (
  <div>
    <Title>{time}</Title>
    {router.query.id}
    <LazyCom />
    {name}
    <style jsx>
      {`
        div {
          color: green;
        }
      `}
    </style>
  </div>
);
// 如果是异步，需要等数据加载完，才开始渲染页面
A.getInitialProps = async (ctx) => {
  let moment = await import("moment");
  // let moment = require("moment");
  if ("default" in moment) {
    moment = moment["default"];
  }
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "kkk",
        time: moment(Date.now() - 60 * 1000).fromNow(),
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(A);
