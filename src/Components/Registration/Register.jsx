import { useState } from 'react';

function Register({ isDark, isOpen, onClose, setLoggedUser }) {
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' })

  if (!isOpen) {
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

    if (isLogin) {
      const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password)
      if (user) { 
        setLoggedUser(user)
        onClose()
        alert(`Logged in as ${user.role}`)
      } else { 
        alert("Invalid credentials")
      }
    } else {
      if (existingUsers.some(u => u.email === formData.email)) {
        return alert("User exists")
      }
      
      const newUser = { ...formData, role: formData.email.includes('admin') ? 'admin' : 'user' }
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))
      
      setIsLogin(true);
      alert("Account created! You can now login.")
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-25 flex items-center justify-center p-6 backdrop-blur-md" onClick={onClose}>
      <div className="p-16 rounded-[50px] shadow-2xl max-w-2xl w-full space-y-10 transition-all scale-105" style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black", border: `4px solid ${isDark ? "#333" : "#eee"}` }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h3 className="text-[40px] font-black tracking-tighter">{isLogin ? 'Welcome Back' : 'Join the Supra'}</h3>
          <button onClick={onClose} className="text-[50px] leading-none hover:text-green-600 cursor-pointer">&times;</button>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="Full Name" required className="w-full p-6 rounded-full border-4 border-gray-200 dark:border-zinc-800 bg-transparent text-[20px] focus:border-green-600 outline-none transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />}
          <input type="email" placeholder="Email Address" required className="w-full p-6 rounded-full border-4 border-gray-200 dark:border-zinc-800 bg-transparent text-[20px] focus:border-green-600 outline-none transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full p-6 rounded-full border-4 border-gray-200 dark:border-zinc-800 bg-transparent text-[20px] focus:border-green-600 outline-none transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="w-full p-7 bg-green-600 text-white text-[24px] font-black rounded-full hover:bg-green-700 hover:scale-[1.02] transition-all cursor-pointer shadow-xl shadow-green-900/20">{isLogin ? 'Login' : 'Create Account'}</button>
        </form>

        <p className="text-center text-[20px] font-medium opacity-70">
          {isLogin ? "Don't have an account?" : "Already a member?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-green-600 underline font-bold cursor-pointer ml-2">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;