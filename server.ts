import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Supabase PostgreSQL Connection Pool
const pool = new pg.Pool({
  user: 'postgres.veynfxmrnfufctwqhmrs',
  password: 'CALIPS##2345',
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

// Ensure tables exist on boot
async function ensureTables() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.profiles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        school TEXT,
        department TEXT,
        email TEXT NOT NULL,
        preferred_country TEXT DEFAULT 'Pakistan',
        preferred_city TEXT DEFAULT 'Karachi',
        saved_careers TEXT[] DEFAULT '{}',
        saved_universities TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS public.assessments (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        user_name TEXT,
        path_code VARCHAR(10) NOT NULL,
        primary_archetype TEXT NOT NULL,
        scores JSONB NOT NULL,
        ranked_categories TEXT[] NOT NULL,
        answers JSONB NOT NULL,
        preferred_country TEXT,
        preferred_city TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);
    console.log('✓ Supabase PostgreSQL tables verified (profiles, assessments)');
    client.release();
  } catch (err: any) {
    console.warn('Could not verify Supabase tables on boot:', err.message);
  }
}

ensureTables();

// ---------------- API Routes ----------------

// 1. Health check & DB status
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT current_database(), current_user, version()');
    const tableRes = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('profiles', 'assessments');
    `);
    client.release();

    res.json({
      status: 'connected',
      projectRef: 'veynfxmrnfufctwqhmrs',
      host: 'aws-0-ap-southeast-2.pooler.supabase.com',
      database: result.rows[0]?.current_database,
      tables: tableRes.rows.map((r: any) => r.table_name)
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. Save Assessment
app.post('/api/assessments', async (req: Request, res: Response) => {
  const {
    id,
    userId,
    userName,
    pathCode,
    primaryArchetype,
    scores,
    rankedCategories,
    answers,
    preferredCountry,
    preferredCity,
    createdAt
  } = req.body;

  const assessmentId = id || 'res-' + Date.now();

  try {
    const client = await pool.connect();
    await client.query(
      `
      INSERT INTO public.assessments 
        (id, user_id, user_name, path_code, primary_archetype, scores, ranked_categories, answers, preferred_country, preferred_city, created_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET
        scores = EXCLUDED.scores,
        ranked_categories = EXCLUDED.ranked_categories,
        answers = EXCLUDED.answers;
    `,
      [
        assessmentId,
        userId || null,
        userName || 'Guest Student',
        pathCode,
        primaryArchetype,
        JSON.stringify(scores),
        rankedCategories,
        JSON.stringify(answers),
        preferredCountry || null,
        preferredCity || null,
        createdAt || new Date().toISOString()
      ]
    );
    client.release();
    res.json({ success: true, id: assessmentId });
  } catch (err: any) {
    console.error('Error inserting assessment into Supabase:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Fetch User Assessments
app.get('/api/assessments', async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    const client = await pool.connect();
    let query = 'SELECT * FROM public.assessments';
    const params: any[] = [];

    if (userId) {
      query += ' WHERE user_id = $1';
      params.push(userId);
    }

    query += ' ORDER BY created_at DESC LIMIT 50';

    const result = await client.query(query, params);
    client.release();

    const formatted = result.rows.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      userName: row.user_name,
      pathCode: row.path_code,
      primaryArchetype: row.primary_archetype,
      scores: typeof row.scores === 'string' ? JSON.parse(row.scores) : row.scores,
      rankedCategories: row.ranked_categories,
      answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers || {},
      preferredCountry: row.preferred_country,
      preferredCity: row.preferred_city,
      createdAt: row.created_at
    }));

    res.json({ assessments: formatted });
  } catch (err: any) {
    console.error('Error fetching assessments from Supabase:', err);
    res.status(500).json({ assessments: [], error: err.message });
  }
});

// 4. Upsert Profile
app.post('/api/profiles/sync', async (req: Request, res: Response) => {
  const {
    id,
    name,
    email,
    age,
    school,
    department,
    preferredCountry,
    preferredCity,
    savedCareers,
    savedUniversities
  } = req.body;

  try {
    const client = await pool.connect();
    await client.query(
      `
      INSERT INTO public.profiles 
        (id, name, email, age, school, department, preferred_country, preferred_city, saved_careers, saved_universities, updated_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now())
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        age = EXCLUDED.age,
        school = EXCLUDED.school,
        department = EXCLUDED.department,
        preferred_country = EXCLUDED.preferred_country,
        preferred_city = EXCLUDED.preferred_city,
        saved_careers = EXCLUDED.saved_careers,
        saved_universities = EXCLUDED.saved_universities,
        updated_at = now();
    `,
      [
        id,
        name,
        email,
        Number(age) || 18,
        school || '',
        department || '',
        preferredCountry || 'Pakistan',
        preferredCity || 'Karachi',
        savedCareers || [],
        savedUniversities || []
      ]
    );
    client.release();
    res.json({ success: true });
  } catch (err: any) {
    console.error('Error syncing profile with Supabase:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Get Profile
app.get('/api/profiles/:id', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public.profiles WHERE id = $1', [
      req.params.id
    ]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const row = result.rows[0];
    res.json({
      id: row.id,
      name: row.name,
      email: row.email,
      age: row.age,
      school: row.school,
      department: row.department,
      preferredCountry: row.preferred_country,
      preferredCity: row.preferred_city,
      savedCareers: row.saved_careers || [],
      savedUniversities: row.saved_universities || [],
      createdAt: row.created_at
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Vite Middleware ----------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 PathCode live with Supabase PostgreSQL at http://localhost:${PORT}`);
  });
}

startServer();
