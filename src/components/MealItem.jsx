import { useContext } from "react"
import Button from "./UI/Button"
import CartContext from "../store/CartContext"


export default function MealItem({meal}) {
  const cartCtx = useContext(CartContext)

  //Manejar la adición del artículo al carrito
  function handleMealToCart(){
    cartCtx.addItem(meal)
  }

  //Renderiza la imagen del articulo con su nombre, precio y descripción
  return (
    <li id='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
            <h3>{meal.name}</h3>
            <p id='meal-item-price'>${meal.price}</p>
            <p id='meal-item-description'>{meal.description}</p>
        </div>
        <p id='meal-item-action'>
            <Button onClick={handleMealToCart} textOnly={false}>Agregar al carrito</Button>
        </p>
      </article>
    </li>
  )
}
