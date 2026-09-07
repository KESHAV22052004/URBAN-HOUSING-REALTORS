# Urban Housing - Real Estate Portal

A modern, responsive real estate web portal built with React, TypeScript, Tailwind CSS, and Clerk authentication.

## Features

- 🏠 6 Complete Screens: Home, Property Listing, Property Details, User Dashboard, Add Property, Admin Dashboard
- 🔐 **Clerk Authentication**: Secure user authentication with social logins
- 🎨 Modern UI: Clean design with light colors, card-based layouts, and smooth animations
- 📱 Fully Responsive: Works seamlessly on desktop and mobile devices
- 🛣️ React Router: Client-side routing with protected routes
- 👤 Role-Based Access: Admin and user roles with different permissions

## Getting Started

### 1. Clone or Download the Project

### 2. Set Up Clerk Authentication

#### Create a Clerk Account:
1. Go to [https://clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application in the Clerk Dashboard
3. Choose your authentication methods (Email, Google, GitHub, etc.)

#### Get Your API Keys:
1. In your Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

#### Add Keys to Your Project:
1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Add your Clerk Publishable Key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

### 5. Configure Clerk Settings (Optional but Recommended)

In your Clerk Dashboard:

#### Set Allowed Redirect URLs:
- Go to **Paths** in your Clerk Dashboard
- Add your development URL: `http://localhost:5173`
- Add any production URLs when deploying

#### Configure User Roles (for Admin Access):
1. Go to **Users** in Clerk Dashboard
2. Select a user you want to make an admin
3. Click **Public metadata**
4. Add this JSON:
   ```json
   {
     "role": "admin"
   }
   ```
5. Save changes

Now this user will have access to the Admin Dashboard at `/admin`

## Authentication Features

✅ **Sign In / Sign Up**: Clerk-powered authentication pages  
✅ **Social Logins**: Google, GitHub, and more (configure in Clerk)  
✅ **Protected Routes**: Dashboard and Admin pages require authentication  
✅ **User Profile**: Display user info in header with dropdown menu  
✅ **Role-Based Access**: Admin-only routes and features  
✅ **Persistent Sessions**: Stay logged in across browser sessions  

## Routes

### Public Routes
- `/` - Home page with search and featured properties
- `/properties` - Property listing page with filters
- `/property/:id` - Property details page
- `/login` - Sign in page
- `/signup` - Sign up page

### Protected Routes (Requires Login)
- `/dashboard` - User dashboard to manage properties
- `/add-property` - Multi-step form to add new properties

### Admin Routes (Requires Admin Role)
- `/admin` - Admin dashboard with analytics and approval system

## Setting Up Admin Users

To give a user admin access:

1. Sign up a new user or use an existing user
2. Go to Clerk Dashboard → Users
3. Click on the user you want to make admin
4. Under "Public metadata", add:
   ```json
   {
     "role": "admin"
   }
   ```
5. The user now has admin access!

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **React Router v7** - Client-side routing
- **Clerk** - Authentication and user management
- **Lucide React** - Icon library
- **Recharts** - Charts for analytics
- **Sonner** - Toast notifications

## Environment Variables

Required environment variables:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Deployment

When deploying to production:

1. Update your Clerk Dashboard with production URLs
2. Use your production Clerk keys
3. Ensure environment variables are set in your hosting platform
4. Build the project: `npm run build`

## Need Help?

- Clerk Documentation: [https://clerk.com/docs](https://clerk.com/docs)
- React Router Docs: [https://reactrouter.com](https://reactrouter.com)
- Tailwind CSS Docs: [https://tailwindcss.com](https://tailwindcss.com)

## License

This project is for educational and demonstration purposes.
