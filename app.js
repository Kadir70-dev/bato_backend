const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointmentRoutes');



dotenv.config();
const app = express();
app.use(cors({
  origin: '*', // <-- for testing; restrict this in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Incoming request`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});
app.get('/', (req, res) => {
  res.send('Welcome to Bato Clinic API');
});
// app.use('/api/users', require('./routes/user.routes'));
// app.use('/api/services', require('./routes/services.routes'));

db.sequelize.sync().then(() => console.log("MySQL connected"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
