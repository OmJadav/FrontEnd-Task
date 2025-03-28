import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-red-500"
      >
        404
      </motion.h1>
      <p className="text-gray-600 text-lg mt-2">Oops! Page Not Found.</p>
      <p className="text-gray-500 text-sm">
        The page you are looking for doesn't exist.
      </p>

      <div className="mt-6 flex space-x-4">
        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-300"
        >
          Go to Home
        </Link>
        <Link
          to="/login"
          className="px-5 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
