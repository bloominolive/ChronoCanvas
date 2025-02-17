# 🎨 ChronoCanvas

## 🌟 Overview
ChronoCanvas is a full-stack web application that transforms dates into artistic visualizations while integrating historical data from The Church of Jesus Christ of Latter-day Saints. It combines interactive drawing capabilities with historical records, creating a unique platform for exploring dates through art and history.

🔗 **Live Demo:**
- Frontend: [https://chronocanvas-1.onrender.com](https://chronocanvas-1.onrender.com)
- Backend API: [https://chronocanvas-api.onrender.com](https://chronocanvas-api.onrender.com)
- Repository: [https://github.com/bloominolive/ChronoCanvas.git](https://github.com/bloominolive/ChronoCanvas.git)

## ✨ Key Features

### 🎯 Core Functionality
- **Date Visualization**: Convert any date into a unique artistic canvas
- **Interactive Drawing**: Built-in drawing tools for creative expression
- **Historical Integration**: Connect personal dates with LDS Church history
- **Temple Records**: Access and view temple dedication information
- **Date Comparison**: Compare two dates side by side
- **PDF Export**: Save and download your visualizations

### 🔐 User Features
- Secure authentication system
- Profile management
- Personal data customization
- Drawing saving capabilities

## 🛠️ Technology Stack

### Frontend Technologies
- **Core**: React 18
- **UI Framework**: React Bootstrap
- **Routing**: React Router Dom v7
- **Drawing**: Konva & HTML5 Canvas
- **HTTP Client**: Axios
- **Styling**: CSS3 & FontAwesome
- **PDF Generation**: HTML2Canvas & jsPDF

### Backend Technologies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT & Passport.js
- **Security**: Bcrypt
- **Documentation**: Swagger
- **Validation**: Express-validator

## 📋 System Architecture

### Frontend Architecture
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── context/        # React contexts
│   ├── api-access/     # API integration
│   ├── images/         # Static assets
│   └── styles/         # CSS styles
```

### Backend Architecture
```
backend/
├── controllers/     # Request handlers
├── models/         # Database schemas
├── routes/         # API endpoints
├── middleware/     # Custom middleware
├── config/         # Configuration files
└── utils/          # Helper functions
```

## 🚀 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/github` - GitHub OAuth
- `GET /auth/verify` - Token verification

### Church History
- `GET /ldsChurchHistory` - List all records
- `GET /ldsChurchHistory/:id` - Get specific record
- `POST /ldsChurchHistory` - Create record
- `PUT /ldsChurchHistory/:id` - Update record
- `DELETE /ldsChurchHistory/:id` - Delete record

### Temple Dedications
- `GET /templeDedications` - List all dedications
- `GET /templeDedications/:id` - Get specific dedication
- `POST /templeDedications` - Create dedication
- `PUT /templeDedications/:id` - Update dedication
- `DELETE /templeDedications/:id` - Delete dedication

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git
- GitHub account (for OAuth)

### Frontend Setup
```bash
# Clone repository
git clone https://github.com/bloominolive/ChronoCanvas.git

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=https://chronocanvas-api.onrender.com" > .env

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with required variables
# See Backend Configuration section

# Start server
npm start
```

### Backend Configuration
Create `.env` file with:
```env
JWT_SECRET=your_secret_key
JWT_EXPIRATION=1h
MONGODB_URL=your_mongodb_url
PORT=3001
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
```

## 🔒 Security Features
- JWT-based authentication
- Password encryption with Bcrypt
- Protected API routes
- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- Secure session management

## 👥 User Management
- Registration with validation
- Secure login system
- Profile editing
- Password management
- Account deletion
- OAuth integration

## 🎨 Drawing Features
- Color picker
- Brush size control
- Clear canvas option
- Save/load functionality
- Real-time drawing
- Multiple canvas support

## 🌐 Deployment
Both frontend and backend are deployed on Render:
- Frontend: [https://chronocanvas-1.onrender.com](https://chronocanvas-1.onrender.com)
- Backend: [https://chronocanvas-api.onrender.com](https://chronocanvas-api.onrender.com)

## 👨‍💻 Author

- GitHub: [@bloominolive](https://github.com/bloominolive)

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the ISC License

## 📞 Support
For support or questions:
- Open an issue on [GitHub](https://github.com/bloominolive/ChronoCanvas/issues)
- Contact the development team

## 🔄 Future Enhancements
- Mobile responsive optimization
- Enhanced drawing tools
- Additional historical data integration
- Social sharing features
- Collaborative drawing capabilities
- Extended user customization options