import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";

const UserDetails = ({ item, closeModal }) => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-90">
    <div className="p-8 rounded shadow">
      <button
        className="animate-bounce flex md:ml-[630px] justify-end"
        onClick={closeModal}
      >
        <AiOutlineCloseCircle color="rgb(156 163 175)" size={"2rem"} />
      </button>
      <div className="bg-cyan-950 sm:mx-36 justify-center p-4 gap-3 items-center UserDetailsModal rounded">
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <div className="flex text-center mt-2 flex-col">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-400 flex justify-center">
            <MdEmail className="mt-1 mr-1" /> {item.mobile}
          </p>
          <p className="text-sm text-gray-400 flex justify-center">
            <BiSolidPhoneCall className="mt-1 mr-1" /> {item.email}
          </p>
          <p className="text-sm text-gray-400 flex justify-center">
            <ImLocation2 className="mt-1 mr-1" />
            {item.address}
          </p>
          <p className="text-gray-300 max-w-[30rem]">{item.description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default UserDetails;
