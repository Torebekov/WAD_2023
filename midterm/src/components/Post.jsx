import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ posts, onLike, onDislike, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const postId = window.location.pathname.split("/").pop();

  const post = posts.find((p) => p.id === parseInt(postId));

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post ? post.title : "");
  const [editedContent, setEditedContent] = useState(post ? post.content : "");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(post.id, editedTitle, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(post.id);
    navigate("/");
  };

  return (
    <div>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>
            <button onClick={() => onLike(post.id)}>Like ({post.likes})</button>
            <button onClick={() => onDislike(post.id)}>
              Dislike ({post.dislikes})
            </button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>

          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : null}
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default Post;
