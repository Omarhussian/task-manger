# Task Manager - React (CRUD + Dashboard)

A clean and modern task management application built with **React + TypeScript + Redux Toolkit + SCSS Modules**

This project demonstrates:

-  Scalable folder structure
-  CRUD (Create / Read / Update / Delete) with local storage persistence
-  Responsive design (mobile-first cards layout)
-  Dashboard with charts (Recharts)
-  Edit modal + form validation
-  Toast notifications & clean UX interactions
-  Reusable Icon system (Lucide icons)
-  Clean maintainable code

---

##  Tech Stack

| Category | Tools |
|---------|------|
Language | TypeScript  
Framework | React (Vite)  
State Management | Redux Toolkit  
Storage | LocalStorage (in-memory service abstraction)  
Styling | SCSS Modules  
Charts | Recharts  
Icons | Lucide-React  
Forms | React Hook Form  
UI Strategy | Notion-style minimal + responsive  

---

##  Folder Structure
src/
├─ api/               # abstracted data layer (local storage service)
├─ components/        # reusable UI components
│   ├─ TaskForm/
│   ├─ TasksTable/
│   └─ Icon/
├─ pages/             # App screens (Tasks + Dashboard)
├─ store/             # Redux store + slice
├─ types/             # Global TypeScript types
├─ styles/            # Global SCSS + theme vars
├─ routes/            # App routing
├─ App.tsx
└─ main.tsx
Architectural decision:  
> Data layer abstracted in `/api` so real backend can be plugged later without changing UI.

---

## 🧠 Features

### Core
- Add / edit / delete tasks
- Categories & statuses
- Estimated hours & deadlines
- Validation + clean UX
- Toast notifications

### Dashboard
- Total tasks count
- Status distribution (Bar chart)
- Category distribution (Pie chart)

### UI/UX
- Notion-like white-space + soft shadows
- Responsive (table → mobile cards)
- Modal editing
- Empty state view
- Smooth user flows

---

## 📦 Installation

```bash
npm install
npm run dev


## 📦 Author 
Built with <3 by Omar Hussain

