# Firebase Configuration Guide - Checklist Final

## ✅ Completado hasta ahora

1. **firebaseConfig.js** - Configuración centralizada con:

   - ✅ Reglas de seguridad de Firestore
   - ✅ Función de validación (validarReserva)
   - ✅ Datos de visitas disponibles
   - ✅ Estados de reservas

2. **firebase.js** - Inicialización de Firebase con:

   - ✅ Autenticación habilitada
   - ✅ Firestore inicializado
   - ✅ Persistencia offline habilitada
   - ✅ Timestamps del servidor

3. **reservasService.js** - Servicio de CRUD con:

   - ✅ Validación antes de guardar
   - ✅ Manejo de errores estructurado
   - ✅ Múltiples métodos de consulta

4. **firestore.rules** - Reglas de seguridad con:

   - ✅ Validación en create (nombre, email, telefono, personas, visita)
   - ✅ Lectura solo para usuarios autenticados
   - ✅ Configuración y visitas públicas
   - ✅ Control de admin

5. **firebase.json** - Configuración de hosting:
   - ✅ Directorio público = "dist" (salida de Astro)
   - ✅ Headers de caché para assets
   - ✅ Referencias a firestore.rules y firestore.indexes.json

## 🔄 Próximos pasos para producción

### Paso 1: Copiar archivo .env

```bash
# Copiar el template
Copy-Item .env.example .env

# Editar .env con tus credenciales reales de Firebase Console:
# - VITE_FIREBASE_API_KEY
# - VITE_FIREBASE_AUTH_DOMAIN
# - VITE_FIREBASE_PROJECT_ID
# - VITE_FIREBASE_STORAGE_BUCKET
# - VITE_FIREBASE_MESSAGING_SENDER_ID
# - VITE_FIREBASE_APP_ID
# - VITE_FIREBASE_MEASUREMENT_ID
```

### Paso 2: Desplegar reglas de Firestore

```bash
# Desplegar solo las reglas (sin afectar el hosting)
firebase deploy --only firestore:rules

# O desplegar todo (reglas + indexes + hosting)
firebase deploy
```

### Paso 3: Verificar índices

```bash
# Los índices se crearán automáticamente cuando:
# - Se ejecuta la primera consulta que requiere el índice, O
# - Se deploy manualmente

firebase deploy --only firestore:indexes
```

### Paso 4: Pruebas locales

```bash
# 1. Instalar dependencias (si es necesario)
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Ir a http://localhost:3000
# 4. Probar crear una reserva
# 5. Verificar en Firebase Console > Firestore que se creó
```

### Paso 5: Pruebas de validación

```
Prueba cada validación:
- Nombre vacío → debe rechazar
- Email inválido → debe rechazar
- Teléfono con menos de 9 dígitos → debe rechazar
- Personas: 0, 7+ → debe rechazar
- Sin visita seleccionada → debe rechazar
```

### Paso 6: Desplegar a producción

```bash
# Build y deploy
npm run build
npm run deploy

# O manualmente
npm run build
firebase deploy
```

## 📋 Validación de conectividad

Para verificar que todo está conectado correctamente:

1. **ContactForm.astro** debe:

   - Importar crearReserva de reservasService.js ✅
   - Llamar validarReserva internamente ✅
   - Guardar en Firestore con serverTimestamp ✅

2. **admin.astro** debe:

   - Importar obtenerReservas, actualizarReserva, etc. ✅
   - Mostrar datos en tiempo real ✅
   - Permitir cambiar estado de reservas ✅

3. **firebase.js** debe:
   - Usar firebaseConfig de firebaseConfig.js ✅
   - Habilitar persistencia offline ✅
   - Exportar db, auth, app, analytics ✅

## 🔐 Verificación de seguridad

Las reglas de Firestore permiten:

- ✅ Crear reservas con validación automática
- ✅ Leer reservas solo autenticado
- ✅ Actualizar reservas autenticado
- ✅ Leer config/visitas públicamente
- ✅ Admin control completo

## ⚠️ Importante

- **NO commitar .env** a Git (ya está en .gitignore)
- **Verificar .gitignore** incluye: .env, .env.local, dist/, .astro/
- **Firestore en modo gratuito** tiene limitaciones: 50,000 lecturas/día
- **Activar SSL** en producción (Firebase Hosting lo hace automáticamente)

## 📞 Contacto/Soporte

Si tienes problemas después de desplegar:

1. Revisar Firebase Console > Logs para errores
2. Verificar que los valores en .env sean correctos
3. Confirmar que las reglas de Firestore fueron desplegadas
4. Revisar console.log del navegador para errores frontend
