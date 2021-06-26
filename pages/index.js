import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import "./test.css";
import { Button } from "antd";
import { connect } from "react-redux";
import { add } from "../store/store";
import getConifg from "next/config"; // next.config.js中当配置

const { publicRuntimeConfig } = getConifg();

const Index = ({ count, username, add, rename }) => {
  useEffect(() => {
    axios.get("/api/user/info").then((resp) => console.log(resp));
  }, []);
  function gotoA() {
    Router.push(
      {
        pathname: "/a",
        query: {
          id: 2,
        },
      },
      "/a/2"
    );
  }
  return (
    <div>
      {count}
      {username}
      <Button onClick={gotoA}>gotoA</Button>
      <Link href="/a?id=1" as="/a/1">
        link a
      </Link>
      <Button
        onClick={() => {
          add(2);
        }}
      >
        addd
      </Button>
      <Button
        onClick={() => {
          rename("123");
        }}
      >
        rename
      </Button>
      <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
    </div>
  );
};

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(5));
  return {};
};

export default connect(
  function mapStateToProps(state) {
    return {
      count: state.counter.count,
      username: state.user.username,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: (num) => dispatch({ type: "ADD", num }),
      rename: (name) => dispatch({ type: "UPDATE_USERNAME", name }),
    };
  }
)(Index);
