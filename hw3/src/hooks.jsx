import React, { useState, useEffect } from 'react';
import withColor from './hoc';
import CounterLifecycleComponent from './lifecycle';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>

      <CounterLifecycleComponent count={count} />
    </div>
  );
};

const CounterAppWithColor = withColor(CounterApp);

export default CounterAppWithColor;
