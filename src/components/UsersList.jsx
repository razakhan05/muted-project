import React, { useState, useEffect, useCallback } from "react";
import Loader from "./Loader";
import { fetchItems } from "../utils/api";
import useIntersectionObserver from "../hooks/ScrollHook";
import UserDetails from "./UserDetails";
import UserCard from "./UserCard";
import Error from "./Error";

const UserList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const itemsPerPage = 10;

  const fetchItemsFromApi = useCallback(async () => {
    setLoading(true);

    try {
      const newItems = await fetchItems(page, itemsPerPage);
      if (newItems.length === 0) {
        return;
      }

      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Load initial items on component mount
  useEffect(() => {
    fetchItemsFromApi();
  }, [fetchItemsFromApi]);

  // Use the scroll hook
  const observer = useIntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Load more items when the last item comes into view
        setPage((prevPage) => prevPage + 1);
      }
    },
    { threshold: 0.1 }
  );
  // Attach the observer to the last item in the list
  useEffect(() => {
    if (observer && items.length > 0) {
      observer.observe(document.querySelector(".item:last-child"));
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [items, observer]);

  // Function to open the modal
  const openModal = (index) => {
    setClickedItemIndex(index);
    setIsModalVisible(true);

    // Add a style attribute to the body element to disable scrolling when the modal is open
    document.body.style.overflow = "hidden";
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 mx-4">
        {items.map((item, index) => (
          <UserCard
            key={index}
            item={item}
            index={index}
            openModal={openModal} // Pass the openModal function
          />
        ))}
      </div>
      {loading && <Loader />}
      {error && <Error />}
      {isModalVisible && (
        <UserDetails
          item={items[clickedItemIndex]}
          closeModal={() => {
            setIsModalVisible(false);
            setClickedItemIndex(null);
            document.body.style.overflow = "auto"; // Re-enable body scrolling
          }}
        />
      )}
    </div>
  );
};

export default UserList;
