-- Create Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  phone text unique,
  language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Create Chat History Table
create table public.chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  role text not null check (role in ('user', 'model')),
  content text,
  audio_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Chat
alter table public.chat_history enable row level security;

create policy "Users can view own chat" on chat_history
  for select using (auth.uid() = user_id);

create policy "Users can insert own chat" on chat_history
  for insert with check (auth.uid() = user_id);
