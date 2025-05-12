import React from 'react';

const CartList = ({ cartItems, loading, error, onRemoveFromCart }) => {
  console.log('CartList items:', cartItems);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex-1">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Cart Items</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {!loading && cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li
              key={`${item.vendorId}-${item.serviceName}-${index}`}
              className="p-4 border rounded-md bg-gray-50 flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/400'}
                  alt={item.serviceName}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-800">{item.serviceName}</h3>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-gray-600">Price: ${Number(item.price || 0).toFixed(2)}</p>
              </div>
              <button
                onClick={() => onRemoveFromCart(item.vendorId, item.serviceName)}
                className={`px-4 py-2 rounded-md text-white transition ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                }`}
                disabled={loading}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;