```markdown
# BetaCrew Mock Exchange Client

## Dependencies

Ensure you have Node.js version 16.17.0 or higher installed.

Install the required npm packages:

```bash
npm install
```

## Running the BetaCrew Exchange Server

1. **Start the BetaCrew Exchange Server**:

   Navigate to the directory where `main.js` is located:

   ```bash
   cd betacrew_exchange_server
   ```

   Start the server with:

   ```bash
   node main.js
   ```

   This will start the BetaCrew exchange server on `localhost` at port `3000`.

## Running the Client

2. **Run the Client**:

   Once the server is up and running, execute the client script with Node.js:

   ```bash
   node client.js
   ```

   The client will connect to the server, request stock ticker data, and generate `output.json` containing the received data.
```