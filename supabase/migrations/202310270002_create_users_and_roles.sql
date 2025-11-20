CREATE TYPE role AS ENUM ('client', 'professional');

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT NOW()
);