import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const RESERVAS_COLLECTION = "reservas";

/**
 * Guardar una nueva reserva en Firestore
 */
export async function crearReserva(datos) {
  try {
    const docRef = await addDoc(collection(db, RESERVAS_COLLECTION), {
      ...datos,
      fechaCreacion: new Date(),
      estado: "pendiente",
    });
    console.log("Reserva creada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creando reserva:", error);
    throw error;
  }
}

/**
 * Obtener todas las reservas
 */
export async function obtenerReservas() {
  try {
    const q = query(collection(db, RESERVAS_COLLECTION));
    const querySnapshot = await getDocs(q);
    const reservas = [];
    querySnapshot.forEach((doc) => {
      reservas.push({ id: doc.id, ...doc.data() });
    });
    return reservas;
  } catch (error) {
    console.error("Error obteniendo reservas:", error);
    throw error;
  }
}

/**
 * Obtener reservas por email
 */
export async function obtenerReservasPorEmail(email) {
  try {
    const q = query(
      collection(db, RESERVAS_COLLECTION),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);
    const reservas = [];
    querySnapshot.forEach((doc) => {
      reservas.push({ id: doc.id, ...doc.data() });
    });
    return reservas;
  } catch (error) {
    console.error("Error obteniendo reservas:", error);
    throw error;
  }
}

/**
 * Actualizar estado de una reserva
 */
export async function actualizarReserva(id, datos) {
  try {
    const docRef = doc(db, RESERVAS_COLLECTION, id);
    await updateDoc(docRef, datos);
    console.log("Reserva actualizada:", id);
  } catch (error) {
    console.error("Error actualizando reserva:", error);
    throw error;
  }
}

/**
 * Eliminar una reserva
 */
export async function eliminarReserva(id) {
  try {
    await deleteDoc(doc(db, RESERVAS_COLLECTION, id));
    console.log("Reserva eliminada:", id);
  } catch (error) {
    console.error("Error eliminando reserva:", error);
    throw error;
  }
}
