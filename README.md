# 🛒 Product Store (Full Stack App)

A full-stack e-commerce-style application built using **React (Frontend)** and **ASP.NET Core + PostgreSQL (Backend)**.

---

## 🚀 Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Role-based access (Admin / User)

### 👨‍💼 Admin Features

* Add products
* Edit products
* Delete products

### 👤 User Features

* View products
* Add to cart
* Remove from cart
* Checkout (Order creation)

### 🛒 Cart System

* Stored in PostgreSQL (per user)
* Quantity management
* Real-time updates

### 💳 Checkout

* Order creation API
* Cart cleared after checkout

---

## 🛠️ Tech Stack

### Frontend

* React
* Redux
* Semantic UI

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* JWT Authentication

### Database

* PostgreSQL

---

## 📂 Project Structure

```
Frontend → React App  
Backend → ASP.NET Core API  
Database → PostgreSQL  
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

1. Navigate to backend folder:

```
cd Backend
```

2. Run migrations:

```
dotnet ef database update
```

3. Run API:

```
dotnet run
```

---

### 🔹 Frontend

1. Navigate to frontend folder:

```
cd src
```

2. Install dependencies:

```
npm install
```

3. Start app:

```
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login         |
| GET    | /api/musics        | Get products  |
| POST   | /api/cart          | Add to cart   |
| GET    | /api/cart/{userId} | Get cart      |
| DELETE | /api/cart/{id}     | Remove item   |
| POST   | /api/order         | Checkout      |

---

## 🧪 Demo Credentials

```
Username: admin1
Password: admin1234
```

---

## 📌 Future Improvements

* Razorpay payment integration
* Order history page
* JWT-based userId extraction
* UI enhancements

---

## 👨‍💻 Author

Sriya
sriyal2003@gmail.com