import UserList from "./components/UsersList";

function App() {
  return (
    <div className="font-mono flex justify-center min-h-screen items-center flex-col lg:mx-36 py-20">
      <h1 className=" text-4xl animate-pulse font-semibold text-center mb-20">
        UserScroll: Explore Endless User Data with React
      </h1>
      <UserList />
    </div>
  );
}

export default App;
