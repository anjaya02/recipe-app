# Recipe App - Full Stack Assessment

A modern recipe discovery application built with **React.js**, **Node.js**, and **MongoDB**. Users can authenticate, explore recipes by category, search for dishes, save favorites, and view detailed recipe information with smooth animations powered by **Framer Motion**.

---

## Author

**Anjaya Induwara**

- GitHub: [anjaya02](https://github.com/anjaya02)
- Email: [anjayainduwara@gmail.com](mailto:anjayainduwara@gmail.com)

---

## Tech Stack

### Frontend

- **React.js 18** - Component-based UI library
- **React Router DOM** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Token authentication
- **Joi** - Input validation
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### External API

- **TheMealDB API** - Recipe data source

---

## Project Structure

```
recipe-app/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── api/              # API configuration
│   │   ├── auth/             # Authentication context
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── styles/           # CSS files
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend Express application
│   ├── middleware/          # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # External API services
│   ├── config.js           # Configuration
│   ├── db.js               # Database connection
│   └── index.js            # Server entry point
│
└── docs/                   # Documentation
    └── postman_collection.json
```

---

## Features

### Authentication & Security

- JWT-based authentication with secure HTTP-only cookies
- Protected routes for dashboard and favorites
- Input validation and sanitization
- Rate limiting and CORS protection
- Password hashing with bcrypt

### Recipe Discovery

- Browse recipes by 5 categories: Beef, Chicken, Dessert, Pasta, Vegetarian
- Search functionality with real-time results
- Integration with TheMealDB API for extensive recipe database
- Recipe details modal with ingredients, instructions, and video links

### User Experience

- Save favorite recipes with persistent storage
- Responsive design for all device sizes
- Smooth animations and page transitions
- Loading states with animated skeletons
- Modern, intuitive user interface

### Performance & Animations

- Framer Motion animations for enhanced UX
- Page transitions and hover effects
- Modal animations and loading states
- Optimized API calls and caching

---

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Backend Setup

1. **Navigate to server directory**

```bash
cd server
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create `.env` file in server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_ORIGIN=http://localhost:5173
JWT_EXPIRES=7d
COOKIE_SECURE=false
```

4. **Start the server**

```bash
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**

```bash
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   Create `.env` file in client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start the development server**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Recipes

- `GET /api/recipes/categories` - Get recipe categories
- `GET /api/recipes/by-category?c={category}` - Get recipes by category
- `GET /api/recipes/search?q={query}` - Search recipes
- `GET /api/recipes/{id}` - Get recipe details

### Favorites

- `GET /api/favorites` - Get user's favorite recipes
- `POST /api/favorites` - Add recipe to favorites
- `DELETE /api/favorites/{mealId}` - Remove recipe from favorites

---

## Deployment

### Backend Deployment (Railway/Heroku)

1. **Build the application**

```bash
npm run build
```

2. **Environment Variables**
   Set production environment variables:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLIENT_ORIGIN` - Frontend production URL
- `COOKIE_SECURE=true`

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**

```bash
npm run build
```

2. **Environment Variables**

- `VITE_API_URL` - Backend production URL

### Hosted Application

- **Frontend**: [Your Vercel/Netlify URL]
- **Backend**: [Your Railway/Heroku URL]

---

## Testing

### Postman Collection

- Complete API testing collection available in `/docs` folder
- Import the collection to test all endpoints
- Pre-configured environment variables for local and production

### Manual Testing

1. Register a new account
2. Login and navigate to dashboard
3. Browse recipes by category
4. Search for specific recipes
5. Add recipes to favorites
6. View recipe details in modal
7. Manage favorites in dedicated page

---

## Key Implementation Details

### Authentication Flow

- JWT tokens stored in HTTP-only cookies for security
- Automatic token validation on protected routes
- Seamless login/logout with proper session management

### Recipe Management

- Real-time integration with TheMealDB API
- Optimized API calls with proper error handling
- Favorite recipes stored in MongoDB with user association

### UI/UX Features

- Responsive design with mobile-first approach
- Smooth animations using Framer Motion
- Loading states and skeleton screens
- Search functionality with debounced API calls

---

## Future Enhancements

- Recipe rating and review system
- User recipe creation and sharing
- Meal planning calendar
- Shopping list generation
- Social features and recipe sharing
- Advanced filtering and sorting options

---

## License

This project is created for assessment purposes and is not intended for commercial use.

---

## Contact

For any questions or clarifications about this project:

**Anjaya Induwara**

- Email: [anjayainduwara@gmail.com](mailto:anjayainduwara@gmail.com)
- GitHub: [@anjaya02](https://github.com/anjaya02)
