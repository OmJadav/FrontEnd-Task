import React, { useState } from "react";
import { SideImage } from "./SideImage";
import { set, useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { mdiAt, mdiLockOutline } from "@mdi/js";
import { postApi } from "../utils/ApiHandler";
import { useNavigate } from "react-router-dom";
export const Loginpage = () => {
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const onSubmit = async (data) => {
    setloading(true);
    try {
      const response = await postApi(`api/login`, data);
      if (response) {
        localStorage.setItem("token", response.token);
        navigate("/");
      }
      setloading(false);
    } catch (error) {}
  };

  const testUserClick = () => {
    setValue("email", "eve.holt@reqres.in");
    setValue("password", "cityslicka");
  };
  return (
    <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-600 rounded-3xl shadow-2xl w-full overflow-hidden"
        style={{ maxWidth: 1000 }}
      >
        <div className="md:flex w-full">
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
            </div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <InputField
                    id="email"
                    labelName="Email Address"
                    iconName={mdiAt}
                    inputType="email"
                    placeholder="abc@example.com"
                    formHook={{
                      ...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value: /\b\w+@[\w.-]+\.\w{2,4}\b/gi,
                          message: "Email not valid",
                        },
                      }),
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <InputField
                    id="password"
                    labelName="Password"
                    iconName={mdiLockOutline}
                    inputType="password"
                    placeholder="*************"
                    formHook={{
                      ...register("password", {
                        required: "password is required",
                      }),
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex -mx-3">
                <div className="w-full px-3 mb-7">
                  <button
                    disabled={loading}
                    className={`block w-full ${
                      loading
                        ? `bg-indigo-300  focus:bg-indigo-700 text-white cursor-no-drop`
                        : "bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white cursor-pointer"
                    }   mx-auto  rounded-lg px-3 py-3 font-semibold`}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center">
              <h1 className="font-semibold">
                👇 Use below Test User button to fill credentials 👇{" "}
              </h1>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-7 mt-3 ">
                <button
                  onClick={testUserClick}
                  className="block cursor-pointer mx-auto bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-2 font-semibold"
                >
                  TEST USER
                </button>
              </div>
            </div>
          </div>
          <SideImage />
        </div>
      </div>
    </div>
  );
};
