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
  serverTimestamp,
} from "firebase/firestore";
import { validarReserva, estadosReserva } from "./firebaseConfig.js";

const RESERVAS_COLLECTION = "reservas";

/**
 * Crear una nueva reserva en Firestore con validaciones
 */
export async function crearReserva(datos) {
  try {
    // Validar datos
    const validacion = validarReserva(datos);
    if (!validacion.valido) {
      throw new Error(validacion.errores.join(", "));
    }

    // Preparar documento
    const docData = {
      ...datos,
      estado: estadosReserva.PENDIENTE,
      fechaCreacion: serverTimestamp(),
      fechaActualizacion: serverTimestamp(),
    };

    // Crear documento
    const docRef = await addDoc(collection(db, RESERVAS_COLLECTION), docData);
    console.log("✅ Reserva creada con ID:", docRef.id);

    return {
      exito: true,
      id: docRef.id,
      mensaje: "Reserva creada exitosamente",
    };
  } catch (error) {
    console.error("❌ Error creando reserva:", error);
    return {
      exito: false,
      error: error.message || "Error al crear la reserva",
    };
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
      const data = doc.data();
      reservas.push({
        id: doc.id,
        ...data,
        // Convertir Timestamp a formato legible
        fechaCreacion: data.fechaCreacion?.toDate?.() || new Date(),
      });
    });

    return reservas.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
  } catch (error) {
    console.error("❌ Error obteniendo reservas:", error);
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
    console.error("❌ Error obteniendo reservas por email:", error);
    throw error;
  }
}

/**
 * Obtener reservas por estado
 */
export async function obtenerReservasPorEstado(estado) {
  try {
    const q = query(
      collection(db, RESERVAS_COLLECTION),
      where("estado", "==", estado)
    );
    const querySnapshot = await getDocs(q);
    const reservas = [];

    querySnapshot.forEach((doc) => {
      reservas.push({ id: doc.id, ...doc.data() });
    });

    return reservas;
  } catch (error) {
    console.error("❌ Error obteniendo reservas por estado:", error);
    throw error;
  }
}

/**
 * Actualizar una reserva
 */
export async function actualizarReserva(id, datos) {
  try {
    const docRef = doc(db, RESERVAS_COLLECTION, id);

    // Agregar timestamp de actualización
    const datosActualizados = {
      ...datos,
      fechaActualizacion: serverTimestamp(),
    };

    await updateDoc(docRef, datosActualizados);
    console.log("✅ Reserva actualizada:", id);

    return {
      exito: true,
      mensaje: "Reserva actualizada exitosamente",
    };
  } catch (error) {
    console.error("❌ Error actualizando reserva:", error);
    return {
      exito: false,
      error: error.message,
    };
  }
}

/**
 * Cambiar estado de una reserva
 */
export async function cambiarEstadoReserva(id, nuevoEstado) {
  try {
    const estadosValidos = Object.values(estadosReserva);

    if (!estadosValidos.includes(nuevoEstado)) {
      throw new Error(
        `Estado inválido. Estados permitidos: ${estadosValidos.join(", ")}`
      );
    }

    return await actualizarReserva(id, { estado: nuevoEstado });
  } catch (error) {
    console.error("❌ Error cambiando estado:", error);
    return {
      exito: false,
      error: error.message,
    };
  }
}

/**
 * Eliminar una reserva
 */
export async function eliminarReserva(id) {
  try {
    await deleteDoc(doc(db, RESERVAS_COLLECTION, id));
    console.log("✅ Reserva eliminada:", id);

    return {
      exito: true,
      mensaje: "Reserva eliminada exitosamente",
    };
  } catch (error) {
    console.error("❌ Error eliminando reserva:", error);
    return {
      exito: false,
      error: error.message,
    };
  }
}

/**
 * Contar reservas por estado
 */
export async function contarReservasPorEstado() {
  try {
    const reservas = await obtenerReservas();
    const conteo = {};

    Object.values(estadosReserva).forEach((estado) => {
      conteo[estado] = reservas.filter((r) => r.estado === estado).length;
    });

    conteo.total = reservas.length;
    return conteo;
  } catch (error) {
    console.error("❌ Error contando reservas:", error);
    throw error;
  }
}
