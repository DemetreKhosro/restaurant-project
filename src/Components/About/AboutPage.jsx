import { useState } from 'react';

import { Link } from 'react-router-dom';



function AboutPage({ isDark }) {

  const [isDarkTheme, setIsDarkTheme] = useState(isDark);



  return (

    <div style={{ backgroundColor: isDarkTheme ? "black" : "white", color: isDarkTheme ? "white" : "black", transition: "all 0.5s ease" }} className="min-h-screen flex flex-col">

      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md" style={{ backgroundColor: isDarkTheme ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)" }}>

        <div className="flex justify-between items-center p-10 max-w-7xl mx-auto">

          <Link to="/home" className="text-[24px] font-black tracking-tighter">sakartvelo <span className='text-green-600'>supra</span></Link>

          <Link to="/home" className="text-[16px] font-bold border-b-2 border-green-600">back</Link>

        </div>

      </nav>



      <main className="grow pt-40 pb-20 px-10 max-w-5xl mx-auto">

        <h2 className="text-[60px] md:text-[80px] font-black tracking-tighter leading-none mb-10">

          our <span className="text-green-600 italic font-serif">story</span>

        </h2>

       

        <div className="space-y-8 text-[18px] md:text-[20px] leading-relaxed opacity-80">

          <p>Sakartvelo Supra was born from a desire to bring the true essence of Georgian hospitality to the world. A "supra" is more than just a meal; it is a traditional Georgian feast, a celebration of community, food, and wine.</p>

          <p>Founded in 2026, we aim to honor ancient culinary traditions while utilizing fresh, local ingredients. Our recipes have been passed down through generations, ensuring every bite is a journey to the heart of Tbilisi.</p>

          <p>From our hand-folded khinkali to our aromatic stews, we invite you to sit at our table and experience the warmth and flavors of Georgia.</p>

        </div>

      </main>



      <footer className="border-t border-zinc-700/50 p-10 mt-auto text-center" style={{ backgroundColor: isDarkTheme ? "black" : "white" }}>

        <p className="opacity-50 font-bold">2026 Sakartvelo Supra. Authentic Georgian Taste</p>

      </footer>

    </div>

  );

}



export default AboutPage;