# 🔧 Configuración de Firebase

## Paso 1: Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear Proyecto"
3. Nombre: `checkgranada-project`
4. Habilita Google Analytics (opcional)
5. Crea el proyecto

## Paso 2: Configurar Firestore Database

1. En la consola de Firebase, ve a **Build > Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona ubicación: `eur3` (Europa)
4. Modo de seguridad: **Comenzar en modo prueba** (luego configuraremos reglas)
5. Crea la base de datos

## Paso 3: Obtener Credenciales de Firebase

1. Ve a **Project Settings** (engranaje en la esquina superior izquierda)
2. Copia tu **Project ID** (ej: `checkgranada-project`)
3. En la sección "Your apps", haz clic en el icono web `</>`
4. Copia la configuración de Firebase que aparece

## Paso 4: Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto (copia desde `.env.example`)
2. Reemplaza los valores con los de tu proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=AIzaSyD... (tu API key)
VITE_FIREBASE_AUTH_DOMAIN=checkgranada-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=checkgranada-project
VITE_FIREBASE_STORAGE_BUCKET=checkgranada-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Paso 5: Configurar Reglas de Firestore

En **Firestore > Rules**, reemplaza con:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite lectura y escritura de reservas
    match /reservas/{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **NOTA**: Estas reglas son para desarrollo. En producción, implementa validaciones de seguridad.

## Paso 6: Configurar Hosting

1. En tu terminal, ejecuta:

```bash
firebase init hosting
```

2. Selecciona el proyecto
3. Public directory: `dist`
4. Single-page app: `yes`
5. Overwrite `firebase.json`: `no` (ya existe)

## Paso 7: Desplegar

```bash
npm run build
firebase deploy
```

Tu sitio estará en: `https://checkgranada-project.web.app`

## 📱 Funcionalidades Integradas

✅ Guardar reservas en Firestore
✅ Formulario de contacto funcional
✅ Almacenamiento de datos de clientes
✅ Gestión de reservas en tiempo real

## 🔐 Seguridad (Producción)

Antes de ir a producción, implementa:

1. **Autenticación**: Requiere login para crear reservas
2. **Validación**: Valida datos en el servidor
3. **Rate limiting**: Limita requests por IP
4. **CORS**: Configura dominios permitidos
5. **Variables secretas**: Usa Secret Manager para credenciales

## 📚 Recursos

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
