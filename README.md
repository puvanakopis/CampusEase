# CampusEase - University Accommodation & Vehicle Rental Platform

CampusEase is a comprehensive full-stack web application designed to facilitate accommodation and vehicle rentals specifically for university students and staff. The platform connects verified university members with property and vehicle owners, creating a trusted marketplace within the university community.

<br>

## 📋 Project Overview

CampusEase serves as a bridge between university members (students and staff) who need accommodation or vehicle rentals, and owners who want to list their properties or vehicles. The platform implements a robust verification system, role-based access control, and an AI-powered assistant to help users navigate the platform.

### Key Objectives:
- Provide a secure platform for university-affiliated users to find accommodation and vehicles
- Enable owners to list and manage their properties/vehicles
- Implement a thorough verification process for all users
- Offer an AI assistant to answer user queries about listings and platform policies
- Facilitate booking management and payment processing


### Database Architecture
- **MongoDB**: Primary database for all transactional data
- **ChromaDB**: Vector database for AI-powered semantic search
- **File Storage**: Local storage for user uploads (photos, documents)

<br>

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Navigation and routing
- **Context API** - State management
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **Material Symbols** - Icons

### Backend
- **FastAPI** - Python web framework
- **MongoDB** - Primary database
- **ChromaDB** - Vector database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **SMTP** - Email service (Gmail)

### AI/ML Components
- **Google Gemini AI** - LLM for conversational AI
- **Sentence Transformers** - Embedding model (all-MiniLM-L6-v2)
- **LangChain** - Embedding utilities
- **ChromaDB** - Vector storage for RAG


<br>

## ✨ Features

### User Roles & Authentication
- **Multi-role system**: Student, Staff, Owner, Admin
- **Email OTP verification** for signup
- **JWT-based authentication**
- **Password reset** via email
- **Role-based access control**

### User Features (Students/Staff)
- Browse accommodations and vehicles
- Advanced filtering and search
- View detailed listings with images
- Save favorite items
- Make bookings
- Leave reviews and ratings
- Manage profile and settings
- View booking history
- AI chatbot assistance

### Owner Features
- Owner application and verification
- Dashboard with analytics
- Manage accommodations (CRUD)
- Manage vehicles (CRUD)
- View and manage bookings
- Profile management
- Support ticket system

### Admin Features
- User management (approve/reject)
- Owner verification
- Listing moderation
- Booking oversight
- Support ticket management
- Platform analytics

### Booking System
- **Payment integration** - Credit card and pay-on-hand options
- **Booking status tracking** - Pending, confirmed, canceled, completed
- **Date validation** - Prevents double bookings
- **Price calculation** - Automatic total based on duration

### Vector Database Integration
The platform uses ChromaDB for semantic search across:
- **Accommodations** - Properties with amenities, location, pricing
- **Vehicles** - Cars, bikes, vans with specifications
- **Owners** - Contact info and verification status
- **Knowledge Base** - Platform policies and FAQs

<br>

## 🤖 AI Assistant (RAG) Flow

The CampusEase AI Assistant uses a **Retrieval-Augmented Generation (RAG)** architecture to provide accurate and context-aware responses to users.

1. **User Question**
   - The user asks a question through the chatbot interface.

2. **Embedding Generation**
   - The question is converted into an **embedding vector** using an embedding model.

3. **Vector Search (ChromaDB)**
   - The system searches across **four ChromaDB collections**:
     - Knowledge Base (platform policies and general information)
     - Accommodations
     - Vehicles
     - Owners

4. **Top-K Retrieval**
   - The most relevant documents (**Top-K results**) are retrieved based on vector similarity.

5. **Context Preparation**
   - Retrieved documents are combined with the **conversation history** to provide context.

6. **AI Response Generation**
   - The context and user question are sent to the **Gemini AI model** to generate a response.

7. **Response Delivery**
   - The generated response is returned to the user.

8. **Memory Storage**
   - The conversation and response are stored in **chat memory** for future context.

<br>

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (3.9+)
- MongoDB

### Environment Variables

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

#### Backend (.env)
```env
# MongoDB
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=campusease

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# ChromaDB Settings
CHUNK_SIZE=500
```

<br>

