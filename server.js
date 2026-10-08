import express from "express";
import messagesRouter from "./routes/api/v1/messages.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: "text/*" }));

app.use("/api/v1/messages", messagesRouter);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
