# Restaurant App Front End

## Project Summary 

This project creates the front end for a modern restaurant app (built with Next.js and Tailwind CSS), that provides users with an interactive and responsive experience to browse menus and place orders. 

It is connected to the following back end API: 
- https://github.com/Billy-Dentith/restaurant-app-be

The app is yet to be deployed 

## Features

- **Modern UI/UX:** Built with Next.js and Tailwind CSS for a sleek and responsive design.
- **Menu Display:** Fetch and display restaurant menus from the backend API. Staff members can also add, edit and manage menu items through the admin panel. 
- **Cart Functionality:** Add items to a cart and proceed to checkout (using Stripe). 
- **Authentication:** User login and sign up.
- **Order Management:** Staff members can view and manage all orders by updating the order status. 
- **API Integration:** Communicates with the backend via RESTful API calls.


## Set-Up Instructions 
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x recommended)
- npm or yarn 

### Clone the Repository
```
git clone https://github.com/Billy-Dentith/restaurant-app.git
```

### Install Dependencies
```
npm install (or yarn install)
```

### Environment Variables 
Create a ```.env.local``` file in the root directory and add the necessary environment variables:
```
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

NEXT_PUBLIC_API_URL=
```

### Set-up the Backend
Go to https://github.com/Billy-Dentith/restaurant-app-be and follow the instructions to clone and run the backend

### Run the Development Server
```
npm run dev (or yarn dev)
```
Visit ```http://localhost:3000``` to view the app in development mode


