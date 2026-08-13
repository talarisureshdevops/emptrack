// ============================================
// EmpTrack — Main Express Server
// ============================================
require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const employeeRoutes   = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const statsRoutes      = require('./routes/statsRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── SECURITY & MIDDLEWARE ────────────────────
app.use(helmet());
app.use(cors({
  origin:      process.env.FRONTEND_ORIGIN || '*',
  methods:     ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── HEALTH CHECK ─────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'EmpTrack API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ─── API ROUTES ───────────────────────────────
app.use('/api/employees',   employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/stats',       statsRoutes);

// ─── 404 HANDLER ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ─── GLOBAL ERROR HANDLER ────────────────────
app.use(errorHandler);

// ─── START SERVER ────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   🚀  EmpTrack API Running           ║
  ║   Port   : ${PORT}                      ║
  ║   Mode   : ${process.env.NODE_ENV}          ║
  ║   Health : http://localhost:${PORT}/health ║
  ╚══════════════════════════════════════╝
  `);
});