## 🚀 Installation
### Backend Setup
```
# Clone and enter directory
git clone https://github.com/puvanakopis/CampusEase.git
cd CampusEase/backend

# Create and sync the environment
uv sync

# Activate the virtual environment
.venv\Scripts\activate      # Windows
source .venv/bin/activate    # macOS & Linux

# Create uploads directory (ensure you're in /backend)
mkdir uploads

# Run the server
uv run uvicorn app.main:app --reload
```

### Frontend Setup
```
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup 
```
The application automatically:

Creates MongoDB collections on first run

Syncs data to ChromaDB vectors on startup

Loads static knowledge base for the AI assistant

```

<br>

## 📁 Folder Structure

###  Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── user/            # User-specific components
│   │   ├── owner/           # Owner-specific components
│   │   └── admin/           # Admin-specific components
│   ├── pages/                # Route components
│   │   ├── auth/            # Authentication pages
│   │   ├── user/            # User pages
│   │   ├── owner/           # Owner pages
│   │   └── admin/           # Admin pages
│   ├── containers/           # Complex containers
│   │   ├── user/            # User containers
│   │   └── owner/           # Owner containers
│   ├── context/              # React Context providers
│   ├── hooks/                # Custom hooks
│   ├── route/                # Route protection
│   └── utils/                # Helper functions
├── package.json
└── README.md
```

### Backend Structure
```
backend/
├── app/
│   ├── routers/              # API routes
│   │   ├── auth_router.py
│   │   ├── accommodation_router.py
│   │   ├── vehicle_router.py
│   │   ├── owner_router.py
│   │   ├── user_router.py
│   │   ├── booking_router.py
│   │   ├── save_item_router.py
│   │   ├── temp_booking_router.py
│   │   └── rag_router.py
│   ├── services/             # Business logic
│   ├── schemas/              # Pydantic models
│   ├── models/               # Database models
│   ├── ai/                   # AI components
│   │   ├── rag_client.py     # RAG implementation
│   │   ├── chroma_service.py # Vector DB service
│   │   ├── embedding_model.py
│   │   └── conversation_memory.py
│   ├── core/                 # Core configuration
│   ├── db/                   # Database connections
│   │   ├── mongodb.py
│   │   └── chroma.py
│   ├── middlewares/          # Auth middleware
│   └── utils/                # Utilities
│       ├── email_util.py
│       ├── hash_util.py
│       ├── file_util.py
│       ├── otp_util.py
│       └── text_builder.py
├── uploads/                  # File uploads
├── requirements.txt
└── README.md
```


<br>

## API Endpoints

### Authentication (/auth)
```
- POST /signup-request-otp - Request signup OTP
- POST /signup-verify-otp - Verify signup OTP
- POST /login - User login
- POST /forgot-password - Request password reset
- POST /reset-password - Reset password with OTP
- GET /me - Get current user
- PATCH /update-profile - Update user profile
- PATCH /update-password - Update password
```

### Accommodations (/accommodation)
```
- POST /- Create accommodation (Owner/Admin)
- GET / - List all accommodations
- GET /owner - Get owner's accommodations
- GET /{id} - Get accommodation by ID
- POST /{id}/review - Add review
- PATCH /{id} - Update accommodation
- DELETE /{id} - Delete accommodation
```

### Vehicles (/vehicles)
```
- POST / - Create vehicle (Owner/Admin)
- GET / - List all vehicles
- GET /owner - Get owner's vehicles
- GET /{id} - Get vehicle by ID
- POST /{id}/review - Add review
- PATCH /{id} - Update vehicle
- DELETE /{id} - Delete vehicle
```

### Bookings (/booking)
```
- POST / - Create booking
- GET / - List all bookings
- GET /user/{id} - Get user's bookings
- GET /owner/{id} - Get owner's bookings
- PATCH /{id} - Update booking
- DELETE /{id} - Delete booking
```

### RAG (/rag)
```
- GET /ask - Query AI assistant
```

<br>

## 👥 Authors
- Puvanakopis - puvanakopis@example.com

<br>

## 🙏 Acknowledgments
- Sabaragamuwa University of Sri Lanka
- Open source community
<br>

**CampusEase - Making University Life Easier 🎓**
