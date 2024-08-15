[![Lint](https://github.com/ciriti/URLs-Processor/actions/workflows/lint.yaml/badge.svg)](https://github.com/ciriti/URLs-Processor/actions/workflows/lint.yaml)
[![Test](https://github.com/ciriti/URLs-Processor/actions/workflows/test.yml/badge.svg)](https://github.com/ciriti/URLs-Processor/actions/workflows/test.yml)

# URLs Processor

**URLs Processor** is a React-based web application designed to efficiently manage and process URLs. This tool allows users to add URLs, view detailed information about each URL, and handle URL-related tasks through an intuitive interface. The application supports authentication and provides secure access to URL management features.

## Table of Contents

1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ciriti/URLs-Processor.git
   cd URLs-Processor
   ```

2. Navigate to the `URLs-Processor` directory:

   ```sh
   cd URLs-Processor
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Set up environment variables. Create a `.env` file in the `URLs-Processor` directory and add the following environment variables:

   ```env
   REACT_APP_BACKEND=http://localhost:8080
   REACT_APP_USER_DEV=your_username
   REACT_APP_PASS_DEV=your_password
   ```

## Running the Application

1. Start the React application:

   ```sh
   npm start
   ```

2. The application will start on the port specified in the `.env` file (default is 3000). You can access it via `http://localhost:3000`.

## Project Structure

The project is organized into several key components:

- **App.js**: The main application component that manages routing and overall layout.
- **Components**: A collection of modular React components, including:
  - **AddURLs**: Handles adding new URLs to the system.
  - **AddUrlsOrLogin**: Conditionally renders either the URL addition form or the login page based on authentication status.
  - **ErrorPage**: Displays an error message when routing or other issues occur.
  - **Login**: Manages user authentication.
  - **URLDetails**: Displays detailed information about a specific URL.
  - **URLs**: Lists all the URLs added by the user.
- **Context**: Provides global context for managing API interactions and user authentication.

## Usage

This section should include instructions on how to use the application's features, such as adding URLs, viewing URL details, and managing user authentication.

## Contributing

Contributions are welcome! Please read the contributing guidelines to get started.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
