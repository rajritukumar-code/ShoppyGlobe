import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-[#F6F6F6] flex flex-col min-h-screen">
      <Header />
      <main className="w-screen flex-grow flex flex-col">
      <Outlet />
      </main>
    </div>
  );
}

export default App;
