import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes';
// import albumRoutes from './routes/albumRoutes';
// import photoRoutes from './routes/photoRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/albums', albumRoutes);
// app.use('/api/photos', photoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('listening on porfftff');
  console.log(`Server running on port ${PORT}`);
});
