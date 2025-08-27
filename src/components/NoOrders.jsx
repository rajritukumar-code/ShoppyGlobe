import { PiEmpty } from "react-icons/pi";

function NoOrders() {
  return (
    <section className=" bg-white m-4 flex-grow h-full flex flex-col items-center justify-center p-6">
      <div className="text-center h-full">
        <PiEmpty className="text-gray-400 w-24 h-24 mx-auto mb-4" />
        <h2 className="max-[350px]:text-xl text-3xl text-gray-800 mb-2">No Orders Found</h2>
        <p className="text-gray-600 mb-6 max-[350px]:text-sm">
          Looks like you haven’t ordered anything yet.
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="inline-block max-[350px]:text-sm max-[350px]:py-2 max-[350px]:px-4 px-6 py-3 bg-blue-600 text-white  rounded-lg hover:bg-blue-700 transition">
          Order Now
        </button>
      </div>
    </section>
  );
}

export default NoOrders;
