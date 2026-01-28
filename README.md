# Myoko - Traditional Northeast Treasures

**Myoko** is a specialized e-commerce platform dedicated to discovering and promoting traditional craftsmanship from Northeast India. It bridges the gap between local artisans and a global audience, providing a digital marketplace for unique items like jewelry, clothing, home decor, and art.

The platform features a robust dual-user system (Customer & Artisan), an integrated AI shopping assistant powered by Google Gemini, and seamless payment processing via Razorpay.

## 🚀 Key Features

### 🛍️ For Customers

* **Marketplace Browsing**: Explore categories including Jewelry, Clothing, Home Decor, Art, and Accessories.
* **AI Shopping Assistant**: A built-in chatbot powered by **Google Gemini 2.0 Flash** to provide product recommendations, answer shipping queries, and assist with order tracking.
* **Secure Checkout**: Integrated **Razorpay** payment gateway for secure and reliable transactions.
* **Shopping Cart**: Full cart management functionality (add, remove, update quantities).
* **User Accounts**: Secure authentication (Sign up/Login) to track orders and manage profiles.

### 🎨 For Artisans

* **Dedicated Dashboard**: A comprehensive artisan dashboard to view analytics, sales, and reviews.
* **Product Management**: Tools to add, edit, and delete product listings with image support.
* **Order Management**: Track incoming orders, update shipping status (Processing, Shipped, Delivered), and view customer details.
* **Analytics**: Visualize sales data, pending orders, and unread messages.

## 🛠️ Tech Stack

### Frontend

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: JavaScript / JSX
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**:
* [Shadcn UI](https://ui.shadcn.com/) (@radix-ui primitives)
* NextUI
* Lucide React (Icons)
* Framer Motion (Animations)



### Backend

* **Runtime**: Node.js (via Next.js API Routes)
* **Database**: [MongoDB](https://www.mongodb.com/) (Atlas)
* **ORM**: [Mongoose](https://mongoosejs.com/)
* **Authentication**: Custom JWT (JSON Web Tokens) with `bcryptjs` encryption.

### Services & Integrations

* **AI**: [Google Generative AI](https://ai.google.dev/) (Gemini 2.0 Flash)
* **Payments**: [Razorpay](https://razorpay.com/)
* **Image Storage**: Cloudinary (implied by dependencies)
* **Email**: Nodemailer

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB Atlas Account (or local MongoDB instance)
* Razorpay Account (for testing payments)
* Google Cloud Console Account (for Gemini API)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/myoko.git
cd myoko

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables.

> **Note:** Replace the placeholder values with your actual credentials.

```env
# Database
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/myoko

# Authentication
TOKEN=your_strong_jwt_secret_key

# Google Gemini AI
GOOGLE_API_KEY=your_google_generative_ai_api_key

# Razorpay (Payments)
RAZOR_ID=your_razorpay_key_id
RAZOR_SECRET=your_razorpay_key_secret

# Cloudinary (Image Uploads - Recommended based on deps)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional/If configured)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

```

### 4. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

```
myoko/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   │   ├── api/         # Backend API endpoints (checkout, auth, products)
│   │   ├── artisan/     # Artisan dashboard pages
│   │   ├── auth/        # Login/Signup pages
│   │   └── page.js      # Landing page
│   ├── components/      # Reusable UI components
│   │   ├── custom/      # Custom components (Header, Footer, Lists)
│   │   └── ui/          # Shadcn UI base components
│   ├── helpers/         # Utility functions (AI, Mailer)
│   ├── lib/             # Configurations (DB connection, Utils)
│   └── models/          # Mongoose Database Schemas (User, Product, Order)
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── tailwind.config.js   # Tailwind configuration

```

## 🧠 AI Features

The platform utilizes `src/helpers/googleai.js` to interact with Google's Gemini API. The system prompt is specifically engineered to act as an e-commerce assistant, handling:

* **Product Recommendations**: "Show me some silk sarees."
* **FAQs**: "How do returns work?"
* **Contextual Filtering**: The AI is restricted to only answer shopping-related queries.

## 💳 Payment Flow

The checkout process (`src/app/api/client/checkout/route.js`) handles:

1. **Stock Validation**: Checks if requested cart items are available in the inventory.
2. **Order Creation**: Creates a "Pending" order in the MongoDB database.
3. **Payment Initiation**: Generates a Razorpay order ID.
4. **Inventory Update**: Deducts purchased quantity from the `Product` stock immediately upon order creation.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

*Built with ❤️ for the artisans of Northeast India.*
