# Log Ingester Query Interface

This is the frontend for the Log Ingester, providing a user interface to ingest, query, and analyze logs.

## Features

- **Add Query:** Dynamically add queries by selecting a log field and entering a corresponding value.
- **Search Logs:** Execute queries and view the search results.
- **JSON Output:** Display search results in a readable JSON format.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vrutik2809/log-ingester-query-interface.git
   ```

2. Navigate to the project directory:

   ```bash
   cd log-ingester-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set the PORT in `.env` file

   ```bash
    PORT=3456
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The application will be running at http://localhost:3456.

## Usage

1. Open your web browser and go to http://localhost:3456.

2. Use the interface to add queries by selecting log fields and entering values.

3. Click the "Add Query" button to add more queries.

4. Click the "Search" button to execute the queries and view the search results.

5. JSON output for each log entry is displayed in a readable format.
