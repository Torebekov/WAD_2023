import React from 'react';

const withColor = (Component) => {
  const colors = ['red', 'green', 'blue'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (props) => (
    <div style={{ color: randomColor }}>
      <Component {...props} />
    </div>
  );
};

export default withColor;
