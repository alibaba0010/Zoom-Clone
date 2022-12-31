import express from "express";
import { v4 as uuidv4, v4 } from "uuid";
import { ExpressPeerServer } from "peer";

const app = express();
const peerServer = ExpressPeerServer(app, { debug: true });

app.set("view engine", "ejs");
app.use(express.static("public"));
app
  .use("/peerjs", peerServer)
  .get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
  })
  .get("/:room", (req, res, next) => {
    res.render("room", { roomId: req.params.room });
  });
export default app;
