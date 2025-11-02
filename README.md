# 🛒 SmartMart

SmartMart is an advanced hybrid web application built to simplify online shopping and store management. It combines an Angular-based frontend with a powerful Spring Boot backend, delivering a secure, scalable, and AI-enhanced e-commerce experience.

---

## 📦 Application Modules

### 🧑‍💼 Admin Modules
- Register  
- Login  
- Dashboard  
- Manage Products  
- Manage Orders  
- View Users  
- Analyze Feedback (via Gemini AI)  

### 👤 User Modules
- Register  
- Login  
- Browse Products  
- Add to Cart  
- Place Orders (Razorpay Integrated)  
- Track Orders  
- Submit Feedback  
- Email & OTP Verification  

### 🔄 Role-Specific Navigation
- Separate Admin and User navigation bars  
- Auth Guard and HTTP Interceptor for secure route handling and API communication  

---

## 🛠 Technologies Used

### Frontend
- Angular 10+  
- HTML5, CSS3, Bootstrap  
- TypeScript  

### Backend
- Java with Spring Boot  
- MySQL Database  

### Integrations
- **Razorpay** – Secure payment gateway integration  
- **Gemini AI** – Smart feedback sentiment analysis  
- **OTP Service** – For mobile/email verification  
- **JWT Authentication** – Role-based secure access  

---

## 🔐 Authorization & Security

- **JWT-Based Login**: Token-based authentication with user roles  
- **Role-Based Routing**: Implemented via Angular’s `canActivate` guards  
- **Session Protection**: Automatic logout on token expiry  
- **Email & OTP Verification**: Ensures user authenticity before account activation  

---

## ✅ Utilities & Enhancements

- **Client-Side Validation**: Regex and Angular forms for validating email, password, and mobile number  
- **Razorpay Payment Flow**: Smooth order checkout and transaction handling  
- **AI Feedback Analysis**: Uses Gemini API for real-time sentiment insights  
- **Custom Error Pages**: Friendly 404 and 500 responses  
- **Responsive Design**: Optimized for all screen sizes  

---

## 🧠 Architecture Overview

- **Frontend Layer**: Angular for UI/UX, routing, and REST API communication  
- **Backend Layer**: Spring Boot REST APIs with JWT and MySQL persistence  
- **Integration Layer**: Razorpay for payments and Gemini API for feedback analysis  
- **Communication**: JSON payloads over HTTPS  

---

## 📁 Folder Structure

SmartMart/
- angularapp/ # Angular frontend
- springapp/ # Spring Boot backend
- README.md

---

## 🖥️ Hardware Requirements

- Minimum 8 GB RAM recommended  
- Node.js (v14 or higher)  
- Java JDK 17+  
- MySQL Server running locally or remotely  

---

## 🚀 Getting Started

### Frontend Setup

```bash
cd angularapp
npm install
npm start
````

### Backend Setup

```bash
cd springapp
mvn spring-boot:run
```

---

### Default URLs

- Frontend: http://localhost:8081/
- Backend API: http://localhost:8080/

---

### 💡 Future Enhancements

- Add AI-based product recommendations
- Implement admin analytics dashboard
- Enable multi-vendor support
- Integrate email templates for promotions
