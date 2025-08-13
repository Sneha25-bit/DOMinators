# 🌐 DOMinators

**Aqua-Verse Explorer** is an interactive, ocean-themed platform designed to educate, engage, and empower users to explore marine ecosystems while having fun. Whether you're diving into coral reefs, learning about marine mammals, or joining a like-minded community, Aqua-Verse offers a gamified experience where every interaction earns you **Ocean Points**.

These Ocean Points can be redeemed for exclusive merchandise, used to unlock in-game rewards, or contributed to real-world ocean conservation efforts.

This project blends education, entertainment, and environmental impact, making it a unique tool for raising awareness about marine life in a way that's fun, social, and rewarding — both digitally and in the real world.

---

## 📁 Project Structure

```
DOMinators/
├── backend/           # Django backend project
│   ├── manage.py
│   ├── config/           # Django settings, urls, wsgi/asgi
│   ├── ocean/            # Example Django app
│   ├── community/        # Community posts,like/dislike  
│   ├── donation-stats/   # Donation_history
│   ├── donations/        # Donation
│   ├── friends/          # friend requests
│   ├── message/          # for message
│   ├── ocean_ai/         # Chatbot        
│   └── db.sqlite3        # Local development DB (ignored in Git)
│
├── frontend/           # Next.js frontend (Tailwind)
│   ├── src/               # Main source folder
│   │      ├── api/         # Axios instances and API utility functions      
│   │      ├── assets/      # Info page images
│   │      ├── components/  # Reusable UI components
│   │      ├── contexts/    # React context providers
│   │      ├── hooks/       # Custom React hooks for reusable logic
│   │      ├── lib/         # Utility functions and helpers
│   │      └── pages/       # All routes/pages (Next.js routing)
│   │
│   └── public/           # Publicly accessible images and static files
│          ├── images/            # Marine animals
│          ├── info-background/   #Background
│          └── merchandise_img/   #Merchandise pictures
│          
│           
│   
│── package.json         # Project metadata and dependencies
│── tailwind.config.ts   # TailwindCSS config
│── tsconfig.json        # TypeScript config
│── vite.config.ts       # Vite config
│── postcss.config.ts    # PostCSS config
│── .eslint.config.js    # Linting rules
├── env/                 # Python virtual environment (ignored in Git)
├── requirements.txt     # Python dependencies
├── .gitignore           # Ignored files for Git 
├── .gitattributes
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/DOMinators.git
cd DOMinators
```

---

### 🐍 2. Backend Setup (Django)

```bash
# Create and activate virtual environment
python -m venv env

# Windows:
env\Scripts\activate
# macOS/Linux:
source env/bin/activate

# Install Python packages
pip install -r requirements.txt

# Start Django development server
cd backend
python manage.py runserver
```

> Backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 🌐 3. Frontend Setup (Next.js + Bootstrap)

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at: [http://localhost:8080](http://localhost:8080)

---

## 👥 Team Workflow

### 🌳 Branching Strategy

1. Pull the latest changes:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new feature branch:

   ```bash
   git checkout -b feature/<your-feature-name>
   ```

3. After making changes, push your branch:

   ```bash
   git add .
   git commit -m "Describe your changes"
   git push -u origin feature/<your-feature-name>
   ```

4. Open a Pull Request into `main` from GitHub.

---

## 🧰 Tech Stack

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | Next.js, Tailwind     |
| Backend  | Django, Django REST Framework |
| Database | Postgres SQL             |
| Tools    | Git, GitHub, VS Code          |

---

## Deployment Status
**Note:** The website has been successfully deployed and is now live => do-minators.vercel.app

## ✅ Project Guidelines

* Do **not** commit `env/`, `.next/`, `node_modules/`, or `db.sqlite3`
* Use `.env` files to store sensitive credentials
* Commit often with clear messages
* Always open a Pull Request instead of pushing to `main` directly

---





