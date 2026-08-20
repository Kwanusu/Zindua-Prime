import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track which product ID is currently being added
  const [addingId, setAddingId] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const cartItemIds = useMemo(() => {
    return new Set(cartItems?.map((item) => String(item.id)));
  }, [cartItems]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Updated handler with localized loading & error handling
  const handleAddToCart = useCallback(
    async (product) => {
      try {
        setAddingId(product.id);
        // .unwrap() throws an error if an createAsyncThunk rejects
        await dispatch(addToCart(product)).unwrap();
      } catch (err) {
        console.error("Failed to add to cart:", err);
      } finally {
        setAddingId(null);
      }
    },
    [dispatch]
  );

  if (loading) return <div className="flex justify-center p-8">Loading data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const isInCart = cartItemIds.has(String(product.id));
          const isAdding = addingId === product.id;

          return (
            <Card key={product.id}>
              <CardContent className="flex h-full flex-col p-4">
                <div className="mb-4 flex h-52 items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <h2 className="mb-2 line-clamp-2 font-semibold">
                    {product.title}
                  </h2>

                  <p className="mb-4 text-lg font-bold text-indigo-600">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  <Button
                    className="mt-auto w-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={isAdding}
                  >
                    {isAdding
                      ? "Adding..."
                      : isInCart
                      ? "Add Another"
                      : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}