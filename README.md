# MERN E-Commerce Website

## Overview
This is a **MERN stack E-Commerce application**. The project is under active development, focusing on building a full-featured backend first, followed by frontend integration.

---

## Current Progress (Completed)

### 1. Backend Development
- **Authentication:** 
  - User and Merchant registration
  - Login with JWT token
  - Password hashing with bcrypt
  - Validation of confirm password in the controller (not stored in DB)
- **Product Management:** 
  - Add, update, delete products (restricted so merchants can only modify their own products)
  - Fetch all products, fetch by merchant, fetch single product
- **Cart Functionality:** 
  - Add products to cart
  - Remove single product from cart
  - Delete entire cart
  - Get cart for logged-in user
  - Total price calculation
- **Route Conflicts Fixed:** 
  - DELETE routes for removing product and deleting cart separated to avoid conflicts
- **API Testing:** 
  - All endpoints tested and working as expected

---

## Next Steps (Planned)

- **Frontend Development**
  - Build React.js interface for user and merchant dashboards
  - Implement product listing, cart UI, and checkout process
- **Advanced Backend Features**
  - Product search and filtering
  - Category-based product listing
  - Recurring events or promotions
- **User Experience Enhancements**
  - Notifications for cart actions
  - Validation and error handling on frontend
- **Deployment**
  - Deploy backend and frontend on cloud (Heroku / Vercel / Render)
  - Connect frontend with backend APIs

---

## Notes
- Backend is fully functional and tested.
- All routes are protected with JWT authentication where required.
- Future work will focus on integrating the frontend and adding advanced features.

