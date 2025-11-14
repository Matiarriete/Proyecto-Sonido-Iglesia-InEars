# Proyecto Sonido Iglesia - InEars

Sistema completo de gestión de incidentes de sonido en tiempo vivo para iglesias, con API backend en FastAPI y frontend en React/TypeScript.

## 📋 Estructura del Proyecto

```
Proyecto sonido Iglesia/
├── Proyecto_sonido_iglesia/          # API Backend (FastAPI)
│   ├── main.py
│   ├── Models.py
│   ├── db.py
│   ├── Responses.py
│   ├── endpoints/
│   │   ├── instruments.py
│   │   ├── tickets.py
│   │   └── users.py
│   ├── scripts/
│   │   └── reset_db.py
│   └── requirements.txt
│
└── live-sound-incident-management/   # Frontend (React + TypeScript)
    ├── App.tsx
    ├── index.tsx
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── components/
    │   ├── auth/
    │   ├── interprete/
    │   ├── tecnico/
    │   └── shared/
    ├── context/
    │   ├── AuthContext.tsx
    │   └── DataContext.tsx
    └── hooks/
        ├── useAuth.ts
        └── useData.ts
```

## 🚀 Características

- **Autenticación de usuarios**: Login seguro con roles (Intérprete, Técnico)
- **Gestión de instrumentos**: Crear, editar y administrar instrumentos disponibles
- **Sistema de tickets**: Crear, asignar y rastrear problemas de sonido en tiempo real
- **Dashboard técnico**: Vista completa de todos los tickets y gestión de usuarios
- **Dashboard intérprete**: Crear y seguir el estado de sus propios tickets
- **Persistencia local**: LocalStorage para mantener sesión activa

## 📦 Tecnologías

### Backend
- **FastAPI** - Framework web asincrónico
- **SQLAlchemy** - ORM para base de datos
- **SQLite** - Base de datos local
- **Pydantic** - Validación de datos

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Bundler moderno
- **Tailwind CSS** - Estilos (si aplica)

## 🔧 Instalación

### Backend

```bash
cd Proyecto_sonido_iglesia
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**Requisitos**: Python 3.10+

### Frontend

```bash
cd live-sound-incident-management
npm install
```

**Requisitos**: Node.js 16+

## ▶️ Ejecutar el Proyecto

### Backend (API)

```bash
cd Proyecto_sonido_iglesia
source .venv/bin/activate
uvicorn main:app --reload
```

La API estará disponible en: `http://localhost:8000`

### Frontend (Aplicación Web)

```bash
cd live-sound-incident-management
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 📚 Endpoints Principales

### Instrumentos
- `GET /instruments` - Listar todos los instrumentos
- `GET /instruments/{id}` - Obtener instrumento por ID
- `POST /instruments` - Crear nuevo instrumento
- `PUT /instruments/{id}` - Actualizar instrumento

### Tickets
- `GET /tickets` - Listar todos los tickets (ordenados descendentemente)
- `GET /tickets/{id}` - Obtener ticket por ID
- `POST /tickets` - Crear nuevo ticket
- `PUT /tickets/{id}` - Actualizar ticket

### Usuarios
- `GET /users` - Listar todos los usuarios
- `GET /users/{id}` - Obtener usuario por ID
- `POST /users` - Crear nuevo usuario
- `PUT /users/{id}` - Actualizar usuario

## 🔄 Desarrollo

### Resetear Base de Datos

```bash
cd Proyecto_sonido_iglesia
python3 scripts/reset_db.py
```

Esto crea un backup de `app.db` y recrea las tablas según los modelos.

### Variables de Entorno

Crea un archivo `.env` en la raíz del backend (opcional):

```
DATABASE_URL=sqlite:///./app.db
DEBUG=True
```

## 📝 Autenticación

El sistema utiliza roles de usuario:

- **INTERPRETE**: Puede crear tickets sobre problemas de sonido
- **TECNICO**: Acceso completo para gestionar tickets, usuarios e instrumentos
- **ADMIN**: (Futuro) Permisos administrativos completos

## 🗄️ Base de Datos

- **SQLite** local en `app.db`
- No se sube a Git (configurado en `.gitignore`)
- Para mantener datos entre cambios de esquema, considera usar **Alembic** para migraciones

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

**Autor**: Matiarriete  
**GitHub**: [Matiarriete](https://github.com/Matiarriete)

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT. Siéntete libre de usarlo como plantilla y adaptarlo a tus necesidades.

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un [Issue](https://github.com/Matiarriete/Proyecto-Sonido-Iglesia-InEars/issues) con:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado
- Screenshots (si aplica)

---

**Última actualización**: 14 de noviembre de 2025
