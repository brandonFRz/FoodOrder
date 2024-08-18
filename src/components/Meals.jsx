import MealItem from "./MealItem";
import useHttp from "../hook/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  //Usa el custom hook para hacer las peticiones de los platillos
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  //Muestra un mensaje de carga mientras busca los platillos
  if (isLoading) {
    return <p className="center">Buscando platillos...</p>;
  }

  //Muestra un mensaje de error si hay algún problema al cargar los platillos
  if (error) {
    return <Error title="Fallo al buscar los platillos" message={error} />;
  }

  //Renderizar la lista de platillos
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
