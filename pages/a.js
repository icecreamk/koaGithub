import { withRouter } from "next/router";

const A = ({ router, name }) => (
  <div>
    {router.query.id}
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
A.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "kkk" });
    }, 2000);
  });
  return await promise;
};

export default withRouter(A);
