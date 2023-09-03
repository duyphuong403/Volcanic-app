const express = require("express");
const cors = require("cors");
const next = require("next");
const requestIp = require("request-ip");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
let SERVER_READY = false; // indicate server ready to serve request

const corsOptions = {
  origin: [],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "*",
};

const app = next({ dev, hostname: "0.0.0.0", port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // readiness and livenessProbe check
  server.get("/livez", (req, res) => {
    if (SERVER_READY) res.send("OK");
    else res.status(503).send("Not ready");
  });

  server.get("/readyz", (req, res) => {
    if (SERVER_READY) res.send("OK");
    else res.status(503).send("Not ready");
  });

  server.options("*", cors(corsOptions));
  server.use(cors(corsOptions));

  // all default to Nextjs
  server.all("*", (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    req.headers["client-ip"] = clientIp;

    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`\n\n>> ✅ App Ready on ${port}`);
  });
});
