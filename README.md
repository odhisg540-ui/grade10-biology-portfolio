# Grade 10 Biology Project Assessment Portfolio

This is a starter version of a teacher-managed portfolio for 9 Grade 10 Biology learners.

## What is included

- Public class portfolio homepage
- 9 learner portfolio cards
- Individual learner portfolio pages
- Teacher dashboard interface
- Editable project information
- Editable learner assessment fields
- Mobile-friendly layout
- A local data-saving prototype using browser storage

## Important: turning it into a truly online dashboard

The included prototype saves data in the browser. For a real online system where your data and uploaded photos are stored securely and available from any device, connect it to Supabase.

Recommended free architecture:

- Frontend: GitHub Pages (free)
- Database: Supabase (free tier)
- Teacher login: Supabase Auth
- Photos/documents: Supabase Storage
- Learner records and scores: Supabase Postgres

### Supabase tables

Create a `learners` table with:
- id
- name
- code
- topic
- proposal
- materials
- method
- observations
- findings
- discussion
- conclusion
- reflection
- teacher_comment
- score
- photo_url

Create a `project_settings` table with:
- id
- title
- description

Create a `evidence` table with:
- id
- learner_id
- file_url
- caption
- uploaded_at

### Security

Do not put a database password in the website code. Use Supabase's public anon key with Row Level Security policies and teacher authentication. Keep learner information to what is necessary for the school project and avoid publishing sensitive personal information publicly.

## Next development step

Replace the localStorage functions in `app.js` with Supabase queries and Storage uploads. Then publish the static files on GitHub Pages.
