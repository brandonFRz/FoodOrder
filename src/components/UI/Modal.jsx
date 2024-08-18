import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();//Crea una referencia para el elemento dialog.

  //Se ejecuta al cambiar la prop open.
  useEffect(() => {
    const modal = dialog.current; //Accedemos al elemento usando la referencia

    //Si open es true mostramos el modal
    if (open) {
      modal.showModal();
    }

    //Cuando el componente se desmonta el efecto se limpia
    return () => modal.close();
  }, [open]);

  // Usamos createPortal para renderizar el modal fuera del árbol DOM principal, en un contenedor con id 'modal'
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')// El modal se monta en el elemento con id 'modal' en el DOM
  );
}