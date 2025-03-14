# 📌 Frontend Engineering Challenge - Dataset & Job Management System

## 👋 Dear Recruiter,

Thank you for reviewing my submission for the **MBC Frontend Engineering Challenge**. This project is a **React & TypeScript web application** that allows users to **upload datasets (CSV files)** and execute **long-running computational jobs** on them.

This README outlines the **project details, architectural decisions, and technology choices**, ensuring you understand my **approach, reasoning, and potential improvements**.

---

## ⚙ Installation & Setup

Clone the repository and install dependencies:
```sh
git clone https://github.com/dev-keepgoing/mbc-fe-challenge.git
cd mbc-fe-challenge
npm install
npm run dev

---

## 🚀 Project Overview

This web application consists of two main pages:

1. **Dataset Upload Page** 📂  
   - Users can upload CSV files as datasets.
   - Uploaded datasets are displayed in a list.
   - Datasets persist even after refreshing the page.

2. **Job Management Page** 🏗  
   - Users can select a dataset and **run a simulated computation job**.
   - Jobs are displayed with a **progress bar** that updates over time.
   - Jobs can be **cancelled mid-way**.
   - Completed and cancelled jobs persist even after refresh.

---

## 🏗 Architectural Approach

This project was designed with **performance, scalability, and clean state management** in mind. Below are the key **technologies and design decisions** used:

### 1️⃣ State Management: Zustand (Lightweight & Efficient)
- **Why Zustand?**
  - Eliminates Redux boilerplate while maintaining **global state efficiently**.
  - Supports **asynchronous state updates** (ideal for simulating backend interactions).
  - Minimizes unnecessary re-renders compared to React Context.

- **Alternative Scenarios:**
  - **Redux (RTK Query)** would be beneficial for large-scale, multi-user applications.
  - **React Context** is fine for lightweight apps without shared global state.

- **Implementation Details:**
  - Created separate Zustand **stores** for **datasets** and **jobs** (`datasetStore.ts`, `jobStore.ts`).
  - Jobs update their **progress asynchronously** while persisting state in localStorage.

---

### 2️⃣ Web Workers for Async Job Execution
- **Why Web Workers?**
  - Offloads job processing to a separate thread, **preventing UI freezes**.
  - Mimics **real-world backend computations** without blocking the main thread.
  - Easily extendable to **WASM (WebAssembly)** for computational-heavy tasks.

- **Alternative Scenarios:**
  - **GraphQL/REST API** integration could replace workers for real backend jobs.
  - **WASM (Rust, C++)** could be used for actual computations.

- **Implementation Details:**
  - `jobWorker.js` processes jobs **asynchronously** in a separate thread.
  - The worker **sends progress updates back** to the main application.
  - Zustand listens to these updates to **reflect real-time progress**.

---

### 3️⃣ LocalStorage for Persistent State
- **Why LocalStorage?**
  - **Persists data without requiring a backend**.
  - Automatically reloads datasets & jobs **even after a page refresh**.
  - Simple and lightweight for this project.

- **Alternative Scenarios:**
  - **IndexedDB** for handling **larger datasets** efficiently.
  - **Backend API** for long-term storage in real-world applications.

- **Implementation Details:**
  - Implemented **`saveState()` & `loadState()`** functions for **datasets & jobs**.
  - **LocalStorage ensures state is maintained**, even when the user **navigates away**.

---

## 🏛 Project Structure


The codebase follows a **modular architecture**, making it **scalable and maintainable**.

## 🏗 Project Structure

The codebase follows a **modular architecture**, making it **scalable and maintainable**.

  - **`/components`** - Reusable UI components (e.g., `ProgressBar`).
  - **`/constants`** - Constant values used throughout the application (e.g., `Job Status`).
  - **`/pages`** - React pages (`DatasetUploadPage`, `JobsPage`).
  - **`/services`** - Business logic for handling Datasets, Jobs, and Web Workers.
  - **`/store`** - Zustand state management (`datasetStore`, `jobStore`).
  - **`/types`** - TypeScript interfaces and types (`Dataset`, `Job`).
  - **`/utils`** - Helper functions (e.g., timestamps, job status updates).
  - **`/workers`** - Web Worker files (`jobWorker.ts`) to handle background processes.


---

## 📦 Technologies Used

✅ **React.js** - UI framework  
✅ **TypeScript** - Type safety & maintainability  
✅ **Zustand** - Lightweight global state management  
✅ **Web Workers** - Async job execution (WASM-ready)  
✅ **LocalStorage** - Persistent client-side data storage  
✅ **Tailwind CSS** - For clean and responsive UI  

---

## 🏆 Why This Approach?

This project balances **performance, clean architecture, and future scalability**. The following key benefits make it an ideal solution:

### ✅ Performance Optimized
- **Web Workers** ensure smooth UI performance without blocking the main thread.
- **Zustand** eliminates Redux boilerplate while keeping state efficiently updated.

### ✅ Clean & Scalable Codebase
- **Separate store modules** for datasets and jobs.
- **Web Workers** keep job processing **decoupled** from UI logic.
- **LocalStorage** handling follows a **structured approach** to persist state.

### ✅ Future Extensibility
- **Easy WASM integration** (e.g., computational-heavy jobs could be run in Rust or C++).
- **GraphQL/REST API-ready** (just replace the mock service calls with real API endpoints).
- **Scalable state management** (Zustand is lightweight but can be expanded).

---

## 🎯 Potential Enhancements
- **Drag & Drop File Upload** instead of standard file input.
- **Pagination & Sorting** for better dataset/job management.
- **IndexedDB** for large dataset handling.
- **Notifications & WebSockets** for real-time job progress.

---

## 📝 Final Thoughts
This project demonstrates **efficient state management, asynchronous job execution, and persistence without a backend**. It is designed to be **scalable, performant, and easy to maintain**.

Looking forward to your feedback! 🚀

**Best Regards,**  
Neysha Borrero 
neysha.borrero@gmail.com


