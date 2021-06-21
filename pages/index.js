import Link from "next/link";
import Router from "next/router";
import "./test.css";
import { Button } from "antd";
import { connect } from "react-redux";

const Index = ({ count, username, add, rename }) => {
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
    </div>
  );
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
