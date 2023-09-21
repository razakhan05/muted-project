import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Loader from "./Loader";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";

const InfiniteScrolling = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedItemIndex, setClickedItemIndex] = useState(null);

  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const observer = useRef(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://650bdced47af3fd22f6697e9.mockapi.io/items?page=${page}&limit=${itemsPerPage}`
      );
      const newItems = response.data;
      if (newItems.length === 0) {
        return;
      }

      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Load initial items on component mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    // Create an Intersection Observer to track when the last item is in view
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load more items when the last item comes into view
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    // Attach the observer to the last item in the list
    if (observer.current && items.length > 0) {
      observer.current.observe(document.querySelector(".item:last-child"));
    }

    return () => {
      // Clean up the observer
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [items]);

  const submitHandler = (index) => {
    setClickedItemIndex(index);
    setIsModalVisible(true);

    // Add a style attribute to the body element to disable scrolling when the modal is open
    document.body.style.overflow = "hidden";
  };

  // Function to close the modal and re-enable body scrolling
  const closeModal = () => {
    setIsModalVisible(false);
    setClickedItemIndex(null);

    // Remove the style attribute to enable body scrolling when the modal is closed
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 mx-4">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => submitHandler(index)}
            className={`bg-cyan-950 p-4 gap-3 items-center flex tileAnimate rounded shadow item ${
              index === items.length - 1 ? "last-child" : ""
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 rounded-full mx-auto"
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-300">
                {item.description.length <= 20
                  ? item.description
                  : `${item.description.slice(0, 60)}...`}
              </p>
            </div>
          </div>
        ))}
      </div>
      {loading && <Loader />}
      {error && (
        <div className="text-red-500 text-2xl text-center mt-4">{error}</div>
      )}
      {isModalVisible && (
        <ModalComponent
          item={items[clickedItemIndex]}
          closeModal={closeModal} // Pass the closeModal function
        />
      )}
    </div>
  );
};

const ModalComponent = ({ item, closeModal }) => (
  <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-gray-800 bg-opacity-90">
    <div className=" p-8 rounded shadow">
      <button
        className=" animate-bounce flex md:ml-[630px] justify-end"
        onClick={closeModal}
      >
        <AiOutlineCloseCircle color=" rgb(156 163 175 )" size={"2rem"} />
      </button>
      <div className="bg-cyan-950 sm:mx-36 justify-center p-4 gap-3 items-center ModalAnimateTile rounded ">
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <div className="flex text-center mt-2 flex-col">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className=" text-sm text-gray-400 flex justify-center">
            <MdEmail className=" mt-1 mr-1" /> {item.mobile}
          </p>
          <p className=" text-sm text-gray-400 flex justify-center">
            <BiSolidPhoneCall className=" mt-1 mr-1" /> {item.email}
          </p>
          <p className=" text-sm text-gray-400 flex justify-center">
            <ImLocation2 className=" mt-1 mr-1" />
            {item.address}
          </p>
          <p className="text-gray-300 max-w-[30rem]">{item.description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default InfiniteScrolling;
