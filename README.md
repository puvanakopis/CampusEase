# CampusEase - University Accommodation & Vehicle Rental Platform

CampusEase is a comprehensive full-stack web application designed to facilitate accommodation and vehicle rentals specifically for university students and staff. The platform connects verified university members with property and vehicle owners, creating a trusted marketplace within the university community.

<br>

## 📋 Project Overview

CampusEase serves as a bridge between university members (students and staff) who need accommodation or vehicle rentals, and owners who want to list their properties or vehicles. The platform implements a robust verification system, role-based access control, and an AI-powered assistant to help users navigate the platform.

### Key Objectives
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
- **React 19** - UI library
- **React Router DOM v7** - Navigation and routing
- **Context API** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Notifications
- **React Datepicker** - Date selection
- **Leaflet / React Leaflet** - Interactive maps
- **html2canvas + jsPDF** - PDF receipt generation
- **dayjs** - Date utility library
- **js-cookie** - Cookie management

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **MongoDB (Motor)** - Async primary database driver
- **ChromaDB** - Vector database for semantic search
- **PyJWT + Bcrypt / Passlib** - Authentication and password hashing
- **Pydantic v2** - Data validation and serialization
- **Gmail SMTP (Jinja2 templates)** - Transactional email service

### AI/ML Components
- **Google Gemini AI** - Primary LLM for conversational AI responses
- **Sentence Transformers** - Embedding model for vector generation
- **LangChain (+ langchain-huggingface)** - Embedding and chain utilities
- **ChromaDB** - Vector storage for RAG retrieval
- **Ollama** - Optional local LLM support
- **Groq** - Optional alternative LLM provider

<br>

## ✨ Features

### User Roles & Authentication
- **Multi-role system**: Student, Staff, Owner, Admin
- **Email OTP verification** for signup
- **JWT-based authentication**
- **Password reset** via email OTP
- **Role-based access control**

### User Features (Students/Staff)
- Browse accommodations and vehicles with advanced filtering
- View detailed listings with image galleries and interactive maps
- Save favorite items
- Make bookings with date validation and automatic price calculation
- Leave reviews and ratings
- Manage profile and account settings
- View booking history and download receipts (PDF)
- AI chatbot assistance powered by RAG

### Owner Features
- Owner application and admin verification workflow
- Dashboard with analytics and revenue overview
- Manage accommodations (create, edit, delete, view status)
- Manage vehicles (create, edit, delete, view status)
- View and manage incoming bookings (accept/decline)
- Profile and settings management
- Support ticket system

### Admin Features
- User management (approve/reject/suspend)
- Owner verification and moderation
- Accommodation and vehicle listing oversight
- Booking management
- Support ticket management
- Platform analytics dashboard

### Booking System
- **Payment options** - Credit card and pay-on-hand
- **Booking status tracking** - Pending, confirmed, canceled, completed
- **Date validation** - Prevents double bookings
- **Automatic price calculation** - Based on rental duration

### Vector Database Integration
The platform uses ChromaDB for semantic search across four collections:
- **Accommodations** - Properties with amenities, location, pricing
- **Vehicles** - Cars, bikes, vans with specifications
- **Owners** - Contact info and verification status
- **Knowledge Base** - Platform policies and FAQs

<br>

## 🤖 AI Assistant (RAG) Flow

The CampusEase AI Assistant uses a **Retrieval-Augmented Generation (RAG)** architecture to provide accurate and context-aware responses to users.

1. **User Question** — The user asks a question through the chatbot interface.
2. **Embedding Generation** — The question is converted into an embedding vector using Sentence Transformers.
3. **Vector Search (ChromaDB)** — The system searches across four ChromaDB collections: Knowledge Base, Accommodations, Vehicles, and Owners.
4. **Top-K Retrieval** — The most relevant documents are retrieved based on vector similarity.
5. **Context Preparation** — Retrieved documents are combined with the conversation history.
6. **AI Response Generation** — Context and question are sent to the Gemini AI model (or Ollama/Groq) to generate a response.
7. **Response Delivery** — The generated response is returned to the user.
8. **Memory Storage** — The conversation is stored in chat memory for future context.

