import { useState } from 'react';
import { Link } from 'react-router-dom';

function Reservations({ isDark, loggedUser }) {
  const [resData, setResData] = useState({
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });
  const [booked, setBooked] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Reservation Set:", { ...resData, user: loggedUser.name });
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center" style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}>
        <h2 className="text-[60px] font-black italic mb-4">Gaumarjos!</h2>
        <p className="text-2xl opacity-80 mb-10">Your table for {resData.guests} is set for {resData.date} at {resData.time}.</p>
        <Link to="/home" className="px-10 py-4 bg-green-600 text-white font-black rounded-full uppercase">back to home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}>
      <div className="md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
        <h2 className="text-[60px] md:text-[100px] font-black tracking-tighter leading-none mb-6">
          reserve a <span className="text-green-600 italic">table</span>
        </h2>
        <p className="text-xl opacity-60 max-w-md">
          Join us for an authentic Georgian Supra. Whether it's a quiet dinner or a large celebration, we have a spot for you.
        </p>
      </div>

      <div className="md:w-1/2 p-10 flex items-center justify-center bg-zinc-900/10">
        <form onSubmit={handleBooking} className="w-full max-w-md space-y-6">
          <div>
            <label className="block mb-2 font-bold uppercase text-xs opacity-50">Date</label>
            <input required type="date" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent font-bold" 
              onChange={e => setResData({...resData, date: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold uppercase text-xs opacity-50">Time</label>
              <select required className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent font-bold"
                onChange={e => setResData({...resData, time: e.target.value})}>
                <option value="">Select</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold uppercase text-xs opacity-50">Guests</label>
              <input required type="number" min="1" max="20" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent font-bold" 
                value={resData.guests} onChange={e => setResData({...resData, guests: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-bold uppercase text-xs opacity-50">Special Notes</label>
            <textarea placeholder="Any allergies or special occasions?" className="w-full p-4 rounded-[20px] border-2 border-zinc-800 bg-transparent h-32" 
              onChange={e => setResData({...resData, notes: e.target.value})} />
          </div>

          <button type="submit" className="w-full py-5 bg-green-600 text-white font-black rounded-full text-xl uppercase hover:bg-green-700 transition-all">
            confirm booking
          </button>
          
          <Link to="/home" className="block text-center font-bold opacity-50 hover:opacity-100 transition-all">cancel</Link>
        </form>
      </div>
    </div>
  );
}

export default Reservations;