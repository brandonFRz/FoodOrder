import { useCallback, useEffect, useState } from "react";

//// Función para enviar la petición HTTP.
async function sendHttpRequest(url, config) {
  //Utiliza la función fetch para realizar la petición y obtiene los datos en formato JSON
  const response = await fetch(url, config);
  const resData = await response.json();

  //Si la respuesta no es exitosa se lanza un error
  if (!response.ok) {
    throw new Error(resData.message || "Fallo al enviar la request");
  }
  return resData;
}

// Custom Hook  para manejar peticiones HTTP.
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //Función para limpiar los datos y restablecer los valores iniciales
  function clearData() {
    setData(initialData);
  }

  //Utiliza useCallback para memorizar la función y evitar recrearla en cada render
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Algo fue mal!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  //useEffect para enviar automáticamente la petición en ciertos casos
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
