import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { addOrder } from "../utils/ordersSlice";
import { useNavigate } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
    upi: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems
    .reduce(
      (sum, item) =>
        sum + item.price * item.quantity * (1 - item.discountPercentage / 100),
      0
    )
    .toFixed(2);

  // Regex for payment validations
  const cardRegex = /^\d{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3,4}$/;
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

  // Handle form input changes and clear error for having value
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  // validation for shipping and payment fields
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required.";
      if (!form.address.trim()) newErrors.address = "Address is required.";
      if (!form.city.trim()) newErrors.city = "City is required.";
      if (!form.zip.trim()) newErrors.zip = "ZIP code is required.";
    } else if (step === 2) {
      if (paymentMethod === "card") {
        if (!form.card.trim()) {
          newErrors.card = "Card number required.";
        } else if (!cardRegex.test(form.card.trim())) {
          newErrors.card = "Invalid card number (16 digits).";
        }
        if (!form.expiry.trim()) {
          newErrors.expiry = "Expiry required.";
        } else if (!expiryRegex.test(form.expiry.trim())) {
          newErrors.expiry = "Invalid expiry (MM/YY).";
        }
        if (!form.cvv.trim()) {
          newErrors.cvv = "CVV required.";
        } else if (!cvvRegex.test(form.cvv.trim())) {
          newErrors.cvv = "Invalid CVV (3-4 digits).";
        }
      }
      if (paymentMethod === "upi") {
        if (!form.upi.trim()) {
          newErrors.upi = "UPI ID required.";
        } else if (!upiRegex.test(form.upi.trim())) {
          newErrors.upi = "Invalid UPI ID format.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Setting Active step on Navigating Next and Back
  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 3));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  // Creating new Order on passing successfull steps
  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      total: parseFloat(total),
      status: "Processing",
      items: cartItems,
      shipping: { ...form },
      paymentMethod,
    };
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    setStep(4);
    setTimeout(() => navigate("/orders"), 1500);
  };
  //  Order successfull & Thank you section
  if (step === 4) {
    return (
      <div className="fixed inset-0 flex flex-col items-center text-center justify-center min-h-screen bg-green-50 p-6">
        <BiCheckCircle className="text-green-600" size={80} />
        <h2 className="max-[350px]:text-xl text-3xl font-self   mt-4 mb-2 text-gray-800">
          Thank you for your order!
        </h2>
        <p className="max-[350px]:text-sm text-gray-600 mb-6">Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <section className="w-full p-4">
      <h1 className="max-[350px]:text-xl text-3xl text-center font-self  text-blue-500 mb-8">Checkout</h1>

      <div className="max-w-2xl  mx-auto p-4 bg-white rounded-2xl shadow-lg">
        {/* Progress Bar for 3 steps */}
        <div className="flex items-center mb-10">
          {[1, 2, 3].map((st) => (
            <React.Fragment key={st}>
              <div className="flex flex-col items-center">
                <div
                  className={`max-[350px]:text-sm w-10 h-10 flex items-center justify-center rounded-full ${
                    step >= st
                      ? "bg-[#47A99F] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                  {st}
                </div>
                <span className="max-[350px]:text-xs text-sm mt-2 capitalize">
                  {st === 1 ? "Shipping" : st === 2 ? "Payment" : "Review"}
                </span>
              </div>
              {st < 3 && (
                <div
                  className={`flex-1 h-1 ${
                    step > st ? "bg-blue-600" : "bg-gray-200"
                  }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* shipping Step */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <input
                name="name"
                onChange={handleChange}
                value={form.name}
                placeholder="Full Name"
                className="max-[350px]:p-2 w-full p-3 max-[350px]:text-sm border border-gray-400 outline-none focus:border-2 rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 max-[350px]:text-xs text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                name="address"
                onChange={handleChange}
                value={form.address}
                placeholder="Address"
                className="max-[350px]:p-2 w-full p-3 max-[350px]:text-sm border border-gray-400 outline-none focus:border-2 rounded-lg"
              />
              {errors.address && (
                <p className="text-red-500 max-[350px]:text-xs text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-2 max-w-full gap-4">
              <div className="flex flex-col">
                <input
                  name="city"
                  onChange={handleChange}
                  value={form.city}
                  placeholder="City"
                  className="p-3 border max-[350px]:p-2  max-[350px]:text-sm border-gray-400 outline-none focus:border-2 rounded-lg"
                />
                {errors.city && (
                  <p className="text-red-500 max-[350px]:text-xs text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  name="zip"
                  onChange={handleChange}
                  value={form.zip}
                  placeholder="ZIP Code"
                  className="p-3 border max-[350px]:p-2 max-[350px]:text-sm border-gray-400 outline-none focus:border-2 rounded-lg"
                />
                {errors.zip && (
                  <p className="text-red-500 max-[350px]:text-xs text-sm mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Payment Step */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Payment Method Selection */}
            <div className="flex space-x-4 justify-center">
              {["card", "upi", "cod"].map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setPaymentMethod(method);
                    setErrors({});
                  }}
                  className={`px-4 py-2 text-xs md:text-sm rounded-lg border ${
                    paymentMethod === method
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}>
                  {method === "card"
                    ? "Card"
                    : method === "upi"
                    ? "UPI"
                    : "Cash On Delivery"}
                </button>
              ))}
            </div>
            {/* Payment Fields */}
            {paymentMethod === "card" && (
              <>
                {["card", "expiry", "cvv"].map((field) => (
                  <div key={field}>
                    <input
                      name={field}
                      onChange={handleChange}
                      value={form[field]}
                      placeholder={
                        field === "card"
                          ? "Card Number"
                          : field === "expiry"
                          ? "MM/YY"
                          : "CVV"
                      }
                      className="w-full max-[350px]:p-2 p-3 border max-[350px]:text-sm border-gray-400 outline-none focus:border-2 rounded-lg"
                    />
                    {errors[field] && (
                      <p className="text-red-500 max-[350px]:text-xs text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
            {paymentMethod === "upi" && (
              <div>
                <input
                  name="upi"
                  onChange={handleChange}
                  value={form.upi}
                  placeholder="UPI ID"
                  className="w-full max-[350px]:text-sm max-[350px]:py-2 p-3 border border-gray-400 outline-none focus:border-2 rounded-lg"
                />
                {errors.upi && (
                  <p className="text-red-500 max-[350px]:text-xs text-sm mt-1">{errors.upi}</p>
                )}
              </div>
            )}
            {paymentMethod === "cod" && (
              <p className="max-[350px]:text-sm text-gray-600 text-center">
                You will pay with cash upon delivery.
              </p>
            )}
          </div>
        )}
        {/* Review Step*/}
        {step === 3 && (
          <div className="space-y-4">
            <div className="border border-gray-400 p-4 rounded-lg space-y-2 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm md:text-base text-gray-700">
                  <span>
                    {item.title} x {item.quantity} :{" "}
                  </span>
                  <span className="ml-1 text-gray-500">
                    {" "}
                   &#8377;
                    {(
                      (item.price*83).toFixed(2) *
                      item.quantity *
                      (1 - item.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-self  text-lg text-[#47A99F]">
              <span>Total</span>
              <span>&#8377;{(total*83).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="max-[350px]:text-sm max-[350px]:py-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="max-[350px]:text-sm max-[350px]:py-2 max-[350px]:px-4 px-6 py-3 bg-[#47A99F] text-white rounded-full hover:bg-[#47A99F]">
              Next
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="max-[350px]:text-sm max-[350px]:py-2 max-[350px]:px-4 px-6 py-3 bg-[#47A99F] text-white rounded-full hover:bg-[#47A99F]">
              Place Order
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
