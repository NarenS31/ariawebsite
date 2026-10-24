create table if not exists interest_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  affiliation text not null check (char_length(affiliation) between 1 and 160),
  email text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  interest text not null check (char_length(interest) between 1 and 400),
  role text check (role in ('Teacher','Researcher','Student','Parent','Other')),
  consent boolean not null check (consent = true),
  source text
);
