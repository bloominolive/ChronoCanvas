# ChronoCanvas Frontend

## 🎨 Description
ChronoCanvas is an interactive web application that allows users to "paint" and visualize meaningful information about any date. The frontend is built with React and provides an intuitive and artistic interface for exploring historical data.

## 🚀 Key Features

- **Data Visualization**: Visual representation of date-specific information
- **Interactive Canvas**: Drawing area where users can create art
- **User Authentication**: Complete registration and login system
- **Responsive Design**: Interface adaptable to different devices
- **API Integration**: Connection with backend for historical data
- **Date Comparison**: Functionality to compare information from different dates

## 🛠️ Technologies Used

- React 18
- React Router Dom
- React Bootstrap
- Axios
- Konva (for drawing canvas)
- JWT for authentication
- HTML5 Canvas
- CSS3
- FontAwesome

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- GitHub account (for authentication)
- ChronoCanvas API (backend) running

## ⚙️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bloominolive/chronocanvas.git
   cd chronocanvas-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   REACT_APP_API_URL=https://chronocanvas-api.onrender.com
   REACT_APP_GEN_AI_KEY=your_ai_key
   ```

4. **Start the project**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
src/
├── components/         # Reusable components
│   ├── Navbar/        # Navigation bar
│   ├── DataDisplay/   # Data visualization
│   ├── PaintApp/      # Drawing canvas
│   └── ...
├── pages/             # Main pages
│   ├── Home/          # Home page
│   ├── Login/         # Authentication
│   ├── Register/      # Registration
│   └── Compare/       # Date comparison
├── context/           # React contexts
│   └── AuthContext.js # Authentication management
├── api-access/        # API access functions
├── images/            # Graphic resources
└── styles/           # CSS files
```

## 🔒 Authentication System

### User Registration
- Field validation according to backend rules
- Required fields:
  - First Name (min: 2, max: 50 characters)
  - Last Name (min: 2, max: 50 characters)
  - Email (valid format, max: 80 characters)
  - Password (min: 8, max: 50 characters)
  - Birth Date

### Login
- Authentication via email and password
- Secure JWT token storage
- Session management using localStorage
- Automatic post-login redirection

## 🎨 Main Functionalities

### 1. Data Visualization
- Customized data based on selected date
- Visual representation through interactive cards
- Information includes:
  - Birthstone
  - Zodiac signs
  - Historical events
  - Temple data
  - Custom elements

### 2. Drawing Canvas
- Interactive drawing tools
- Color selection
- Brush thickness control
- Drawing saving capability

### 3. Date Comparison
- Side-by-side visualization
- Independent canvases
- Historical data comparison

## 🔗 API Integration

### Main Endpoints
- `/auth/register` - User registration
- `/auth/login` - Authentication
- `/ldsChurchHistory` - Historical data
- `/templeDedications` - Temple information

### Response Handling
- Error management
- Data validation
- User feedback

## 💅 Styles and Design

- Consistent theme with visual identity
- Custom color palette
- Interactive visual elements
- Responsive design for multiple devices

## 🚀 Deployment

The application is configured for deployment on platforms such as:
- Netlify
- Vercel
- GitHub Pages

### Deployment Steps
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to chosen service

## 🛠️ Component Details

### DataDisplay Component
```javascript
// Usage example
<DataDisplay
  title="Birthstone"
  name={data.birthstone}
  description={data.birthstoneSymbol}
/>
```

### PaintApp Component
```javascript
// Usage example
<PaintApp
  width={800}
  height={600}
  brushSize={5}
  defaultColor="#000000"
/>
```

### Authentication Components
```javascript
// Protected Route example
<PrivateRoute path="/dashboard" component={Dashboard} />
```

## 🔄 State Management

- Context API for global state
- Local state for component-specific data
- JWT token management
- User session persistence

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License. See `LICENSE` file for details.

## ✍️ Authors

- Samuel Chacon - Lead Developer
- Team Contributors

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Contact the development team

## 🔄 Updates and Maintenance

- Regular dependency checks
- Security updates
- Continuous UX/UI improvements

## 🔍 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Performance Optimization

- Lazy loading of components
- Image optimization
- Code splitting
- Performance monitoring

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)