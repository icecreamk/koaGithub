import Link from "next/link";
import Router from "next/router";
import "./test.css";
import { Button } from "antd";

export default () => {
  function gotoA () {
    Router.push('/a')
  }
  return (
    <div>
      <Button onClick={gotoA}>gotoA</Button>
      <Link href="/a">link a</Link>
    </div>
  );
};
