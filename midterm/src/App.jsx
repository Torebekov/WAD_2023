import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({
    username: "Arman",
    bio: "KBTU student",
  });

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const onLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const onDislike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, dislikes: post.dislikes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const onEdit = (postId, newTitle, newContent) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, title: newTitle, content: newContent };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const onDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const onUsernameChange = (newUsername) => {
    setUser({ ...user, username: newUsername });
  };

  const onBioChange = (newBio) => {
    setUser({ ...user, bio: newBio });
  };

  const onSave = (newUsername, newBio) => {
    setUser({ ...user, username: newUsername, bio: newBio });
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Feed
                posts={posts}
                addPost={addPost}
                onLike={onLike}
                onDislike={onDislike}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                posts={posts}
                onUsernameChange={onUsernameChange}
                onBioChange={onBioChange}
                onSave={onSave}
              />
            }
          />
          <Route
            path="/post/:id"
            element={
              <Post
                posts={posts}
                onLike={onLike}
                onDislike={onDislike}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
