import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { CartItem } from './CartItem';
import { useCart } from './context/CartContext';

function Storefront() {
  const { cart, dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  // Hook 2: useRef - Direct DOM Focus
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Hook 1: useEffect - Fetching data asynchronously on mount
  useEffect(() => {
    const controller = new AbortController(); // Prevents memory leaks if component unmounts mid-fetch

    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('public/products.json', { signal: controller.signal });
        
        if (!response.ok) {
          throw new Error('Failed to load product catalog.');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();

    // Cleanup function cancels pending request if component unmounts
    return () => controller.abort();
  }, []); // Empty dependency array: runs ONCE on component mount

  // Hook 3: useMemo - Filter catalog based on search text and dynamic products state
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]); // Re-runs when products finish loading OR search text changes

  // Hook 4: useMemo - Compute cart total price efficiently
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  // Hook 5: useCallback - Stable delete function for child components
  const handleRemove = useCallback((index) => {
    dispatch({ type: 'REMOVE', payloadIndex: index });
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>TechMart POS Dashboard</h1>

      {/* Search Bar with Ref */}
      <input
        ref={searchInputRef}
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Products</h2>

      {/* Async State Handling */}
      {loading && <p>Loading product catalog...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id} style={{ margin: '8px 0' }}>
              {product.name} - ${product.price}
              <button
                onClick={() => dispatch({ type: 'ADD', payload: product })}
                style={{ marginLeft: '10px' }}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Shopping Cart (Total: ${cartTotal})</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <CartItem
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            onRemove={handleRemove}
          />
        ))
      )}
    </div>
  );
}

export default Storefront;