import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js default body parsing (so we can handle the file upload manually)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(), 'public', 'uploads', 'images');
  const musicDir = path.join(process.cwd(), 'public', 'uploads', 'music');
  const metadataFilePath = path.join(process.cwd(), 'public', 'uploads', 'metadata.json');
  const defaultSong = '/uploads/music/song1.mp3'; // Default song path if no song is uploaded

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir, { recursive: true });
  }

  const form = formidable({
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), 'public', 'uploads'),
    filename: (originalName, ext) => `${Date.now()}_${originalName}${ext}`,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error with file upload.' });
    }

    // Ensure image file is uploaded
    if (!files.image) {
      return res.status(400).json({ error: 'An image file is required.' });
    }

    const imageFile = files.image[0];
    const imagePath = path.join(imagesDir, imageFile.originalFilename);
    fs.renameSync(imageFile.filepath, imagePath);

    // Handle song upload
    let musicPath = defaultSong; // Default song path
    if (files.song) {
      const songFile = files.song[0];
      const songPath = path.join(musicDir, songFile.originalFilename);
      fs.renameSync(songFile.filepath, songPath);
      musicPath = `/uploads/music/${songFile.originalFilename}`;
    }

    // Read existing metadata (if any)
    let metadata = [];
    if (fs.existsSync(metadataFilePath)) {
      const rawData = fs.readFileSync(metadataFilePath, 'utf-8');
      metadata = JSON.parse(rawData);
    }

    // Add new mapping to metadata
    const newMapping = {
      img: `/uploads/images/${imageFile.originalFilename}`,
      song: musicPath,
    };
    metadata.push(newMapping);

    // Save updated metadata
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));

    res.status(200).json({
      message: 'Upload successful.',
      data: newMapping,
    });
  });
}
