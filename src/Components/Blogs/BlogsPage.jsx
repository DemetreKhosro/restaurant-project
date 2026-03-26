import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BlogsPage({ isDark, loggedUser }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('supra_blogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [newPost, setNewPost] = useState({ title: '', desc: '', img: '' });
  const isAdmin = loggedUser?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    localStorage.setItem('supra_blogs', JSON.stringify(posts));
  }, [posts]);

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlogEntry = { 
      ...newPost, 
      id: Date.now(), 
      likes: 0, 
      likedBy: [] 
    };
    setPosts([newBlogEntry, ...posts]);
    setNewPost({ title: '', desc: '', img: '' });
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Delete this post?")) {
      setPosts(posts.filter(blog => blog.id !== id));
    }
  };

  const handleLike = (id) => {
    const userEmail = loggedUser?.email;
    if (!userEmail) return;

    setPosts(posts.map(blog => {
      if (blog.id === id) {
        const likedBy = blog.likedBy || [];
        const alreadyLiked = likedBy.includes(userEmail);
        
        if (alreadyLiked) {
          return { 
            ...blog, 
            likes: Math.max(0, blog.likes - 1), 
            likedBy: likedBy.filter(email => email !== userEmail) 
          };
        } else {
          return { 
            ...blog, 
            likes: (blog.likes || 0) + 1, 
            likedBy: [...likedBy, userEmail] 
          };
        }
      }
      return blog;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row transition-all duration-500" 
         style={{ backgroundColor: isDark ? "black" : "white", color: isDark ? "white" : "black" }}>
      
      <div className="flex-1 p-6 md:p-10 lg:p-20 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-20 gap-4">
            <h2 className="text-[50px] md:text-[80px] lg:text-[100px] font-black tracking-tighter italic leading-none">the <span className="text-green-600">blog page</span></h2>
            <Link to="/home" className="text-[18px] md:text-[20px] font-bold border-b-4 border-green-600 hover:text-green-600 transition-all">back home</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {posts.length === 0 ? (
              <p className="opacity-40 italic text-xl">No stories published yet</p>
            ) : (
              posts.map((blog) => (
                <div key={blog.id} className="group relative">
                  <div className="overflow-hidden rounded-[40px] border-4 border-zinc-800 mb-6 bg-zinc-900">
                    <img 
                      src={blog.img} 
                      alt="" 
                      className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                    />
                  </div>
                  
                  {isAdmin && (
                    <button onClick={() => handleDeleteBlog(blog.id)} className="absolute top-4 right-4 bg-red-600 text-white w-10 h-10 rounded-full font-black z-10 hover:scale-110 transition-all">✕</button>
                  )}

                  <div className="space-y-4 px-2">
                    <h3 className="text-[28px] md:text-[32px] font-black leading-tight tracking-tighter uppercase">{blog.title}</h3>
                    <p className="opacity-60 text-[16px] md:text-[18px] line-clamp-3 leading-relaxed">{blog.desc}</p>
                    
                    <button 
                      onClick={() => handleLike(blog.id)}
                      className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all active:scale-90 font-bold ${
                        blog.likedBy?.includes(loggedUser?.email) 
                        ? "bg-green-600 border-green-600 text-white" 
                        : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      <span>{blog.likedBy?.includes(loggedUser?.email) ? '♥' : '♡'}</span> {blog.likes}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="w-full lg:w-112.5 border-t-4 lg:border-t-0 lg:border-l-4 border-zinc-800 p-6 md:p-10 flex flex-col lg:sticky lg:top-0 lg:h-screen bg-zinc-900/20 backdrop-blur-md">
          <div className="space-y-6">
            <h3 className="text-[35px] md:text-[40px] font-black italic tracking-tighter">create <span className="text-green-600">post</span></h3>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <input required placeholder="Story title" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent focus:border-green-600 outline-none" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
              <input required placeholder="Image URL" className="w-full p-4 rounded-full border-2 border-zinc-800 bg-transparent focus:border-green-600 outline-none" value={newPost.img} onChange={e => setNewPost({...newPost, img: e.target.value})} />
              <textarea required placeholder="Write the story..." className="w-full p-6 rounded-[30px] border-2 border-zinc-800 bg-transparent h-48 focus:border-green-600 outline-none resize-none" value={newPost.desc} onChange={e => setNewPost({...newPost, desc: e.target.value})} />
              <button type="submit" className="w-full py-5 bg-green-600 text-white font-black rounded-full text-xl uppercase hover:bg-green-700 transition-all">Publish</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogsPage;