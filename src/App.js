import InfiniteScrolling from "./components/InfiniteScrolling";

function App() {
  return (
    <div className="font-mono flex justify-center items-center flex-col lg:mx-36 py-20">
      <h1 className=" text-4xl animate-pulse font-semibold text-center mb-20">
        Infinite Scrolling.
      </h1>
      <InfiniteScrolling />
    </div>
  );
}

export default App;
