import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ isDark }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const toggleRole = (email) => {
    const updatedUsers = users.map(user => 
      user.email === email ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="min-h-screen p-10 md:p-20" style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-20">
          <h2 className="text-[60px] font-black tracking-tighter leading-none">System <span className="text-red-600">Admin</span></h2>
          <Link to="/home" className="text-[20px] font-bold border-b-4 border-red-600 hover:text-red-600 transition-all">exit</Link>
        </div>

        <div className="overflow-x-auto rounded-[40px] border-4 border-zinc-800 p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-zinc-800 text-[20px]">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 text-[18px]">
                  <td className="p-4 font-bold">{user.name}</td>
                  <td className="p-4 opacity-60">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1 rounded-full text-sm font-black ${user.role === 'admin' ? 'bg-red-600' : 'bg-zinc-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleRole(user.email)} className="px-6 py-2 rounded-full font-black bg-white text-black hover:bg-green-600 hover:text-white transition-all">Toggle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;