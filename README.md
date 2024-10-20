# Car Mechanic Shop Dashboard

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Firebase Configuration](#firebase-configuration)
7. [Environment Variables](#environment-variables)
8. [Running the Application](#running-the-application)
9. [Dependencies and Versions](#dependencies-and-versions)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [License](#license)

## Introduction

This project is a comprehensive dashboard for a Car Mechanic Shop. It provides features for managing customers, inventory, car services, and employee activities. The dashboard includes real-time updates, authentication, and a responsive design for various device sizes.

## Features

- User Authentication (Login/Logout)
- Dashboard with summary cards and charts
- Customer Management
- Inventory Management with restock notifications
- Car Service Tracking
- Employee Activity Monitoring
- Responsive design for mobile and desktop

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For handling routing in the application
- **Material-UI (MUI)**: For styled React components and responsive design
- **Firebase**: 
  - Firestore: For database management
  - Authentication: For user authentication
- **react-chartjs-2**: For creating interactive charts
- **react-toastify**: For displaying notifications
- **jsPDF**: For generating PDF invoices
- **Tailwind CSS**: For additional styling and utility classes

### Main Packages and Their Purposes

1. `@mui/material` and `@mui/icons-material`: UI components and icons
2. `react-router-dom`: Routing
3. `firebase`: Backend services (database and authentication)
4. `react-chartjs-2`: Data visualization
5. `react-toastify`: User notifications
6. `jspdf` and `jspdf-autotable`: PDF generation for invoices
7. `axios`: HTTP client for API requests
8. `framer-motion`: For animations
9. `styled-components`: For component-level styling

## Project Structure
car-mechanic-dashboard/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Checkout.jsx
│   │   ├── CustomerList.jsx
│   │   ├── AddCustomer.jsx
│   │   ├── InventoryList.jsx
│   │   ├── AddStock.jsx
│   │   ├── CarList.jsx
│   │   ├── AddCar.jsx
│   │   ├── Profile.jsx
│   │   └── Footer.js
│   │
│   ├── Layout/
│   │   └── Layout.jsx
│   │
│   ├── context/
│   │   └── AuthContext.js
│   │
│   ├── firebase/
│   │   └── firebaseConfig.js
│   │
│   ├── App.js
│   └── index.js
│
├── .env
├── package.json
└── README.md


## Setup and Installation

1. Clone the repository:
git clone [https://github.com/your-username/car-mechanic-dashboard.git](https://github.com/your-username/car-mechanic-dashboard.git)
cd car-mechanic-dashboard

2. Install dependencies: npm install

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Set up Firebase (see [Firebase Configuration](#firebase-configuration) section)

## Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select an existing one)
3. Enable Firestore Database and Authentication services
4. In the project settings, find your web app's Firebase configuration
5. Create a file `src/firebase.js` with the following content:

```
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```
## Environment Variables

Create a `.env` file in the root directory with the following content:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Replace `your_*` with your actual Firebase configuration values.

## Running the Application

1. Start the development server:

```
npm start
```


2. Open [http://localhost:5151](http://localhost:5151) in your browser

## Dependencies and Versions

This project uses the following key dependencies:

- React: ^16.8.0
- React DOM: ^17.0.2
- Material-UI (MUI): ^6.1.4
- Firebase: ^9.6.6
- Chart.js: ^3.7.1
- React Router DOM: ^6.2.1
- React Toastify: ^8.2.0
- jsPDF: ^2.5.2
- Axios: ^0.25.0
- Framer Motion: ^11.11.9
- Styled Components: ^6.1.8


For a complete list of dependencies and their versions, refer to the `package.json` file.

## Troubleshooting

### Common Errors and Solutions

1. **Peer Dependency Conflicts**

Error: "npm ERR! Conflicting peer dependency: react@16.8.0"

Solution: This error occurs due to mismatched versions of React and React DOM. To resolve:
```npm install react@17.0.2 react-dom@17.0.2```
2. **Material-UI Version Mismatch**

Error: "Cannot find module '@mui/material' or its corresponding type declarations."

Solution: Ensure you have the correct version of Material-UI installed:

```


npm install @mui/material@6.1.4 @mui/icons-material@6.1.4 @emotion/react@11.13.3 @emotion/styled@11.13.0
```


3. **Firebase Initialization Error**

Error: "Firebase App named '[DEFAULT]' already exists"

Solution: Make sure you're only initializing Firebase once in your application. Check your `firebaseConfig.js` file and ensure it's imported and used correctly.


4. **Chart.js Version Compatibility**

Error: "Error: "category" is not a registered scale."

Solution: Ensure you're using compatible versions of Chart.js and react-chartjs-2:

```
npm install chart.js@3.7.1 react-chartjs-2@4.0.1
```


5. **Styled Components Version Mismatch**

Error: "Invalid hook call. Hooks can only be called inside of the body of a function component."

Solution: This can occur if you have multiple versions of styled-components. Try reinstalling:

```
npm uninstall styled-components
npm install styled-components@6.1.8
```


6. **React Router DOM Navigation Issues**

Error: "Uncaught Error: useNavigate() may be used only in the context of a `<Router>` component."

Solution: Ensure your app is wrapped with `BrowserRouter` in your main `index.js` or `App.js` file.


7. **Tailwind CSS Styling Not Applied**

Issue: Tailwind classes not affecting the styling.

Solution: Ensure you've properly set up Tailwind CSS. Check your `tailwind.config.js` and make sure you're importing the Tailwind styles in your main CSS file:

```
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```




### General Troubleshooting Steps

1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` folder and `package-lock.json` file
3. Reinstall dependencies: `npm install`
4. If using VSCode, reload the window after major dependency changes
5. Check for any conflicting global installations of packages
6. Ensure your Node.js version is compatible with the project requirements


If you encounter any other issues, please check the official documentation of the respective libraries or create an issue in the project repository.
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.