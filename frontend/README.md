# Caber Frontend

This is the frontend part of the Caber ride-sharing application. It is built using React, Tailwind CSS, and Vite.

## Available Scripts
- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run lint` - Lints the codebase.
- `npm run preview` - Previews the production build.

## Project Structure

### Pages
- `About.jsx` - About page
- `CaptainAboutPage.jsx` - Captain's about page
- `CaptainHome.jsx` - Captain's home page
- `CaptainLogin.jsx` - Captain's login page
- `CaptainRiding.jsx` - Captain's ride management page
- `CaptainSignup.jsx` - Captain's signup page
- `ForgotPassword.jsx` - Password recovery page
- `Home.jsx` - Main home page
- `PayPg.jsx` - Page for `Captain` to withdraw earning
- `PaymentPage.jsx` - Detailed payment page
- `Riding.jsx` - User's ride tracking page
- `Start.jsx` - Ride start page
- `UserAbout.jsx` - User's about page
- `UserAboutPage.jsx` - Another user about page
- `UserLogin.jsx` - User login page
- `UserPayPg.jsx` - For `User` to add balance in wallet
- `UserSignup.jsx` - User signup page

### Components
- `CaptainDetails.jsx` - Captain's profile details
- `ConfirmRide.jsx` - Ride confirmation page
- `ConfirmRidePopUp.jsx` - Ride confirmation popup
- `FinishRide.jsx` - Ride completion page
- `LocationSearchPanel.jsx` - Location search functionality
- `LookingForDriver.jsx` - Search for available drivers
- `RidePopUp.jsx` - Ride details popup
- `VehiclePanel.jsx` - Vehicle selection and details
- `WaitingForDriver.jsx` - Driver arrival waiting screen

### Context
- `CaptainContext.jsx` - Context for captain-related state
- `UserContext.jsx` - Context for user-related state

### Styling
- `Tailwind CSS` - Used for styling
- `Global Styles` - `index.css`

### Build Tool
- `Vite` - Configured in `vite.config.js`

## Setup Instructions
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Build for production:
   ```sh
   npm run build
   ```

## Technologies Used
- React (Vite)
- Tailwind CSS
- Context API for state management