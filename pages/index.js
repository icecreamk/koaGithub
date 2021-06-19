import Link from "next/link";
import Router from "next/router";
import "./test.css";
import { Button } from "antd";

export default () => {
  function gotoA() {
    Router.push({
      pathname: "/a",
      query: {
        id: 2,
      },
    }, '/a/2');
  }
  return (
    <div>
      <Button onClick={gotoA}>gotoA</Button>
      <Link href="/a?id=1" as="/a/1">link a</Link>
    </div>
  );
};
