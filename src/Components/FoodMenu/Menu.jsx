import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Menu({ isDark, loggedUser }) {
  const allergyList = ["nuts", "dairy", "gluten", "eggs", "meat"];

  const initialFoodItems = [
    { id: 1, name: "Adjaruli Khachapuri", category: "Pastry", price: 18, desc: "Boat-shaped bread with cheese, butter, and a runny egg yolk.", img: "/adjaruli.png", allergens: ["dairy", "eggs", "gluten"] },
    { id: 2, name: "Khinkali", category: "Dumplings", price: 2, desc: "Traditional spiced meat dumplings with savory broth inside.", img: "/khinkali.png", allergens: ["meat", "gluten"] },
    { id: 3, name: "Shkmeruli", category: "Poultry", price: 32, desc: "Crispy chicken in a rich, intense garlic and milk sauce.", img: "/shkmeruli.png", allergens: ["dairy"] },
    { id: 4, name: "Badrijani Nigvzit", category: "Appeter", price: 15, desc: "Fried eggplant rolls stuffed with spiced walnut paste.", img: "/badrijaninigvzit.png", allergens: ["nuts"] },
    { id: 5, name: "Chashushuli", category: "Meat", price: 24, desc: "Spicy veal stew with tomatoes, herbs, and Georgian spices.", img: "/chashushuli.png", allergens: ["meat"] },
    { id: 6, name: "Lobiani", category: "Pastry", price: 12, desc: "Flaky bread filled with seasoned mashed kidney beans.", img: "/lobiani.png", allergens: ["gluten"] },
    { id: 7, name: "Pkhali Trio", category: "Appeter", price: 17, desc: "Minced spinach, beets, and cabbage with walnuts and pomegranate.", img: "/pkhalitrio.png", allergens: ["nuts"] },
    { id: 8, name: "Mtsvadi", category: "Meat", price: 28, desc: "Grilled pork skewers marinated in onions and pomegranate juice.", img: "/mtsvadi.png", allergens: ["meat"] },
    { id: 9, name: "Chakhokhbili", category: "Poultry", price: 22, desc: "Stewed chicken with tomatoes, fresh herbs, and garlic.", img: "/chakhokhbili.png", allergens: ["meat"] },
    { id: 10, name: "Kubdari", category: "Pastry", price: 20, desc: "Svanetian flatbread filled with spiced chunks of meat and onions.", img: "/kubdari.png", allergens: ["meat", "gluten"] },
    { id: 11, name: "Ajapsandali", category: "Vegetarian", price: 16, desc: "Traditional vegetable ragout with eggplant, bell peppers, and tomatoes.", img: "/ajapsandali.png", allergens: [] },
    { id: 12, name: "Ostri", category: "Meat", price: 26, desc: "Spicy beef stew with tomatoes, garlic, herbs, and pickles.", img: "/ostri.png", allergens: ["meat"] }
  ];

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('supra_menu');
    return saved ? JSON.parse(saved) : initialFoodItems;
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('supra_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [cart, setCart] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [details, setDetails] = useState({ address: '', phone: '' });
  const [newItem, setNewItem] = useState({ name: '', category: 'Meat', price: '', desc: '', img: '', allergens: [] });

  const isAdmin = loggedUser?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    localStorage.setItem('supra_menu', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('supra_orders', JSON.stringify(orders));
  }, [orders]);

  const toggleUserAllergy = (allergy) => {
    setUserAllergies(prev => prev.includes(allergy) ? prev.filter(selected => selected !== allergy) : [...prev, allergy]);
  };

  const checkConflict = (item) => {
    if (!item.allergens || item.allergens.length === 0) return false;
    return item.allergens.some(allergy => userAllergies.includes(allergy));
  };

  const addToCart = (item) => {
    if (checkConflict(item)) {
      alert("Warning: This dish contains an allergen you selected!");
      return;
    }
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(cartItem => cartItem.id !== id));
  const total = cart.reduce((accumulator, cartItem) => accumulator + (cartItem.price * cartItem.quantity), 0);

  const handleAddDish = (event) => {
    event.preventDefault();
    const dish = { ...newItem, id: Date.now(), price: Number(newItem.price) };
    setItems([...items, dish]);
    setNewItem({ name: '', category: 'Meat', price: '', desc: '', img: '', allergens: [] });
  };

  const toggleNewItemAllergen = (allergy) => {
    setNewItem(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergy) ? prev.allergens.filter(selected => selected !== allergy) : [...prev.allergens, allergy]
    }));
  };

  const handleDeleteDish = (id) => setItems(items.filter(item => item.id !== id));

  const submitOrder = (event) => {
    event.preventDefault();
    if (details.phone.length !== 9) {
      alert("phone number must be 9 digits.");
      return;
    }
    const newOrder = {
      id: Date.now(),
      customer: loggedUser?.email || "Guest",
      items: cart,
      total: total,
      details: details,
      status: 'pending',
      timestamp: new Date().toLocaleString()
    };
    setOrders([...orders, newOrder]);
    alert("order submitted.");
    setCart([]);
    setDetails({ address: '', phone: '' });
    setShowCheckout(false);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status } : order));
  };

  const deleteOrder = (id) => setOrders(orders.filter(order => order.id !== id));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row transition-all duration-500" 
          style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}>
      
      <div className="flex-1 p-6 md:p-10 lg:p-20 overflow-y-auto flex flex-col">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-20 gap-4">
            <h2 className="text-[50px] md:text-[80px] lg:text-[100px] font-black tracking-tighter italic leading-none">
              the <span className="text-green-600">menu</span>
            </h2>
            <Link to="/home" className="text-[18px] md:text-[20px] font-bold border-b-4 border-green-600 hover:text-green-600 transition-all">back home</Link>
          </div>

          {!isAdmin && (
            <div className="mb-10 p-6 border-4 border-zinc-800 rounded-[30px]">
              <p className="font-black italic mb-4">select your allergies:</p>
              <div className="flex flex-wrap gap-2">
                {allergyList.map(allergy => (
                  <button key={allergy} onClick={() => toggleUserAllergy(allergy)} className={`px-4 py-2 rounded-full text-xs font-black uppercase border-2 transition-all ${userAllergies.includes(allergy) ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-800 opacity-50'}`}>
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isAdmin && cart.length > 0 && (
            <div className="flex justify-center mb-20 relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-zinc-200 shadow-2xl relative flex items-center justify-center bg-white/5 overflow-hidden">
                <div className="absolute inset-4 rounded-full border-2 border-zinc-200/20"></div>
                {cart.map((cartItem, index) => (
                  <img 
                    key={`plate-${cartItem.id}`}
                    src={cartItem.img} 
                    alt=""
                    className="absolute w-24 h-24 object-contain transition-all duration-500"
                    style={{ 
                      transform: `translate(${(index % 3 - 1) * 45}px, ${(Math.floor(index / 3) - 1) * 45}px) rotate(${index * 30}deg)`,
                      zIndex: index
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-6 bg-green-600 text-white px-6 py-2 rounded-full font-black italic shadow-lg">Your Plate</div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
            {items.map((item) => {
              const blocked = !isAdmin && checkConflict(item);
              return (
                <div key={item.id} className={`p-4 rounded-[30px] border-4 transition-all flex flex-col sm:flex-row gap-6 relative ${blocked ? 'opacity-30 grayscale border-red-900' : 'border-zinc-800 hover:border-green-600 bg-zinc-900/10'}`}>
                  {isAdmin && (
                    <button onClick={() => handleDeleteDish(item.id)} className="absolute -top-3 -right-3 bg-red-600 text-white w-8 h-8 rounded-full font-black hover:scale-110 z-10 transition-all">✕</button>
                  )}
                  <img src={item.img} alt={item.name} className="w-full sm:w-40 h-48 sm:h-40 object-cover rounded-[25px]" />
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-600 font-black uppercase text-[12px]">{item.category}</span>
                        <span className="text-[22px] font-black">{item.price}₾</span>
                      </div>
                      <h3 className="text-[24px] font-black leading-tight mb-2">{item.name}</h3>
                      <p className="opacity-60 text-[14px] line-clamp-2">{item.desc}</p>
                      <div className="flex gap-1 mt-2">
                        {item.allergens?.map(allergy => (
                          <span key={allergy} className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${userAllergies.includes(allergy) ? 'border-red-600 text-red-600' : 'border-zinc-700 opacity-40'}`}>{allergy}</span>
                        ))}
                      </div>
                    </div>
                    {!isAdmin && (
                      <button 
                        onClick={() => addToCart(item)} 
                        disabled={blocked}
                        className={`mt-4 w-full py-3 rounded-full font-black transition-all text-[14px] ${blocked ? 'bg-zinc-800 cursor-not-allowed text-zinc-600' : 'bg-green-600 text-white hover:scale-105'}`}
                      >
                        {blocked ? "Contains Allergies" : "Add to Plate"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-112.5 border-t-4 lg:border-t-0 lg:border-l-4 border-zinc-800 p-6 md:p-10 flex flex-col lg:sticky lg:top-0 lg:h-screen bg-zinc-900/20 backdrop-blur-md overflow-y-auto">
        {isAdmin ? (
          <div className="space-y-12">
            <div>
              <h3 className="text-[35px] font-black italic tracking-tighter mb-6">add <span className="text-green-600">dish</span></h3>
              <form onSubmit={handleAddDish} className="space-y-3">
                <input required placeholder="dish name" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent" value={newItem.name} onChange={event => setNewItem({...newItem, name: event.target.value})} />
                <input required type="number" placeholder="price" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent" value={newItem.price} onChange={event => setNewItem({...newItem, price: event.target.value})} />
                <input required placeholder="image url" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent" value={newItem.img} onChange={event => setNewItem({...newItem, img: event.target.value})} />
                <select className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent" value={newItem.category} onChange={event => setNewItem({...newItem, category: event.target.value})}>
                  <option value="Meat">Meat</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Appeter">Appeter</option>
                </select>
                <div className="p-4 border-2 border-zinc-800 rounded-[20px] space-y-2">
                  <p className="text-xs font-black uppercase opacity-50">contains allergens:</p>
                  <div className="flex flex-wrap gap-2">
                    {allergyList.map(allergy => (
                      <button type="button" key={allergy} onClick={() => toggleNewItemAllergen(allergy)} className={`px-3 py-1 rounded-md text-[10px] font-bold border ${newItem.allergens.includes(allergy) ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-700'}`}>{allergy}</button>
                    ))}
                  </div>
                </div>
                <textarea required placeholder="description" className="w-full p-4 rounded-[20px] border-2 border-zinc-800 bg-transparent h-24" value={newItem.desc} onChange={event => setNewItem({...newItem, desc: event.target.value})} />
                <button type="submit" className="w-full py-4 bg-green-600 text-white font-black rounded-full uppercase hover:bg-green-700 transition-all">save dish</button>
              </form>
            </div>

            <div>
              <h3 className="text-[35px] font-black italic tracking-tighter mb-6">active <span className="text-green-600">orders</span></h3>
              <div className="space-y-4">
                {orders.length === 0 ? <p className="opacity-40 italic">No orders yet...</p> : orders.map(order => (
                  <div key={order.id} className={`p-5 rounded-[25px] border-2 ${order.status === 'approved' ? 'border-green-600' : 'border-zinc-800'} bg-zinc-900/40`}>
                    <p className="font-black leading-tight mb-1">{order.details.address}</p>
                    <p className="text-[12px] opacity-60 mb-3">{order.items.map(cartItem => `${cartItem.quantity}x ${cartItem.name}`).join(", ")}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-black text-xl">{order.total}₾</span>
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <button onClick={() => updateOrderStatus(order.id, 'approved')} className="bg-green-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">Approve</button>
                        )}
                        <button onClick={() => deleteOrder(order.id)} className="bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-[35px] md:text-[40px] font-black italic mb-6 md:mb-10 tracking-tighter">your <span className="text-green-600">order</span></h3>
            <div className="grow space-y-6">
              {cart.length === 0 ? <p className="opacity-40 italic">Your plate is empty...</p> : cart.map(cartItem => (
                <div key={cartItem.id} className="flex justify-between items-center group">
                  <div>
                    <p className="font-black">{cartItem.name}</p>
                    <p className="opacity-60 text-sm">qty: {cartItem.quantity} — {cartItem.price * cartItem.quantity}₾</p>
                  </div>
                  <button onClick={() => removeFromCart(cartItem.id)} className="text-red-500 font-black p-2">✕</button>
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-10 pt-6 md:pt-10 border-t-4 border-zinc-800">
              <div className="flex justify-between items-center mb-6">
                <span className="opacity-60">Total Amount</span>
                <span className="text-[28px] md:text-[35px] font-black text-green-600">{total}₾</span>
              </div>
              <button onClick={() => setShowCheckout(true)} className="w-full py-6 rounded-full bg-white text-black font-black disabled:opacity-20 transition-transform active:scale-95" disabled={cart.length === 0}>Checkout Now</button>
            </div>
          </>
        )}
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm" onClick={() => setShowCheckout(false)}>
          <div className="bg-white p-8 md:p-10 rounded-[30px] max-w-lg w-full space-y-6 text-black" onClick={event => event.stopPropagation()}>
            <h3 className="text-[28px] md:text-[30px] font-black tracking-tighter">Delivery Info</h3>
            <form onSubmit={submitOrder} className="space-y-4">
              <input required type="text" placeholder="Address" className="w-full p-4 rounded-full border-2 border-gray-300" value={details.address} onChange={event => setDetails({...details, address: event.target.value})} />
              <input 
                required 
                type="text" 
                placeholder="Phone (9 digits)" 
                className="w-full p-4 rounded-full border-2 border-gray-300" 
                value={details.phone} 
                onChange={event => {
                  const val = event.target.value;
                  const lastChar = val[val.length - 1];
                  if (val === "" || (lastChar >= "0" && lastChar <= "9")) {
                    if (val.length <= 9) setDetails({...details, phone: val});
                  }
                }} 
              />
              <button type="submit" className="w-full p-4 bg-green-600 text-white font-black rounded-full text-[18px] hover:bg-green-700 transition-colors">Submit Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;