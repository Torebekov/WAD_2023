import React from 'react';
import { Link } from 'react-router-dom';

const Feed = ({ posts, addPost, onLike, onDislike, onEdit }) => {
  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: 'Post Title',
      content: 'Post content',
      likes: 0,
      dislikes: 0,
    };
    addPost(newPost);
  };

  return (
    <div className="feed">
      <h2>Feed</h2>
      <button onClick={handleAddPost}>Add Post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h3>
          <p>Likes: {post.likes}</p>
          <p>Dislikes: {post.dislikes}</p>
          <button onClick={() => onLike(post.id)}>Like</button>
          <button onClick={() => onDislike(post.id)}>Dislike</button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
