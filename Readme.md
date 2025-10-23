# Todo-App

A simple, clean, and efficient full-stack To-Do List Application. This app features a modern React frontend and a robust Node.js backend, allowing you to add, view, and manage your to-do items with data persistence.

## Table of Contents

* [Features](#features)

* [Tech Stack](#tech-stack)

* [Project Structure](#project-structure)

* [Getting Started](#getting-started)

* [Usage](#usage)

* [Development](#development)

* [Contributing](#contributing)

* [License](#license)

* [Contact](#contact)

## Features

* Add new to-do items.

* View a list of your current tasks.

* Mark tasks as completed (or remove when done).

* **Persistent Storage:** Tasks are saved to a MongoDB database.

* Responsive design for desktop and mobile.

* Fast development environment powered by Vite.

## Tech Stack

### Frontend (todo-app/)

* **Framework:** React (v18)

* **Bundler:** Vite

* **Routing:** React Router DOM

* **UI Library:** Ant Design

* **Styling:** Tailwind CSS

* **Linting / Code Quality:** ESLint

### Backend (backend/)

* **Runtime:** Node.js

* **Framework:** Express

* **Database:** MongoDB & Mongoose

* **Middleware:** CORS, bcryptjs (for password hashing), connect-mongodb-session

* **Environment:** dotenv

* **Development:** nodemon

## Project Structure

```

/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── .env.example
│   ├── package.json
│   └── ... (models, routes, controllers)
├── todo-app/ (Frontend)
│   ├── public/
│   ├── src/
│   │   └── ... (components, pages)
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md

```

* `backend/` — Contains the Node.js/Express server, database models, and API routes.

* `todo-app/` — Contains the React frontend application, components, and styles.

* `README.md` — This file.

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)

* npm (comes with Node.js)

* **MongoDB:** A running instance (either [local](https://www.mongodb.com/try/download/community) or a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository**

```

git clone [https://github.com/RifabAhamed/Todo-App.git](https://www.google.com/search?q=https://github.com/RifabAhamed/Todo-App.git)
cd Todo-App

````

2. **Setup the Backend**

* Navigate to the backend directory:

  ```
  cd backend
  
  ```

* Install dependencies:

  ```
  npm install
  
  ```

* Create a `.env` file (you can copy `.env.example` if one exists). Add your configuration variables:

  ```
  # Port for the backend server
  PORT=8000
  
  # Your MongoDB connection string
  MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/todo-db?retryWrites=true&w=majority
  
  # A secret for session management
  SESSION_SECRET=mysecretkey
  
  ```

* Start the backend server (in development mode):

  ```
  npm run dev
  
  ```

* The server should now be running (e.g., on `http://localhost:8000`).

3. **Setup the Frontend**

* Open a **new terminal window** and navigate to the frontend directory from the project root:

  ```
  cd todo-app
  
  ```

* Install dependencies:

  ```
  npm install
  
  ```

* Start the frontend development server:

  ```
  npm run dev
  
  ```

* The frontend app should now be running.

4. **View the App**

* Open your browser to `http://localhost:5173` (or as shown in your terminal) to view the app.

### Build for Production

1. **Build Frontend:**

```

cd todo-app
npm run build

```

This creates an optimized build in the `todo-app/dist/` folder.

2. **Run Backend (Production):**

```

cd backend
npm start

```

## Usage

1. Use the input field to type in a new to-do item, then hit “Enter” or click “Add”.

2. The item appears in the task list below, fetched from the backend.

3. Click on a task to mark it as completed or remove it.

4. Your tasks will persist even after refreshing the browser, as they are stored in the database.

## Development

* Follow standard practice: create a new branch for feature additions or bug fixes.

* Ensure linting rules are maintained (run `npm run lint` in the `todo-app/` directory).

* When ready, open a Pull Request with a clear description of changes.

* Make sure components are modular and reusable, and API endpoints are clear.

## Contributing

Contributions are very welcome! Here’s how you can help:

1. Fork the repository.

2. Create your feature branch: `git checkout -b feature/YourFeatureName`

3. Commit your changes: `git commit -m 'Add some feature'`

4. Push to your branch: `git push origin feature/YourFeatureName`

5. Open a Pull Request.

Please make sure your code follows the existing style and passes any linting/tests.

## License

This project is open-source and available under the MIT License.

## Contact

**Maintainer:** Rifab Ahamed

**GitHub:** https://github.com/RifabAhamed

Feel free to open issues for bug reports, feature requests, or any questions.

Thanks for exploring this project. Happy coding! 🎉

*Last updated: 2025-10-23*