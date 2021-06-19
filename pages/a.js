import { withRouter } from "next/router";

const A = ({ router }) => <div>{router.query.id}</div>;

export default withRouter(A);
