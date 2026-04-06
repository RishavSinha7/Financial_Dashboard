# 📈 FinDash - Financial Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Deployed with Vercel](https://img.shields.io/badge/Deployed_with-Vercel-black?logo=vercel)

A modern, responsive, and robust Financial Dashboard built with **React**, **Vite**, and **Zustand**. It provides a comprehensive real-time view of transactions, income, and expenses, utilizing sleek interactive charts and an intuitive user interface.

## ✨ Features

- **Interactive Visualizations**: High-quality charts powered by **Chart.js** and **Recharts**.
- **State Management**: Predictable and fast global state handling using **Zustand**.
- **Modern UI Components**: Sleek iconography using **Lucide React** with custom generic dropdown and interactive components.
- **Responsive Layout**: Designed to work beautifully on both desktop screens and mobile devices.
- **Fast Development Experience**: Hot Module Replacement (HMR) and optimized builds provided by **Vite**.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS with modern flex/grid layouts

## 🚀 Getting Started

Follow these instructions to get the project up and running locally.

### Prerequisites

Make sure you have Node.js installed (v18 or higher recommended).

### Installation

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd Financial_Dashboard
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`.

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder. You can preview the production build locally by running:

```bash
npm run preview
```

## ☁️ Deployment

This project is configured to be easily deployable on **Vercel**. 

To deploy using the Vercel CLI:
```bash
npx vercel --prod
```
We recently deployed this dashboard to Vercel, enjoying their automated CI/CD pipeline!

## 📂 Project Structure

```text
Financial_Dashboard/
├── public/                 # Static assets
├── src/                    # Application source code
│   ├── components/         # Reusable UI components (Sidebar, Panels, etc.)
│   ├── store/              # Zustand global state (useStore.js)
│   ├── App.jsx             # Main Application entry point
│   └── main.jsx            # React root injection
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 📄 License

This project is licensed under the MIT License.