<br>

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Python** (3.13+)
- **uv** package manager — [install guide](https://docs.astral.sh/uv/getting-started/installation/)
- **MongoDB** (local or Atlas)
- **Google Gemini API key** (for AI assistant)

### Environment Variables

#### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:8000
```

#### Backend (`backend/.env`)
```env
# MongoDB
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=campusease

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Email (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Frontend URL (used by backend CORS middleware to allow requests from this origin)
FRONTEND_URL=http://localhost:5173

# ChromaDB Settings
CHUNK_SIZE=500
```

<br>

## 🚀 Installation

### Backend Setup
```bash
# Clone the repository and navigate to the backend directory
git clone https://github.com/puvanakopis/CampusEase.git
cd CampusEase/backend

# Install dependencies and create virtual environment using uv
uv sync

# Activate the virtual environment
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # macOS & Linux

# Create the uploads directory (required for image storage)
mkdir uploads

# Start the development server
uv run uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Database Setup
The application handles database setup automatically on first run:
- **MongoDB** collections are created on first run
- **ChromaDB** vectors are synced from MongoDB data on startup
- **Knowledge base** is loaded into ChromaDB for AI assistant context

<br>

## 📁 Folder Structure

### Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── assets/               # Static images and media
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Shared components (buttons, pagination, etc.)
│   │   ├── user/             # User-specific components (Navbar, Footer, ChatBot)
│   │   ├── owner/            # Owner-specific components (Sidebar, Navbar)
│   │   └── admin/            # Admin-specific components (Navbar, Footer)
│   ├── constants/            # App-wide constants and config values
│   ├── containers/           # Feature-level UI sections
│   │   ├── auth/             # Login, register, forgot-password forms
│   │   ├── user/             # User feature sections (home, accommodation, vehicle, etc.)
│   │   ├── owner/            # Owner feature sections (dashboard, listings, bookings)
│   │   └── admin/            # Admin feature sections (users, owners, listings)
│   ├── context/              # React Context providers (Auth, Booking, RAG, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Top-level route page components
│   │   ├── auth/             # Authentication pages
│   │   ├── user/             # User pages (Home, Accommodation, Vehicle, etc.)
│   │   ├── owner/            # Owner pages (Dashboard, Listings, Bookings, etc.)
│   │   └── admin/            # Admin pages (Dashboard, Users, Owners, etc.)
│   ├── route/                # Route protection (ProtectedRoute)
│   ├── service/              # Axios API service modules
│   └── utils/                # Helper functions (PDF generation, photo utils)
├── package.json
└── vite.config.js
```

### Backend Structure
```
backend/
├── app/
│   ├── ai/                   # AI and RAG components
│   │   ├── rag_client.py     # RAG pipeline implementation
│   │   ├── chroma_service.py # ChromaDB vector operations
│   │   ├── embedding_model.py
│   │   └── conversation_memory.py
│   ├── core/                 # Core configuration (settings, env vars)
│   ├── db/                   # Database connection modules
│   │   ├── mongodb.py        # MongoDB (Motor) connection
│   │   └── chroma.py         # ChromaDB client setup
│   ├── middlewares/          # Request middleware (JWT auth)
│   ├── models/               # MongoDB document models
│   │   ├── user_model.py
│   │   ├── owner_model.py
│   │   ├── accommodation_model.py
│   │   ├── vehicle_model.py
│   │   ├── booking_model.py
│   │   ├── temp_booking_model.py
│   │   ├── admin_model.py
│   │   └── counter_model.py
│   ├── routers/              # FastAPI route handlers
│   │   ├── auth_router.py
│   │   ├── accommodation_router.py
│   │   ├── vehicle_router.py
│   │   ├── booking_router.py
│   │   ├── save_item_router.py
│   │   ├── temp_booking_router.py
│   │   ├── owner_router.py
│   │   ├── user_router.py
│   │   └── rag_router.py
│   ├── schemas/              # Pydantic request/response schemas
│   ├── services/             # Business logic layer
│   ├── templates/            # Jinja2 HTML email templates
│   │   ├── signup_otp.html
│   │   └── password_reset_otp.html
│   ├── utils/                # Utility helpers
│   │   ├── auth_utils.py
│   │   ├── email_utils.py
│   │   ├── file_utils.py
│   │   ├── otp_utils.py
│   │   └── text_builder.py
│   └── main.py               # Application entry point
├── data/                     # Static knowledge base data for AI
├── uploads/                  # User-uploaded files (images, documents)
├── pyproject.toml            # Project dependencies (managed by uv)
└── uv.lock                   # Locked dependency versions
```

<br>

## 🔌 API Endpoints

### Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup-request-otp` | Request OTP for new account |
| POST | `/signup-verify-otp` | Verify OTP and create account |
| POST | `/login` | User login |
| POST | `/forgot-password` | Request password reset OTP |
| POST | `/reset-password` | Reset password using OTP |
| GET | `/me` | Get current authenticated user |
| PATCH | `/update-profile` | Update user profile |
| PATCH | `/update-password` | Update user password |

### Accommodations (`/accommodation`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create accommodation (Owner) |
| GET | `/` | List all accommodations |
| GET | `/owner` | Get owner's accommodations |
| GET | `/{id}` | Get accommodation by ID |
| POST | `/{id}/review` | Add a review |
| PATCH | `/{id}` | Update accommodation |
| DELETE | `/{id}` | Delete accommodation |

### Vehicles (`/vehicles`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create vehicle (Owner) |
| GET | `/` | List all vehicles |
| GET | `/owner` | Get owner's vehicles |
| GET | `/{id}` | Get vehicle by ID |
| POST | `/{id}/review` | Add a review |
| PATCH | `/{id}` | Update vehicle |
| DELETE | `/{id}` | Delete vehicle |

### Bookings (`/booking`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a booking |
| GET | `/` | List all bookings (Admin) |
| GET | `/user/{id}` | Get bookings for a user |
| GET | `/owner/{id}` | Get bookings for an owner |
| PATCH | `/{id}` | Update booking status |
| DELETE | `/{id}` | Delete booking |

### AI Assistant (`/rag`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ask` | Query the AI assistant |

<br>

## ⚠️ Troubleshooting

### Common Issues

**`uv` command not found**
Install `uv` from [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/) before running backend setup.

**MongoDB connection error**
Ensure MongoDB is running locally (`mongod`) or update `MONGODB_URL` in `backend/.env` to point to your MongoDB Atlas connection string.

**Gemini API errors**
Verify your `GEMINI_API_KEY` in `backend/.env` is valid and has the Generative AI API enabled in Google Cloud Console.

**ChromaDB startup errors**
ChromaDB requires write access to the `backend/` directory to persist vector data. Ensure the process has the necessary file system permissions.

**File upload errors**
The `uploads/` directory must exist inside `backend/` before starting the server. Run `mkdir uploads` from the `backend/` directory if it does not exist.

<br>

## 👥 Authors
- Puvanakopis

<br>

## 🙏 Acknowledgments
- Sabaragamuwa University of Sri Lanka
- Open source community

<br>

**CampusEase - Making University Life Easier 🎓**
