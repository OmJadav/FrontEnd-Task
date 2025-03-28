import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { putApi } from "../utils/ApiHandler";

export default function EditUser({
  open,
  setOpen,
  selectedUser,
  onUpdateSuccess,
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        first_name: selectedUser.first_name || "",
        last_name: selectedUser.last_name || "",
        email: selectedUser.email || "",
      });
    }
  }, [selectedUser]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast.error("All fields are required");
      return;
    }

    try {
      const updatedUser = await putApi(
        `api/users/${selectedUser.id}`,
        formData
      );
      if (updatedUser) {
        onUpdateSuccess(updatedUser); // Ensure this gets the updated user
      } else {
        toast.error("Update failed, no response from server");
      }
      setEditOpen(false);
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
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
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-2"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded mt-2"
                      placeholder="Last Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                onClick={handleClose}
                className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
