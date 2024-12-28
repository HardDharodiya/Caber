# Caber Application

This repository contains React components for a ride-sharing application, including user and captain functionalities. Below is a brief overview of each component.

## Components

### 1. Start.jsx
This component serves as the landing page for the application. It introduces users to the app and provides a call-to-action to proceed.

#### Features:
- **Background**: Dynamic background image.
- **Button**: Redirects to the login page using React Router.
- **Logo**: Displays the app logo.
- **Styling**:
  - Clean layout with clear CTA.
  
#### File Location:
`src/pages/Start.jsx`

---

### 2. UserLogin.jsx
This component handles user login functionality. It includes a form to input an email and password.

#### Features:
- **Input Fields**:
  - Email
  - Password
- **Form Submission**:
  - Captures email and password, stores them in the state.
- **Additional Options**:
  - Link to create a new account.
  - Option to login as a captain.
- **Styling**:
  - Consistent dark theme with responsive design.
- **Dependencies**:
  - React hooks (`useState`).
  - React Router (`Link`).

#### File Location:
`src/pages/UserLogin.jsx`

---

### 3. UserSignup.jsx
This component provides a form for captains to create an account. It includes inputs for personal details, email, password.

#### Features:
- **Input Fields**: 
  - Name:
    - First name
    - Last name
  - Email
  - Password
- **Form Submission**:
  - Captures data and stores it in the state.
- **Styling**:
  - Dark theme with flexible layout for responsiveness.
- **Dependencies**:
  - React hooks (`useState`).
  - React Router (`Link`).

#### File Location:
`src/pages/UserSignup.jsx`

---

### 4. CaptainLogin.jsx
This component handles captain login functionality. It includes a form to input an email and password.

#### Features:
- **Input Fields**:
  - Email
  - Password
- **Form Submission**:
  - Captures email and password, stores them in the state.
- **Additional Options**:
  - Link to create a new captain account.
  - Option to login as a user.
- **Styling**:
  - Consistent dark theme with responsive design.
- **Dependencies**:
  - React hooks (`useState`).
  - React Router (`Link`).

#### File Location:
`src/pages/CaptainLogin.jsx`

---

### 5. CaptainSignup.jsx
This component provides a form for captains to create an account. It includes inputs for personal details, email, password, and vehicle information.

#### Features:
- **Input Fields**: 
  - Name:
    - First name
    - Last name
  - Email
  - Password
  - Vehicle details: 
    - Color
    - Number Plate
    - Capacity
    - Type (dropdown)
- **Form Submission**:
  - Captures data and stores it in the state.
- **Styling**:
  - Dark theme with flexible layout for responsiveness.
- **Dependencies**:
  - React hooks (`useState`, `useRef`).
  - React Router (`Link`).

#### File Location:
`src/pages/CaptainSignup.jsx`

---

### 6. Home.jsx

This page  designed to assist users in finding trips by selecting pickup and destination locations. It features a dynamic user interface powered by React and GSAP animations.

## Features

- **Dynamic Input Panel**: Users can toggle an interactive panel to input their trip details.
- **GSAP Animations**: Smooth animations for opening and closing the input panel.
- **Responsive Design**: Fully responsive layout for optimal user experience across devices.
- **Reusable Components**: 
    - `LocationSearchPanel`: For location selection.
       - #### File Location:(`src/components/LocationSearchPanel.jsx`)

    - `VehiclePanel`: For vehicle options.
        - #### File Location: (`src/components/VehiclePanel.jsx`)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

#### File Location:
`src/pages/Home.jsx`

---