import express from 'express';
import router from '../routes/routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Welcome to Quick_credit apply for loan Now!',
    });
  });
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Quick Credit server On....'));

export default app;
