import { FaSpinner } from "react-icons/fa";
function LoadingSpinner() {
    return (
        <div className="spinner-overlay">
            <FaSpinner className="spinner" />
        </div>
    );
}

export default LoadingSpinner;
