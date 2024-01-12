import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import { useEffect, useState } from 'react';

// Get all posts from the posts folder
const postImports = import.meta.glob('./posts/*.jsx');

const LazyPost = (path) => {
  const PostComponent = React.lazy(postImports[path]);
  return <PostComponent />;
};
function Posts() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    const loadPostsData = async () => {
      const posts = await Promise.all(
        Object.entries(postImports).map(async ([path]) => {
          const module = await postImports[path]();
          const name = path.match(/\.\/posts\/(.*)\.jsx$/)[1];
          const date = module.postMetadata ? module.postMetadata.date : "Unknown Date";
          const title = module.postMetadata ? module.postMetadata.title : "Unknown Title";
          return { name, date, title };
        })
      );
      setPostsData(posts.reverse()); // Reverse so newest posts are first
    };

    loadPostsData();
  }, []);

  return (
    <div className="w-4/5">
      {postsData.map(({ name, date, title }, index) => (
        <div key={index}>
          <Link to={`/posts/${name}`} className="link">
            {title}
          </Link>
          <h1 className='text-sm'>
            {date}
          </h1>
        </div>
      ))}
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <div className='w-full h-screen absolute'>
        <header className='ml-16 mt-16 flex flex-col'>
          <h1>c.banman blog</h1>
          <div className='flex flex-row'>
            <Link to='/' className='link'>home</Link>
            <Link to='/posts' className='link'>posts</Link>
            <a href='https://github.com/colebanman' target="_blank" rel="noopener noreferrer" className='link'>github</a>
          </div>
        </header>

        <div className='ml-16 mt-8'>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/posts' element={<Posts />} />
              {Object.entries(postImports).map(([path]) => {
                const name = path.match(/\.\/posts\/(.*)\.jsx$/)[1];
                return <Route key={name} path={`/posts/${name}`} element={LazyPost(path)} />;
              })}
            </Routes>
          </Suspense>
        </div>

              
        <footer className='ml-16 mt-16 flex flex-col'>
          <Link to='/' className='link'>c.banman blog - 2023</Link>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
