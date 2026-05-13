-- STEP9: 하루 학습 고정 배정 테이블
-- Supabase SQL Editor에서 전체 실행하세요.

create table if not exists public.daily_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  assigned_date date not null default current_date,
  created_at timestamptz default now(),
  unique(user_id, assigned_date)
);

alter table public.daily_assignments enable row level security;

drop policy if exists "Users can read own daily assignments" on public.daily_assignments;
create policy "Users can read own daily assignments"
on public.daily_assignments for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own daily assignments" on public.daily_assignments;
create policy "Users can insert own daily assignments"
on public.daily_assignments for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own daily assignments" on public.daily_assignments;
create policy "Users can update own daily assignments"
on public.daily_assignments for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists daily_assignments_user_date_idx
on public.daily_assignments(user_id, assigned_date);
