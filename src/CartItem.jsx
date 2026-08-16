import { memo } from 'react';

export const CartItem = memo(({ item, index, onRemove }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '5px 0' }}>
      <span>{item.name} - ${item.price}</span>
      <button onClick={() => onRemove(index)}>Remove</button>
    </div>
  );
});