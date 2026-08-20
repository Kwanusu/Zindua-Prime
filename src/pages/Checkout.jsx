import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  CreditCard, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  ArrowLeft,
  CheckCircle2,
  Smartphone
} from "lucide-react";
// Import clearCart thunk (adjust path to match your folder structure)
import { clearCart } from "../features/cart/cartSlice"; 

export default function CheckoutPage() {
  const dispatch = useDispatch();
  
  // Cart state from Redux
  const cartItems = useSelector((state) => state.cart?.items || []);
  
  // Local Form & Payment State
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    mpesaPhone: "",
  });

  // Order Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1), 
    0
  );
  const shipping = subtotal > 0 ? 15.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Simulate payment/STK Push delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Dispatch clearCart to clear Firestore collection and Redux state
      await dispatch(clearCart()).unwrap();

      // 3. Set success view
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to process order or clear cart:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-colors">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 max-w-md w-full flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            {paymentMethod === "mpesa" 
              ? `An M-Pesa STK push prompt was sent to ${formData.mpesaPhone}. Receipt sent to ${formData.email}.`
              : `Thank you for your purchase. We've sent a receipt to ${formData.email}.`}
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Trust Header */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Cart
          </button>
          
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Secure SSL Encryption</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Form Area */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Contact Information */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">Shipping Details</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                
                {/* Method Options */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex flex-col sm:flex-row items-center justify-center p-3 rounded-xl border text-sm font-medium transition ${
                      paymentMethod === "mpesa"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 sm:mr-2 mb-1 sm:mb-0" /> M-Pesa
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col sm:flex-row items-center justify-center p-3 rounded-xl border text-sm font-medium transition ${
                      paymentMethod === "card"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 sm:mr-2 mb-1 sm:mb-0" /> Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("delivery")}
                    className={`flex flex-col sm:flex-row items-center justify-center p-3 rounded-xl border text-sm font-medium transition ${
                      paymentMethod === "delivery"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Truck className="w-4 h-4 sm:mr-2 mb-1 sm:mb-0" /> COD
                  </button>
                </div>

                {/* M-PESA Input */}
                {paymentMethod === "mpesa" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                        M-Pesa Phone Number
                      </label>
                      <input
                        type="tel"
                        name="mpesaPhone"
                        required
                        placeholder="254712345678"
                        value={formData.mpesaPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      An Express STK Push prompt will be sent directly to this device for authorization.
                    </p>
                  </div>
                )}

                {/* Card Inputs */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        placeholder="4532 •••• •••• 8890"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          required
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cvc"
                          required
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-semibold rounded-xl transition shadow-sm text-base flex items-center justify-center"
              >
                {isSubmitting 
                  ? paymentMethod === "mpesa" ? "Sending STK Push..." : "Processing..." 
                  : paymentMethod === "mpesa" ? `Pay $${total.toFixed(2)} via M-Pesa` : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-6 space-y-6">
              <h2 className="text-lg font-semibold flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" /> Order Summary
              </h2>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-slate-400 py-4">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-12 h-12 object-contain bg-white dark:bg-slate-800 p-1 rounded-lg border dark:border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{item.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.quantity || 1}</p>
                      </div>
                      <p className="text-sm font-semibold">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span>Total</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}