# Tortazos y Mamporros — Frontend

Juego de combates por turnos con autenticación JWT via cookies httpOnly, panel de administración y panel de usuario.

**Repositorio:** https://github.com/Lemnosos/front_proyecto_final.git

---

## Stack

- **React 19** + **Vite 8**
- **React Router v7** (rutas anidadas, protección por rol)
- **SCSS** (estilos por componente)
- **httpOnly cookies** (autenticación)
- **ESLint** con plugins de React

---

## Inicio rápido

```bash
git clone https://github.com/Lemnosos/front_proyecto_final.git
cd front_proyecto_final
npm install
```

Crear archivo `.env` en la raíz:

```env
VITE_URL_LOCAL=http://localhost:3000/api
VITE_URL_RENDER=<url-del-backend-en-produccion>
```

Ejecutar en desarrollo:

```bash
npm run dev
```

---

## Estructura del proyecto

```
src/
├── assets/               # Imágenes (caballero tranquilo, derrotado, victorioso)
├── components/
│   ├── adminComponents/  # AdminEnemigos, AdminUsuarios, AdminHistorial, AdminNuevoAdmin
│   ├── publicComponents/ # Login, Register
│   ├── userComponents/   # UserPersonaje, UserPelea, UserUsuario, UserHistorial
│   ├── Feedback.jsx      # Feedback loading/error/éxito (props + context fallback)
│   ├── NavBar.jsx        # Barra de navegación según rol
│   └── indexComponents.js
├── context/
│   ├── UserContext.jsx    # createContext
│   └── UserProvider.jsx   # Provider con lógica de auth (login, register, logout, renew)
├── hooks/
│   ├── useFetch.js        # Hook genérico de peticiones HTTP (sin return)
│   └── useFormularios.js  # Hook de formularios con validación centralizada
├── pages/                # Layouts con <Outlet /> para rutas anidadas
├── routes/
│   ├── Rutas.jsx          # Definición de todas las rutas
│   └── ProtectedRoute.jsx # Guard que redirige según autenticación y rol
├── App.jsx               # Componente raíz
├── main.jsx              # Punto de entrada
└── index.css             # Estilos globales
```

---

## Vistas y rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `PublicPage` | Página de inicio |
| `/registro` | `RegisterPage` | Login + Registro |
| `/user/personaje` | `UserPersonaje` | CRUD del personaje del usuario |
| `/user/pelea` | `UserPelea` | Combate contra enemigos |
| `/user/usuario` | `UserUsuario` | Datos de la cuenta del usuario |
| `/user/historial` | `UserHistorial` | Historial de combates del usuario |
| `/admin/enemigos` | `AdminEnemigos` | CRUD de enemigos |
| `/admin/usuarios` | `AdminUsuarios` | Listado y eliminación de usuarios |
| `/admin/historial` | `AdminHistorial` | Historial global de combates |
| `/admin/nuevoAdmin` | `AdminNuevoAdmin` | Creación de nuevos administradores |

---

## Decisiones técnicas

### Autenticación con cookies httpOnly

En lugar de localStorage + `Authorization` header, se usan cookies httpOnly. El backend envía la cookie `user_session` con `httpOnly: true` y el frontend envía `credentials: 'include'` en cada petición. Esto protege contra XSS.

### `useFetch` — sin return

El hook `useFetch` no retorna el JSON de la respuesta. En su lugar, expone los estados `data`, `loading` y `error`, que se actualizan automáticamente al llamar a `consultaApi()`. El componente observa estos estados via `useEffect` o renderizado condicional.

### Feedback dual (props + contexto)

El componente `Feedback` puede recibir `loading`, `error` y `data` como props. Si no se pasan, los obtiene del `UserContext`. Esto permite usarlo tanto con `useFetch` local (ej. `AdminEnemigos`) como con el contexto global (ej. `Login`, `Register`).

### Validación centralizada con `useFormularios`

El hook `useFormularios` encapsula el estado del formulario, el manejo de cambios y la validación. Cada campo se valida contra reglas `{ required, message }`, evitando lógica repetitiva en los componentes.

### Rutas protegidas por rol

`ProtectedRoute` verifica que el usuario esté autenticado y que su rol coincida con el requerido (`user` o `admin`). Si no, redirige a `/registro`.

---

## Backend

Repositorio del backend: [Lemnosos/Proyecto_final_back](https://github.com/Lemnosos/Proyecto_final_back) (Express, MySQL, cookie-parser, JWT).
