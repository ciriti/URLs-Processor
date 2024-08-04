[![Lint](https://github.com/ciriti/URLs-Processor/actions/workflows/lint.yaml/badge.svg)](https://github.com/ciriti/URLs-Processor/actions/workflows/lint.yaml)
[![Test](https://github.com/ciriti/URLs-Processor/actions/workflows/test.yml/badge.svg)](https://github.com/ciriti/URLs-Processor/actions/workflows/test.yml)

# URLs Processor

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
