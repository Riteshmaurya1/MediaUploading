import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 
      bg-violet-500/20 backdrop-blur-md border border-violet-300/30 
      px-6 py-2 rounded-full shadow-lg text-white flex space-x-4 z-50">

            {["/", "/upload", "/gallery"].map((path, i) => (
                <Link
                    key={path}
                    to={path}
                    className="px-4 py-1 rounded-full transition-all duration-200 
            hover:bg-violet-700 sm:hover:bg-violet-700 md:hover:bg-violet-700 hover:text-white"
                >
                    {["Home", "Upload", "Gallery"][i]}
                </Link>
            ))}
        </nav>
    );
}
