import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <main className="Missing">
            <h2>Page not found</h2>
            <Link to="/">Back to Home Page</Link>
        </main>
    );
};

export default ErrorPage;
