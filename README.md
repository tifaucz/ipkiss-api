# Simple Banking API

This project implements a simple banking API with two endpoints:

- `GET /balance`: Retrieves the balance of a given account.
- `POST /event`: Processes banking events such as deposits, withdrawals, and transfers.

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/simple-banking-api.git
```

2. Navigate to the project directory:
```
cd simple-banking-api
```

3. Install the dependencies:
```
npm install
```

### Usage

1. Start the API server:
```
npm start
```

The API will be accessible at `http://localhost:3000`.

2. Use the following endpoints to interact with the API:

- `GET /balance?account_id=<account_id>`: Retrieves the balance of the specified account.
- `POST /event`: Processes a banking event. The request body should contain the event details.

### Running Tests

To run the tests, use the following command:
```
npm test
```
