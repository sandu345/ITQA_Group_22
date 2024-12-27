# Project

## Description
This project contains automated tests for the Book API using Cucumber, Axios, and Chai.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the tests:**
   ```sh
   npm test
   ```

4. **View the test report:**
   ```sh
   npm run test:report
   ```

## Project Structure
- `src/step_definitions/`: Contains the step definitions for the Cucumber tests.
- `src/features/`: Contains the feature files for the Cucumber tests.
- `logs/`: Directory where request and response logs are stored.
- `reports/`: Directory where the test report is generated.

## Logging
Logs for each test run are stored in the `logs` directory. Each log file is named based on the test description.

## Test Report
After running the tests, an HTML report is generated in the `reports` directory. You can open this report in your browser to view the test results.

## Notes
- Ensure that the Book API server is running on `http://localhost:7081` before running the tests.
- Modify the credentials in the step definitions if necessary.
