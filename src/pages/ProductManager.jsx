import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, RefreshCw, X, CheckCircle2, AlertCircle } from 'lucide-react';

const API_URL = 'https://fakestoreapi.com/products';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'electronics',
    description: '',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
  });

  // 1. READ: Fetch initial products using Axios GET
  const fetchProducts = async () => {
    // setLoading(true);
    // setError(null);
    try {
      const response = await axios.get(`${API_URL}?limit=6`);
      setProducts(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to fetch products. Check network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. CREATE & UPDATE: Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setSubmitting(true);
    setError(null);
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (editingId) {
        // UPDATE: Axios PUT
        await axios.put(`${API_URL}/${editingId}`, payload);
        // FakeStore API simulates updates; update local UI state to reflect changes
        setProducts((prev) =>
          prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item))
        );
        showToast('Product updated successfully!');
      } else {
        // CREATE: Axios POST
        const response = await axios.post(API_URL, payload);
        const newProduct = {
          ...payload,
          id: response.data.id || Date.now(), // Fallback ID for UI state
        };
        setProducts((prev) => [newProduct, ...prev]);
        showToast('Product created successfully!');
      }
      resetForm();
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. DELETE: Handle Product Removal
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      // Axios DELETE
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      showToast('Product deleted successfully!');
    } catch (err) {
      setError('Failed to delete product.');
    }
  };

  // Populate form for editing
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category || 'electronics',
      description: product.description || '',
      image: product.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      price: '',
      category: 'electronics',
      description: '',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-50 animate-bounce">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Zindua Prime Store Manager</h1>
          <p className="text-sm text-slate-500">Connected to FakeStore API (`https://fakestoreapi.com/products`)</p>
        </div>
        <button
          onClick={fetchProducts}
          className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 p-2 rounded-lg transition-colors"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Reload API</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-xl flex items-center space-x-2 text-sm">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* CREATE / UPDATE FORM */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {editingId ? 'Edit Product (PUT)' : 'Create New Product (POST)'}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Wireless Headphones"
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="99.99"
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
              <span>{editingId ? 'Update Product' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* READ: Product Grid Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-2">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-sm">Fetching store items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
            >
              <div>
                <div className="h-44 bg-white rounded-xl p-4 flex items-center justify-center mb-4 overflow-hidden border border-slate-100 dark:border-slate-800">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                  {item.category}
                </span>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm mt-2 line-clamp-2">{item.title}</h3>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">${item.price?.toFixed(2)}</span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Edit (PUT)"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                    title="Delete (DELETE)"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}