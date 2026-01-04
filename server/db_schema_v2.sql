-- Profiles Table (Enhanced)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  phone text unique,
  language_code text default 'en',
  emergency_contacts jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Languages Table
create table if not exists public.languages (
  id serial primary key,
  code text unique not null,
  name text not null,
  native_name text not null,
  tts_voice text,
  is_active boolean default true
);

-- Insert Default Languages
insert into public.languages (code, name, native_name, tts_voice) values
  ('en', 'English', 'English', 'en-IN'),
  ('hi', 'Hindi', 'हिन्दी', 'hi-IN'),
  ('bn', 'Bengali', 'বাংলা', 'bn-IN'),
  ('te', 'Telugu', 'తెలుగు', 'te-IN'),
  ('ta', 'Tamil', 'தமிழ்', 'ta-IN'),
  ('ml', 'Malayalam', 'മലയാളം', 'ml-IN')
on conflict (code) do nothing;

-- RLS for Languages (Public read)
alter table public.languages enable row level security;
create policy "Public read languages" on languages for select using (true);

-- SOS Logs Table
create table if not exists public.sos_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  location jsonb not null, -- {lat: 12.3, lng: 76.5}
  status text default 'triggered', -- triggered, notified, resolved
  notified_contacts jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for SOS Logs
alter table public.sos_logs enable row level security;
create policy "Users can insert own sos logs" on sos_logs for insert with check (auth.uid() = user_id);
create policy "Users can view own sos logs" on sos_logs for select using (auth.uid() = user_id);

-- Chat History (Ensure exists)
create table if not exists public.chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  role text not null check (role in ('user', 'model')),
  content text,
  audio_url text, -- For potential voice inputs
  intent text, -- service, sos, etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Chat
alter table public.chat_history enable row level security;
create policy "Users can view own chat" on chat_history for select using (auth.uid() = user_id);
create policy "Users can insert own chat" on chat_history for insert with check (auth.uid() = user_id);
