const express = require('express');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const examplesDir = path.join(__dirname, '..', 'examples');

// Serve public assets (manifest, icons, service worker)
app.use(express.static(path.join(__dirname, '..', 'public')));

const runners = {
  python: (name, cb) => execFile('python3', [path.join(examplesDir, 'python', 'hello.py'), name], cb),
  javascript: (name, cb) => execFile('node', [path.join(examplesDir, 'javascript', 'hello.js'), name], cb),
  typescript: (name, cb) => execFile('npx', ['ts-node', path.join(examplesDir, 'typescript', 'hello.ts'), name], cb),
  go: (name, cb) => execFile('go', ['run', path.join(examplesDir, 'go', 'hello.go'), name], cb),
};

app.get('/', (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#3367d6" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icon.svg" />
    <title>ZonasAI Examples</title>
  </head>
  <body>
    <h2>ZonasAI Examples</h2>
    <p>Use <code>/run?lang=python|javascript|typescript|go&name=YourName</code></p>
    <p>To install on mobile: open this page in your phone browser and choose "Add to Home Screen" (Android/iOS).</p>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(()=>{});
      }
    </script>
  </body>
</html>`);
});

app.get('/run', (req, res) => {
  const lang = (req.query.lang || '').toLowerCase();
  const name = req.query.name || 'World';
  if (!runners[lang]) {
    return res.status(400).json({ error: 'unsupported language' });
  }

  runners[lang](name, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: err.message, stderr });
    }
    res.json({ output: stdout.trim() });
  });
});

app.listen(port, () => {
  console.log(`ZonasAI server listening on http://localhost:${port}`);
});
