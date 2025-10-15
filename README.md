# Employee Management System

A full-stack web application for managing employee data, built with Node.js, Express, PostgreSQL, and EJS. This application allows users to perform CRUD (Create, Read, Update, Delete) operations on employee records through a simple web interface.

## Live Demo

Check out the live application: [Employee Data Management](https://employee-data-management-dw5d.onrender.com/)

## Features

- **View Employees**: Display a list of all employees in a table format.
- **Add Employee**: Add new employees with name, email, and position.
- **Edit Employee**: Update existing employee details.
- **Delete Employee**: Remove employees from the database.
- **Search Employees**: Search employees by name, email, or position using case-insensitive matching.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS (Embedded JavaScript Templates), HTML, CSS
- **HTTP Client**: Axios
- **Environment Management**: dotenv

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/employee-management-system.git
   cd employee-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a PostgreSQL database named `Employee_Data`.
   - Create a table named `Employee` with the following schema:
     ```sql
     CREATE TABLE Employee (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       position VARCHAR(255) NOT NULL
     );
     ```

4. **Configure environment variables**:
   - Copy the `.env` file and update the values with your PostgreSQL credentials:
     ```
     PG_USER=your_postgres_username
     PG_HOST=localhost
     PG_DATABASE=Employee_Data
     PG_PASSWORD=your_postgres_password
     PG_PORT=5432
     ```

## Usage

1. **Start the API server** (runs on port 4000):
   ```bash
   node index.js
   ```

2. **Start the web server** (runs on port 3000):
   ```bash
   npm start
   ```

3. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000`.

## API Endpoints

The application consists of two servers:

- **API Server** (`index.js`): Handles data operations (port 4000)
- **Web Server** (`server.js`): Serves the web interface and communicates with the API (port 3000)

### API Endpoints (Port 4000)

- `GET /posts`: Retrieve all employees
- `GET /posts/:id`: Retrieve a specific employee by ID
- `POST /search/employee`: Search employees by name, email, or position
- `POST /posts`: Create a new employee
- `PATCH /posts/:id`: Update an existing employee
- `DELETE /posts/:id`: Delete an employee

### Web Routes (Port 3000)

- `GET /`: Display the main page with employee list
- `GET /new`: Display form to add a new employee
- `GET /edit/:id`: Display form to edit an existing employee
- `POST /api/posts`: Create a new employee
- `POST /api/posts/:id`: Update an existing employee
- `GET /api/posts/delete/:id`: Delete an employee
- `POST /search`: Search for employees

## Project Structure

```
Employee_management_system/
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── index.js                # API server
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Lock file for dependencies
├── server.js               # Web server
├── public/                 # Static files
│   └── styles/
│       └── main.css        # CSS styles
└── views/                  # EJS templates
    ├── index.ejs           # Main page template
    └── modify.ejs          # Add/Edit form template
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues

- No known issues at this time. All features are fully implemented with proper error handling.

## License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.

## Author

Mohd Uzair Ansari
