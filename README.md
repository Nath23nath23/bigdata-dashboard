# README.md

# Big Data Dashboard

## Overview

This project is a web-based analytics dashboard developed using React.js, Supabase, Python, and Chart.js. The system processes COVID-19 datasets by performing data cleaning, normalization, and analytical querying before visualizing the results through interactive charts and KPI cards.

## Features

* Interactive dashboard
* KPI summary cards
* Bar chart visualization
* Line chart visualization
* Pie chart visualization
* Country filter dropdown
* Responsive mobile-friendly layout
* AI insight analysis section
* Cloud database integration using Supabase

## Technologies Used

* React.js
* Vite
* Supabase
* Chart.js
* Python
* Pandas
* SQL
* Vercel

## Installation

```bash
npm install
```

## Run Project

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Database

The project uses Supabase as the cloud-hosted relational database.

## Deployment

The application is deployed using Vercel.

---

# QUERY EXPLANATIONS

## Query 1

This query identifies the countries with the highest recorded COVID death rates per one million population. The results help determine which regions experienced the most severe impact during the selected dataset period.

## Query 2

This query calculates the maximum COVID death rate per country. The output helps compare outbreak severity between countries and identify areas with critical public health conditions.

## Query 3

This query computes the average global death rate over time. The analysis provides insight into worldwide COVID trends and overall pandemic progression.

---

# TECHNICAL DOCUMENTATION

## Project Architecture

The system follows a client-server architecture:

1. Data Source

   * COVID dataset CSV file

2. Data Processing Layer

   * Python script using Pandas
   * Cleaning missing values
   * Normalization
   * Outlier filtering

3. Database Layer

   * Supabase PostgreSQL database
   * SQL queries for analytics

4. Frontend Dashboard

   * React.js + Vite
   * Chart.js visualizations
   * Responsive dashboard interface

5. Deployment Layer

   * GitHub repository
   * Vercel deployment

---

# DATA CLEANING PROCESS

The dataset was cleaned using Python and Pandas. The following operations were performed:

* Removed missing or null values
* Standardized numerical values
* Filtered outliers using statistical filtering
* Exported cleaned dataset for database loading

---

# AI INSIGHT FEATURE

The dashboard includes an AI-inspired insight section that dynamically analyzes the selected dataset and generates summary insights including:

* Highest death rate observation
* Average deaths per one million
* Trend analysis
* Public health observations

---

# CHALLENGES ENCOUNTERED

During development, several challenges were encountered:

* Configuring Supabase database integration
* Handling responsive chart layouts for mobile devices
* Managing API compatibility for AI integration
* Resolving Git and deployment conflicts during Vercel deployment

These challenges were solved through debugging, dependency updates, and optimization of the React application.

---

# LEARNINGS

This project improved skills in:

* Cloud database integration
* React.js dashboard development
* Data analytics and SQL queries
* Python data cleaning and preprocessing
* Responsive UI design
* GitHub version control
* Vercel deployment

---

# FINAL SUBMISSION CHECKLIST

## Source Code

* App.jsx
* supabase.js
* clean_data.py
* queries.sql
* README.md

## Screenshots

* Supabase database schema
* Loaded data table
* SQL query outputs
* Dashboard desktop view
* Dashboard mobile view
* KPI cards
* Charts
* AI insight section
* Vercel deployment

## Links

* GitHub Repository Link
* Vercel Deployment Link
