# 🌤️ Weather Journal

A full-stack **MERN** (MongoDB, Express, React, Node.js) application designed to record weather observations and view dynamic statistical summaries. 

The application features a custom, responsive, editorial-style UI with color-coded weather conditions, smooth micro-animations, and a layout optimized for wide screens. 

---

## 📸 Screenshots
### 1. Adding a Weather Record
The main dashboard features a clean, grid-based form for entering new data. Users can select a date, input the temperature, choose from 7 distinct weather conditions (which are color-coded in the table), and add a location and optional notes.
![Adding Records With Appropriate data](./frontend/public/images/AddingRecor.png)
### 2. The Weather Records Table
All submitted records are displayed in a responsive, easy-to-read table. The leftmost column features an accent hover effect, and the weather conditions are displayed as custom-styled badges (e.g., Sunny is gold, Rainy is blue, Stormy is purple) to make scanning the data effortless.
![Weather Records](./frontend/public/images/WeatherRecords.png)
### 3. Edit or Update a Record
Clicking the "Edit" button on any row populates the form at the top of the page with the existing data. The form title dynamically changes to "Edit Record," allowing users to seamlessly update their observations.
![Edit Or Update Records](./frontend/public/images/EditUpdateRecords.png)
### 4. Delete a Record
Users can remove an observation by clicking the "Delete" button. A browser confirmation prompt prevents accidental data loss before the record is permanently removed from the MongoDB database.
![Delete Records](./frontend/public/images/DeleteRecords.png)
### 5. Form Validation
The application features robust data validation. If a user submits an invalid temperature (e.g., exceeding the realistic limits), a clear, animated error message appears at the top of the screen, preventing bad data from reaching the database.
![Validation](./frontend/public/images/Validation.png)
### 6. Dynamic Summary Statistics
Using MongoDB aggregation pipelines, the app automatically calculates and displays four key metrics: Total Records, Average Temperature, Most Frequent Condition, and Top Location. These stat cards feature unique pastel backgrounds and accent bars.
![Weather Summary](./frontend/public/images/WeatherSummary.png)
### 7. Data Model (JSON)
Here is a look at the underlying MongoDB document structure. The Mongoose schema enforces required fields, specific data types, and string length limits.
![Data Model(JSON)](./frontend/public/images/ModelJson.png)
---

## ✨ Key Features

- **Complete CRUD Functionality:** Create, Read, Update, and Delete weather records seamlessly.
- **MongoDB Aggregations:** Dynamic summary cards calculate Total Records, Average Temperature, Most Frequent Condition, and Top Location on the fly.
- **Robust Validation:** Mongoose schema validation (backend) combined with real-time client-side validation (frontend) ensures data integrity (e.g., temperature limits, required fields).
- **Responsive & Stylish Design:** Custom vanilla CSS utilizing CSS Grid, Flexbox, and variables. The UI uses a warm "paper" aesthetic with distinct accent colors (Terracotta, Gold, Sage, Plum, Sky).
- **RESTful API:** Fully separated client and server architecture utilizing Axios for API requests.
- **Vite Proxy:** Frontend development server is configured to proxy `/api` requests to the Express backend, avoiding CORS issues.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Bootstrapped with Vite)
- Axios (HTTP Client)
- Custom Vanilla CSS

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- CORS & Dotenv

---

## 📁 Project Structure & Explanation

```text
weather-journal/
│
├── backend/                  # Express.js Server
│   ├── middleware/
│   │   └── errorHandler.js   # Global error handling & Mongoose validation formatting
│   ├── models/
│   │   └── Weather.js        # Mongoose Schema (Date, Temp, Condition, Location, Notes)
│   ├── routes/
│   │   └── weatherRoutes.js  # All CRUD routes + Aggregation pipeline for stats
│   ├── .env                  # Environment variables (Port, MongoDB URI)
│   ├── seed.js               # Script to populate database with sample data
│   ├── server.js             # Entry point: Express app setup & DB connection
│   └── package.json
│
└── frontend/                 # React + Vite Application
    ├── src/
    │   ├── components/
    │   │   ├── Message.jsx       # Success/Error alert component
    │   │   ├── WeatherForm.jsx   # Form for adding/editing records (handles validation)
    │   │   ├── WeatherList.jsx   # Table displaying records with Edit/Delete actions
    │   │   └── WeatherSummary.jsx# Cards showing aggregated MongoDB statistics
    │   ├── App.css               # Global styles (Animations, color palette, layouts)
    │   ├── App.jsx               # Main component (State management, API fetching)
    │   └── main.jsx              # React DOM entry point
    ├── index.html
    ├── vite.config.js            # Vite config (includes API proxy to backend)
    └── package.json
    ```
