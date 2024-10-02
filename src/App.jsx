import React, { useState, useEffect } from 'react';

const API_URL = 'https://posts-demo-server-sigma-schoolsc1.replit.app/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const fetchPosts = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // creating a new post
  const createPost = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author })
    })
      .then(res => res.json())
      .then(fetchPosts) // fetch all posts again AFTER creating a post
      .catch(err => console.error(err));

    setTitle('');
    setContent('');
    setAuthor('');
  };
  
  return (
    <div>
      <form onSubmit={createPost}>
        <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
        <br />
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <br />
        <button type="submit">Create Post</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <pre>{post.content}</pre>
            <p>Author: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}