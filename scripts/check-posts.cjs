const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(process.cwd(), 'posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
console.log(`Checking ${files.length} posts...`);

let bad = 0;
const broken = [];
for (const f of files) {
  const full = path.join(dir, f);
  const raw = fs.readFileSync(full, 'utf8');
  try {
    const parsed = matter(raw);
    if (parsed.data && typeof parsed.data === 'object') {
      // check that date parses ok (some downstream code uses new Date(date))
      if (parsed.data.date) {
        const d = new Date(parsed.data.date);
        if (isNaN(d.getTime())) {
          broken.push({ file: f, kind: 'INVALID_DATE', detail: String(parsed.data.date) });
        }
      }
    }
  } catch (e) {
    bad++;
    broken.push({ file: f, kind: 'PARSE_ERROR', detail: e.message.split('\n').slice(0,3).join(' | ') });
  }
}
console.log(`\nTotal parse-broken: ${bad}`);
console.log(`Total flagged (parse + invalid date): ${broken.length}`);
for (const b of broken.slice(0, 50)) {
  console.log(`[${b.kind}] ${b.file}\n    -> ${b.detail}`);
}
