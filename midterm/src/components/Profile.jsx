import React, { useState } from 'react';

const Profile = ({ user, posts, onUsernameChange, onBioChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedBio, setEditedBio] = useState(user.bio);

  const handleSave = () => {
    onSave(editedUsername, editedBio);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        {isEditing ? (
          <>
            <label>Username: </label>
            <input
              type="text"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
            />
          </>
        ) : (
          <p>Username: {user.username}</p>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <label>Bio: </label>
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
            />
          </>
        ) : (
          <p>Bio: {user.bio}</p>
        )}
      </div>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      <h3>Your Posts:</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
