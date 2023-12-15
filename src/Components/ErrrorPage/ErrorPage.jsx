import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center space-y-3">
            <h2 className="mt-10 text-red-700 text-4xl font-bold animate-pulse ">404</h2>
            <p className="text-2xl font-semibold text-white">Not Found</p>
            <Link to='/'><button className="btn btn-success">Home</button></Link>
        </div>
    );
};

export default ErrorPage;