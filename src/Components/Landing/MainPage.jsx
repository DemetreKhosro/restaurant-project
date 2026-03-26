import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MainPage({ loggedUser, setLoggedUser }) {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('/cuisine.png');
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedUser('');
    navigate('/');
  };

  const toggleGreen = () => {
    setImageSrc(prev => prev === '/greencuisine.png' ? '/cuisine.png' : '/greencuisine.png');
  };

  const toggleBlack = () => {
    setImageSrc(prev => prev === '/cuisinepepper.png' ? '/cuisine.png' : '/cuisinepepper.png');
  };

  return (
    <div style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black", transition: "all 0.5s ease" }} className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-opacity-10" style={{ backgroundColor: isDark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)", borderColor: isDark ? "white" : "black" }}>
        <div className="flex flex-row justify-between items-center p-10 px-6 md:px-14 max-w-400 mx-auto">
          <Link to="/home" className="text-[24px] md:text-[40px] font-black tracking-tighter cursor-pointer text-nowrap">sakartvelo <span className='text-green-600'>supra</span></Link>
          <div className="hidden lg:flex items-center gap-x-6 text-[18px] font-bold">
            <Link to="/menu" className="hover:text-green-600 transition-all cursor-pointer text-nowrap">menu</Link>
            <Link to='/reservations' className="hover:text-green-600 transition-all cursor-pointer text-nowrap">reservations</Link>
            {/* <Link to="/about" className="hover:text-green-600 transition-all cursor-pointer text-nowrap">about</Link> */}
            <Link to="/blogs" className="hover:text-green-600 transition-all cursor-pointer text-nowrap">blogs</Link>
            <div className="flex flex-col items-end leading-tight border-l-2 border-green-600 pl-4 ml-2 min-w-fit">
              <span className="text-green-600 font-black uppercase text-[15px] whitespace-nowrap">{loggedUser?.name}</span>
              <span className="opacity-60 text-[12px] whitespace-nowrap">{loggedUser?.role === 'admin' ? 'system admin' : loggedUser?.email}</span>
            </div>
            {loggedUser?.role === 'admin' && (
              <Link to="/dashboard" className="px-4 py-2 bg-red-600 text-white rounded-full text-[13px] hover:scale-105 transition-all font-black whitespace-nowrap">dashboard</Link>
            )}
            <button onClick={handleLogout} className="transition-all hover:text-red-500 hover:scale-110 font-black border-2 border-current px-4 py-2 rounded-full text-[15px] whitespace-nowrap">logout</button>
            <div className="flex gap-3 ml-2">
              <button onClick={() => setIsDark(true)} className="text-[22px] opacity-50 hover:opacity-100 cursor-pointer">☽</button>
              <button onClick={() => setIsDark(false)} className="text-[22px] opacity-50 hover:opacity-100 cursor-pointer">☀️</button>
            </div>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[40px] cursor-pointer">{isOpen ? '✕' : '☰'}</button>
        </div>
        {isOpen && (
          <div className="lg:hidden flex flex-col items-center gap-6 pb-14 text-[22px] font-bold">
            <div className="flex flex-col items-center mb-2 text-center">
              <span className="text-green-600 font-black uppercase text-[24px]">{loggedUser?.name}</span>
              <span className="opacity-60 text-[16px]">{loggedUser?.role === 'admin' ? 'system admin' : loggedUser?.email}</span>
            </div>
            <Link to="/menu" onClick={() => setIsOpen(false)} className="hover:text-green-600">menu</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-green-600">about</Link>
            {loggedUser?.role === 'admin' && <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-red-500">dashboard</Link>}
            <button onClick={handleLogout} className="text-red-500 border-2 border-red-500 px-8 py-2 rounded-full">logout</button>
          </div>
        )}
      </nav>
      <main className="grow flex flex-col">
        <section className="min-h-screen flex items-center justify-center pt-60 pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-400 w-full flex flex-col lg:flex-row justify-between items-center gap-20 lg:gap-32">
            <div className="flex flex-col justify-center space-y-10 lg:w-[45%]">
              <h2 className="text-[55px] md:text-[80px] lg:text-[100px] font-black leading-[0.95] tracking-tight text-center lg:text-left">experience <br/> authentic <span className="block text-green-600 italic font-serif">georgian flavors</span></h2>
              <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center lg:justify-start">
                <Link to="/menu" className="px-12 py-5 bg-green-600 text-white text-[20px] font-black rounded-full transition-all hover:bg-green-700 hover:scale-110 shadow-xl text-center">view menu</Link>
                <Link to='/reservations' className="px-12 py-5 border-4 border-green-600 text-green-600 text-[20px] font-black rounded-full transition-all hover:bg-green-600 hover:text-white hover:scale-110">book a table</Link>
              </div>
            </div>
            <div className="lg:w-[55%] flex flex-col items-center gap-8">
              <div className="relative group w-full">
                <div className="absolute -inset-4 bg-green-600 rounded-[50px] opacity-20 blur-3xl transition duration-1000"></div>
                <img src={imageSrc} alt="cuisine" className="relative w-full h-auto rounded-[45px] shadow-2xl transition-transform duration-700 hover:scale-[1.05]" />
              </div>
              <div className="flex gap-4">
                <button onClick={toggleBlack} className="w-12 h-12 bg-black rounded-full border-2 border-gray-400 hover:scale-110 transition-all shadow-lg cursor-pointer"></button>
                <button onClick={toggleGreen} className="w-12 h-12 bg-green-600 rounded-full border-2 border-gray-400 hover:scale-110 transition-all shadow-lg cursor-pointer"></button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-32 px-6 md:px-14 max-w-7xl mx-auto border-t border-opacity-10" style={{ borderColor: isDark ? "white" : "black" }}>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <h2 className="text-[60px] md:text-[80px] font-black tracking-tighter leading-none">
                our <span className="text-green-600 italic font-serif">story</span>
              </h2>
            </div>
            <div className="lg:w-2/3 space-y-8 text-[18px] md:text-[22px] leading-relaxed opacity-80">
              <p>Sakartvelo Supra was born from a desire to bring the true essence of Georgian hospitality to the world. A "supra" is more than just a meal; it is a traditional Georgian feast, a celebration of community, food, and wine.</p>
              <p>Founded in 2026, we aim to honor ancient culinary traditions while utilizing fresh, local ingredients. Our recipes have been passed down through generations, ensuring every bite is a journey to the heart of Tbilisi.</p>
              <p>From our hand-folded khinkali to our aromatic stews, we invite you to sit at our table and experience the warmth and flavors of Georgia.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-10 px-6 md:px-14 border-t border-opacity-10" style={{ borderColor: isDark ? "white" : "black" }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 font-bold text-[14px]">
          <p>sakartvelo supra 2026. all rights reserved.</p>
          <div className="flex gap-8 uppercase tracking-widest">
            <button className="hover:text-green-600 transition-all">facebook</button>
            <button className="hover:text-green-600 transition-all">instagram</button>
            <button className="hover:text-green-600 transition-all">twitter</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;