# 🌐 DOMinators

**DOMinators** is a full-stack web application built with **Django** for the backend and **Next.js** for the frontend. It’s designed with modularity, scalability, and team collaboration in mind.

---

## 📁 Project Structure

```
DOMinators/
├── backend/          # Django backend project
│   ├── manage.py
│   ├── config/       # Django settings, urls, wsgi/asgi
│   ├── ocean/        # Example Django app
│   └── db.sqlite3    # Local development DB (ignored in Git)
│
├── frontend/         # Next.js frontend (Bootstrap)
│   ├── src/
│   ├── public/
│   └── ...
│
├── env/              # Python virtual environment (ignored in Git)
├── requirements.txt  # Python dependencies
├── .gitignore
├── .gitattributes
└── README.md
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

> Frontend runs at: [http://localhost:3000](http://localhost:3000)

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
| Frontend | Next.js, React, Bootstrap     |
| Backend  | Django, Django REST Framework |
| Database | SQLite (dev only)             |
| Tools    | Git, GitHub, VS Code          |

---

## ✅ Project Guidelines

* Do **not** commit `env/`, `.next/`, `node_modules/`, or `db.sqlite3`
* Use `.env` files to store sensitive credentials
* Commit often with clear messages
* Always open a Pull Request instead of pushing to `main` directly

---





