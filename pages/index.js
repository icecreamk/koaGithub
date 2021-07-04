import axios from "axios";
import { useEffect } from "react";
const api = require("../lib/api");

function Index({ userProps, userStared }) {
  useEffect(() => {
    console.log(userProps, userStared);
  }, []);

  return <span>index</span>;
}
Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const initData = reduxStore.getState();
  if (!initData.user || !initData.user.id) {
    return {
      isLogin: false,
    };
  }
  const userProps = await api.request(
    {
      url: `/users/${initData.user.name}/repos`,
    },
    ctx.req,
    ctx.res
  );
  const userStared = await api.request(
    {
      url: `/users/${initData.user.name}/starred`,
    },
    ctx.req,
    ctx.res
  );

  return {
    isLogin: true,
    userProps: userProps.data,
    userStared: userStared.data,
  };
};

export default Index;
