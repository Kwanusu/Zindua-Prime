import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "@/features/cart/cartSlice";

import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Cart = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector((state) => state.cart);

  // Total number of products
  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const total = items.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>

            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Button
            type="button"
            disabled={loading}
            onClick={() => dispatch(clearCart())}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* =========================
              CART ITEMS
          ========================== */}
          <div className="space-y-4 lg:col-span-2">

            {items.map((item) => {

              const itemTotal =
                Number(item.price) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >

                  <div className="flex gap-4">

                    {/* Product Image */}
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingCart className="h-8 w-8 text-gray-400" />
                        </div>
                      )}

                    </div>

                    {/* Product Information */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                      <div className="flex justify-between gap-4">

                        <div>
                          <h2 className="truncate font-semibold text-gray-900 dark:text-white">
                            {item.title || item.name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            ${Number(item.price).toFixed(2)} each
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() =>
                            dispatch(removeFromCart(item.id))
                          }
                          className="text-gray-400 transition hover:text-red-500 disabled:opacity-50"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-700">

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              dispatch(
                                decreaseQuantity(item.id)
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-300 px-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              dispatch(
                                increaseQuantity(item.id)
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>

                        </div>

                        {/* Item Total */}
                        <p className="font-bold text-gray-900 dark:text-white">
                          ${itemTotal.toFixed(2)}
                        </p>

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Items
                </span>

                <span className="font-medium text-gray-900 dark:text-white">
                  {itemCount}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>

                <span className="font-medium text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 dark:border-gray-800">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${total.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CreditCard className="h-5 w-5" />
              Proceed to Checkout
            </Link>

            {/* Continue shopping */}
            <Link
              to="/products"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};