import { useSelector } from "react-redux";
import NoOrders from "./NoOrders";
import OrderItem from "./OrderItem";

export default function Orders() {
  // Using useSelector to subscribe and get Redux state of orders
  const orders = useSelector((state) => state.orders.orders);

  // Displaying NoOrders component when order list is empty
  if (!orders.length) return <NoOrders />;

  return (
    <section className="max-w-4xl w-full mx-auto p-4 mt-4">
      <h1 className="max-[350px]:text-xl text-2xl font-self text-center md:text-left md:text-4xl  text-[#47A99F] mb-6">
        Order History
      </h1>
      {/*Dispalying list of orders by sending order data to child OrderItem */}
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border-2 border-gray-200 p-4 rounded-xl hover:bg-gray-100 transition">
            <OrderItem order={order} />
          </li>
        ))}
      </ul>
    </section>
  );
}
