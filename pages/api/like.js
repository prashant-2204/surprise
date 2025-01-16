import fs from "fs";
import path from "path";

export default function handler(req, res) {

  
  if (req.method === "POST") {
    const { img } = req.body;

    try {
      const dbPath = path.join(process.cwd(), "db.json");
      const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(
          dbPath,
          JSON.stringify({ likes: {}, comments: {} }, null, 2),
          "utf-8"
        );
      }

      if (!data.likes[img]) data.likes[img] = 0;
      data.likes[img] += 1;

      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");

      res.status(200).json({ likes: data.likes[img] });
    } catch (error) {
      console.error("Error updating likes:", error);
      res.status(500).json({ error: "Failed to update likes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
