-- 매일 10분 영어 대화 앱 Supabase Schema
-- Supabase SQL Editor에서 전체 실행하세요.

create extension if not exists "pgcrypto";

-- 카테고리
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  order_no int default 0,
  created_at timestamptz default now()
);

-- 대화
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  situation text not null,
  difficulty text not null default 'beginner',
  turn_count int not null default 8,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- 대화 줄 단위
create table if not exists public.dialogue_lines (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  speaker text not null check (speaker in ('A', 'B')),
  line_order int not null,
  english_text text not null,
  korean_text text not null,
  created_at timestamptz default now()
);

-- 학습 기록
create table if not exists public.study_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  studied_date date not null default current_date,
  is_completed boolean not null default true,
  study_count int not null default 1,
  last_studied_at timestamptz default now(),
  created_at timestamptz default now(),
  unique(user_id, conversation_id, studied_date)
);

-- 복습
create table if not exists public.review_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, conversation_id)
);

alter table public.categories enable row level security;
alter table public.conversations enable row level security;
alter table public.dialogue_lines enable row level security;
alter table public.study_records enable row level security;
alter table public.review_items enable row level security;

-- 누구나 콘텐츠 읽기 가능
drop policy if exists "Anyone can read categories" on public.categories;
create policy "Anyone can read categories"
on public.categories for select
using (true);

drop policy if exists "Anyone can read conversations" on public.conversations;
create policy "Anyone can read conversations"
on public.conversations for select
using (true);

drop policy if exists "Anyone can read dialogue lines" on public.dialogue_lines;
create policy "Anyone can read dialogue lines"
on public.dialogue_lines for select
using (true);

-- 본인 학습 기록만 관리 가능
drop policy if exists "Users can read own study records" on public.study_records;
create policy "Users can read own study records"
on public.study_records for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own study records" on public.study_records;
create policy "Users can insert own study records"
on public.study_records for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own study records" on public.study_records;
create policy "Users can update own study records"
on public.study_records for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 본인 복습 목록만 관리 가능
drop policy if exists "Users can read own reviews" on public.review_items;
create policy "Users can read own reviews"
on public.review_items for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own reviews" on public.review_items;
create policy "Users can insert own reviews"
on public.review_items for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own reviews" on public.review_items;
create policy "Users can delete own reviews"
on public.review_items for delete
using (auth.uid() = user_id);

-- 샘플 콘텐츠
insert into public.categories (name, description, order_no)
values
('음식 배달 주문하기', '배달 음식을 고르고 주문할 때 쓰는 실생활 대화', 1),
('택배 받기', '택배 기사님이나 이웃과 나눌 수 있는 대화', 2),
('카페 주문하기', '카페에서 자연스럽게 주문하는 대화', 3)
on conflict do nothing;

with category as (
  select id from public.categories where name = '음식 배달 주문하기' limit 1
), inserted_conversation as (
  insert into public.conversations (category_id, title, situation, difficulty, turn_count)
  select id, '샌드위치 배달 주문하기', '친구와 함께 가볍게 먹을 음식을 고르는 상황', 'beginner', 8
  from category
  where not exists (
    select 1 from public.conversations where title = '샌드위치 배달 주문하기'
  )
  returning id
)
insert into public.dialogue_lines (conversation_id, speaker, line_order, english_text, korean_text)
select id, speaker, line_order, english_text, korean_text
from inserted_conversation,
(values
  ('A', 1, 'Hey, do you have a second?', '잠깐 시간 있어?'),
  ('B', 2, 'Sure. What’s up?', '응. 무슨 일이야?'),
  ('A', 3, 'I’m trying to order food, but I’m not sure what to get.', '음식 주문하려는데 뭘 시킬지 잘 모르겠어.'),
  ('B', 4, 'What are you in the mood for?', '뭐 먹고 싶은 기분인데?'),
  ('A', 5, 'Maybe something simple. Nothing too heavy.', '간단한 거. 너무 무겁지 않은 걸로.'),
  ('B', 6, 'How about a sandwich or a salad?', '샌드위치나 샐러드는 어때?'),
  ('A', 7, 'A sandwich sounds good.', '샌드위치 괜찮겠다.'),
  ('B', 8, 'Great. I’ll order one for you too.', '좋아. 네 것도 같이 주문할게.')
) as lines(speaker, line_order, english_text, korean_text);
