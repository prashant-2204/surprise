import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dbPath = path.join(process.cwd(), "db.json");

    // Check if the file exists, create it if it doesn't
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(
        dbPath,
        JSON.stringify({ likes: {}, comments: {} }, null, 2),
        "utf-8"
      );
    }

    // Read the data from the file
    const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
}
