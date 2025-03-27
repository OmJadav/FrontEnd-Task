import React, { useEffect, useState } from "react";
import { getApi } from "../utils/ApiHandler";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiTextBoxEdit, mdiDelete } from "@mdi/js";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await getApi(`api/users?page=${page}`);
        setUsers(response.data);
        setTotalUsers(response.total);
        setTotalPages(response.total_pages);
      } else {
        toast.error("unauthorized! No token found ! ");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      //   setError("Failed to fetch users");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between space-x-4 w-90"
            >
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <Icon
                  className="text-green-600 cursor-pointer hover:text-green-700"
                  path={mdiTextBoxEdit}
                  size={1}
                />
                <Icon
                  className="text-red-600 cursor-pointer hover:text-red-700"
                  path={mdiDelete}
                  size={1}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* -----------------------Pagination starts-------------------------------------*/}
      <div className="flex items-center  justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        {/* Mobile Navigation */}
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`relative cursor-pointer ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              page === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>

        {/* Desktop Pagination */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * 6 + 1}</span> to
            <span className="font-medium">
              {" "}
              {Math.min(page * 6, totalPages * 6)}
            </span>{" "}
            of
            <span className="font-medium"> {totalUsers}</span> results
          </p>

          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === i + 1
                    ? "bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
      {/* -----------------------Pagination Ends-------------------------------------*/}
    </div>
  );
};
