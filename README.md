## BookAppoint: Nova Scotia's Medical Appointment Tradeboard

This project is a full-stack web application designed to help Nova Scotians easily find and book medical appointments.
It features a user-friendly interface, secure login/registration, and a robust backend to handle appointment management.

### Summary

**Structure:**

The project is divided into two parts:

* **Backend:** A Node.js server using Express framework to handle API requests. It connects to a MySQL database to store
user data, appointment information, and application data.
* **Frontend:** A React application built with Create React App. The frontend communicates with the backend API to
retrieve and display appointment data.

**Features:**

* **User Login/Registration:** Users can register for an account with email, password, and security questions.
* **Appointment Posting:** Users can post appointments, specifying details like date, time, reason, duration, and
hospital.
* **Appointment Picking:** Users can browse available appointments and apply for them.
* **Application Management:** The application tracks all applications and allows administrators to view and approve
applications.
* **User Schedule:** Users can view their confirmed appointments.
* **Admin Dashboard:** Admin users have access to a dashboard to view all appointments, manage applications, and post
appointments.
* **Forget Password:** Users can reset their passwords using their health ID and security questions.

### Tech Stack

* **Languages:** JavaScript, MySQL
* **Backend:** Node.js, Express.js
* **Frontend:** React.js, Create React App
* **Database:** MySQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/BookAppoint.git
```

2. Navigate to the project directory:
```bash
cd BookAppoint
```

3. Install dependencies for both the frontend and backend:
```bash
npm install
```

### Running the Project Locally

1. **Backend:**
* Start the MySQL server.
* Ensure you have configured the database connection details in `backend/index.js` (host, port, username, password, and
database name) to match your local setup.
* Run the backend server:
```bash
cd backend
npm start
```

2. **Frontend:**
* Start the React development server:
```bash
cd frontend
npm start
```

The application will be accessible at `http://localhost:3000`.

### Configuration

* **Database Connection:** Update the database connection details in `backend/index.js` to match your local MySQL setup.
* **CORS Configuration:** The frontend application is currently configured to allow requests from
`http://localhost:3000`. If you are deploying the application to a different domain, update the `cors` configuration in
`backend/index.js`.

### Testing

The project currently has basic functional tests implemented with Jest and React Testing Library. You can run the tests
with:

```bash
cd frontend
npm test
```

### Contributing

Contributions to this project are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive messages.
4. Push your branch to your fork.
5. Submit a pull request to the main branch of the original repository.

### Licensing

This project is licensed under the MIT License.
