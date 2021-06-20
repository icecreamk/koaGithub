import { withRouter } from "next/router";

const A = ({ router, name }) => <div>{router.query.id}{name}</div>;
A.getInitialProps = () => {
    return {
        name: 'kkk'
    }
}

export default withRouter(A);
