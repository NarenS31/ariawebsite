create table if not exists activity_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id uuid not null unique,
  answers jsonb not null check (jsonb_typeof(answers) = 'array' and jsonb_array_length(answers) = 8),
  agree_count int not null check (agree_count between 0 and 8),
  role text check (role in ('Teacher','Researcher','Student','Parent','Other')),
  consent boolean not null check (consent = true),
  build text,
  source text
);
