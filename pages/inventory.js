export default function Inventory() {
  
  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Inventory Page</h1>
      {/* Inventory list will go here */}
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
  Current Ingredient Inventory
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {items.map((item) => (
    <div
      key={item.id}
      className="bg-yellow-50 p-4 rounded-xl shadow-md relative"
    >
      <h3 className="text-xl font-semibold text-purple-900">{item.name}</h3>

      <p
        className={`text-md font-medium mt-2 ${
          item.quantity >= 50
            ? "text-green-600"
            : item.quantity >= 20
            ? "text-yellow-600"
            : "text-red-500"
        }`}
      >
        Stock: {item.quantity} {item.unit}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <button
          className="border border-yellow-500 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded">
          Qty
        </span>
        <button
          className="border border-yellow-500 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
          onClick={() =>
            item.quantity > 0 &&
            updateQuantity(item.id, item.quantity - 1)
          }
        >
          −
        </button>
      </div>

      <button
        className="absolute bottom-2 right-3 text-red-500 hover:text-red-700"
        onClick={() => deleteItem(item.id)}
        title="Delete"
      >
        🗑️
      </button>
    </div>
  ))}
</div>
    </div>
  );
  
}
