# IIIT-H Buy-Sell Marketplace

A modern web application for buying and selling products within the IIIT-H community. The platform provides a seamless experience for users to list items for sale, browse available products, manage their cart, and track orders.

## Key Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Product Listing**: Users can add products for sale with images, descriptions, categories, and prices.
- **Image Upload**: Integrated with Firebase Storage for fast and reliable image uploads.
- **Product Search & Categories**: Browse and search products by name or category (Electronics, Furniture, Clothes, etc.).
- **Cart Management**: Add products to your cart, view cart contents, and remove items as needed.
- **Order Placement**: Place orders for items in your cart with a single click and receive confirmation.
- **Order Tracking**: View pending and delivered orders, both as a buyer and a seller.
- **Responsive UI**: Clean, modern, and mobile-friendly interface using Material-UI.
- **Access Control**: Prevents unauthorized access to protected routes and features.
- **Custom Animations**: Enhanced user experience with custom cursor and loading animations.
- **Support**: Gemini powered chatbot for customer support.
- **Error Handling**: User-friendly error messages and alerts for all major actions.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Buy-Sell-IIIT.git
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd Buy-Sell-IIIT/frontend
   npm install
   cd ../backend
   npm install
   ```
3. Set up environment variables as needed (see `.env.example` if provided).
4. Start the backend and frontend servers:
   ```bash
   # In backend directory
   npm start
   # In frontend directory (separate terminal)
   npm start
   ```
5. Access the application in your browser at `http://localhost:3000` (or the deployed link below).

## Deployed Link

[Access the live site here](https://buy-sell-iiith-ten.vercel.app/)

## Technologies Used
- React.js (frontend)
- Node.js & Express (backend)
- MongoDB (database)
- Firebase Storage (image uploads)
- Material-UI (UI components)
