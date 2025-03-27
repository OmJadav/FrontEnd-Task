import React from "react";
import Icon from "@mdi/react";
import { mdiLinkedin, mdiInstagram, mdiGithub } from "@mdi/js";
export const Footer = () => {
  return (
    <>
      {/* <footer className="flex flex-col space-y-3 justify-center text-xl mt-15 p-5 bg-gray-400 "> */}
      <footer className=" bottom-0 left-0 w-full p-5 bg-gray-400 text-xl flex flex-col space-y-3 items-center lg:absolute">
        <div className="flex justify-center space-x-7">
          <a
            href="https://www.linkedin.com/in/omjadav"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              path={mdiLinkedin}
              className=" hover:text-blue-900"
              size={1}
            />
          </a>
          <a
            href="https://instagram.com/_om.04__"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              path={mdiInstagram}
              className=" hover:text-red-600"
              size={1}
            />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon path={mdiGithub} size={1} />
          </a>
        </div>
        <p className="text-center text-gray-700 font-medium ">
          Copyright ©️{" "}
          <a
            className="text-white cursor-pointer font-bold"
            href="https://omjadav.netlify.app"
            target="_blank"
          >
            {" "}
            OM JADAV{" "}
          </a>{" "}
          {new Date().getFullYear()}. All rights reservered.
        </p>
      </footer>
    </>
  );
};
