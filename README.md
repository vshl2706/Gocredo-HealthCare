

# **HealthCare**

A Healthcare Wellness and Preventive Care Portal built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
The platform enables users to manage their wellness goals, receive personalized health insights, track daily activities, and access preventive care reminders—with secure authentication, user profiles, and role-based access. 

## **Features**

- **User Authentication:**  
  Secure user registration and login with password encryption using bcrypt and session management with JSON Web Tokens (JWT).
- **Patient Goal Tracker:**
   Allows patients to:
- **Add daily logs:**
  (e.g., waterIntake, steps,hours of sleep)
- **Secure Authentication (Patient & Provider)**
   User registration & login
    Password hashing (bcrypt)
    JWT-based sessions with expiration(12 hours)
    Role-based access control(Doctor(future),Patient,Admin)
    Consent checkbox during registration
    Action logging (e.g., login attempts, profile updates)


- **Patient Dashboard**
- Displays:
  Wellness goals (steps, yoga, water intake, sleep hours)
  Daily goal progress logging
  Preventive care reminders (blood test, annual checkup, etc.)
  “Health Tip of the Day” (also Motivational thoughts)





 View progress summary

- **Public Page:**
 General health information
 Privacy Policy
 About the portal

- **Patient Profile Management**
  View and update personal info
  Fields: age, allergies, medications, chronic conditions




---
---
## **Technologies Used**

### **Frontend:**
- **React.js:** Component-based architecture for building a dynamic and responsive user interface.
- **Tailwind CSS:** Pre-built UI components for enhanced design and responsiveness.

### **Backend:**
- **Node.js:** Backend runtime environment for building server-side logic.
- **Express.js:** Framework for API development and middleware integration.
- **Bcrypt.js:** library used for password hashing
- **JWT:** For User Authentication

### **Database:**
- **MongoDB:** Document-oriented database for storing user information, messages, and chat groups.

  ### **Prerequisites:**
1. **Node.js** (latest stable version)
2. **MongoDB** (local instance or cloud database, e.g., MongoDB Atlas)
3. A package manager: **npm** or **yarn**

   ## **Setup and Installation**

  Follow these steps to run the application locally:

### **Prerequisites:**
1. **Node.js** (latest stable version)
2. **MongoDB** (local instance or cloud database, e.g., MongoDB Atlas)
3. A package manager: **npm** or **yarn**

### **Steps:**
1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/vshl2706/Gocredo-HealthCare.git 


