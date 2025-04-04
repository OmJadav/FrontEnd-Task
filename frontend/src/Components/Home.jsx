import React, { useEffect, useState } from "react";
import { getApi, putApi } from "../utils/ApiHandler";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Icon from "@mdi/react";
import { mdiTextBoxEdit, mdiDelete } from "@mdi/js";
import Modal from "./Modal";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page, selectedUser]);

  const fetchUsers = async (page) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized! No token found!");
        navigate("/login");
        return;
      }
      const response = await getApi(`api/users?page=${page}`);
      setUsers(response.data);
      setTotalPages(response.total_pages);
      setTotalUsers(response.total);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
    });
    setEditOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteSuccess = (deletedUserId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    );
    toast.success("User deleted!");
  };

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        first_name: selectedUser.first_name || "",
        last_name: selectedUser.last_name || "",
        email: selectedUser.email || "",
      });
    }
  }, [selectedUser]);

  const handleUpdate = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error("All fields are required");
      return;
    }
    try {
      await putApi(`api/users/${selectedUser.id}`, formData);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );

      toast.success("User updated successfully");
      setEditOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
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
                  onClick={() => handleEditClick(user)}
                  size={1}
                />
                <Icon
                  className="text-red-600 cursor-pointer hover:text-red-700"
                  path={mdiDelete}
                  onClick={() => handleDeleteClick(user)}
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

      <Modal
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
        onDeleteSuccess={handleDeleteSuccess}
      />

      {/* Edit user modal start */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                    <PencilIcon className="size-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Edit User
                    </DialogTitle>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mt-2"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Last Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded mt-2"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="cursor-pointer inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* Edit user modal ends */}
    </div>
  );
};
