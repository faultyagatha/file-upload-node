import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import multer, { FileFilterCallback } from 'multer';

export const app = express();

app.use(cors());
//serve static files
app.use('/public', express.static(process.cwd() + '/public'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

//upload only images
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ storage, fileFilter });

//serve index.html
app.get('/', (req: Request, res: Response) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
  try {
    return res.status(201).json({
      message: 'File uploded successfully'
    });
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/metadata', multer().single('upfile'), (req: Request, res: Response) => {
  // console.log(req.file);
  const fileData = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  res.json(fileData);
})