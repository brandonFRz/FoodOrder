//Este componente representa un artículo individual en el carrito, mostrando su nombre, cantidad y precio total.

export default function CartItem({
  name,
  quantity,
  price,
  OnIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X ${price}
      </p>
      <p className="cart-items-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={OnIncrease}>+</button>
      </p>
    </li>
  );
}
