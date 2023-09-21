const UserCard = ({ item, index, openModal }) => (
  <div
    onClick={() => openModal(index)}
    className={`bg-cyan-950 p-4 gap-3 items-center flex TileAnimate rounded shadow item ${
      index === 9 ? "last-child" : ""
    }`} // Assuming index 9 represents the last item
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
);

export default UserCard;
