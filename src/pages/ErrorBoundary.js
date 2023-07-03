import Row from "react-bootstrap/Row";

function ErrorBoundary() {
    return (
        <Row className="d-flex justify-content-center w-100 fs-1">
          Uh oh! There's a problem getting the pokemon...
        </Row>
    );
}

export default ErrorBoundary