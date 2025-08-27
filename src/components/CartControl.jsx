import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../utils/cartSlice";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function CartControl({ product, handleItem = () => {} }) {
  // Using dispatch to send actions to Redux store, allowing state updates
  const dispatch = useDispatch();

  // Get the cart item for the current product from Redux store
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === product.id)
  );

  // Handle increment & Handle Decrement: dispatching UpdateQuantity action to update cart in Redux state.
  const handleIncrement = () =>
    dispatch(
      updateQuantity({
        id: cartItem.id,
        quantity: cartItem.quantity + 1,
      })
    );

  const handleDecrement = () => {
    if (cartItem.quantity == 1) {
      dispatch(removeFromCart(cartItem.id));
      handleItem();
    } else {
      dispatch(
        updateQuantity({
          id: cartItem.id,
          quantity: cartItem.quantity - 1,
        })
      );
    }
  };

  // // Do not render controls if the product is not in the cart
  // if (!cartItem) return null;

  return (
    <div className="w-full grid grid-cols-3 flex-grow items-center gap-2">
      <button
        onClick={handleDecrement}
        className="flex rounded-full h-full justify-center shadow-xl items-center col-span-1 max-[350px]:p-1 p-2 w-full bg-red-100 border border-red-600 hover:bg-red-200">
        <BiMinus className="text-red-600" />
      </button>
      <span className="rounded-lg text-[#47A99F] text-center py-1 max-[350px]:text-lg text-xl text-shadow-lg">
        {cartItem.quantity}
      </span>
      <button
        disabled={cartItem.quantity >= cartItem.stock}
        onClick={handleIncrement}
        className="rounded-full flex h-full shadow-xl disabled:opacity-40 items-center bg-green-100 justify-center  col-span-1 max-[350px]:p-1 p-2 w-full border border-green-600 hover:bg-green-200">
        <BiPlus className="text-green-600" />
      </button>
    </div>
  );
}
