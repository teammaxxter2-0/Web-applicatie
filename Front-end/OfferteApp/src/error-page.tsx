import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Simple Error Page
export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError() as { statusText?: string; message?: string };
    console.error(error);

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };

    return (
        <div id="error-page" className="container text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <button className="btn btn-primary" onClick={goBack}>
                Go Back
            </button>
        </div>
    );
}
