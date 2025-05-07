const app = require("./app");
const port = process.env.PORT || 3001;
const http = require('http');
const httpServer = http.createServer(app);
httpServer.listen(port, () => { console.log(`HTTP Server running on port ${port}`); });