import { createServer } from "@mswjs/http-middleware";
import { handlers } from "./handlers.mjs";

const host = process.env.EDITOR_MOCK_API_HOST || "127.0.0.1";
const port = Number(process.env.EDITOR_MOCK_API_PORT || "3005");

const app = createServer(...handlers);

app.use((req, res) => {
  res.status(404).json({
    message: `No mock handler for ${req.method} ${req.path}`,
  });
});

app.listen(port, host, () => {
  console.log(`editor mock API listening on http://${host}:${port}`);
});
