-- STEP15: 사용자 대화 추가 기능 DB 확장
-- Supabase SQL Editor에서 전체 실행하세요.

alter table public.conversations
add column if not exists created_by uuid references auth.users(id) on delete cascade;

alter table public.conversations
add column if not exists source text not null default 'system';

create index if not exists conversations_created_by_idx
on public.conversations(created_by);

-- 기존 콘텐츠는 system으로 유지
update public.conversations
set source = 'system'
where source is null;

-- 사용자는 system 콘텐츠 또는 본인 콘텐츠만 읽기 가능
drop policy if exists "Anyone can read conversations" on public.conversations;
drop policy if exists "Users can read allowed conversations" on public.conversations;

create policy "Users can read allowed conversations"
on public.conversations for select
using (
  source = 'system'
  or created_by = auth.uid()
);

-- 사용자는 본인 콘텐츠만 추가 가능
drop policy if exists "Users can insert own conversations" on public.conversations;
create policy "Users can insert own conversations"
on public.conversations for insert
with check (
  created_by = auth.uid()
  and source = 'user'
);

-- 사용자는 본인 콘텐츠만 수정 가능
drop policy if exists "Users can update own conversations" on public.conversations;
create policy "Users can update own conversations"
on public.conversations for update
using (
  created_by = auth.uid()
  and source = 'user'
)
with check (
  created_by = auth.uid()
  and source = 'user'
);

-- 사용자는 본인 콘텐츠만 삭제 가능
drop policy if exists "Users can delete own conversations" on public.conversations;
create policy "Users can delete own conversations"
on public.conversations for delete
using (
  created_by = auth.uid()
  and source = 'user'
);

-- dialogue_lines는 본인 대화에 대해서만 추가/수정/삭제 가능
drop policy if exists "Users can insert lines for own conversations" on public.dialogue_lines;
create policy "Users can insert lines for own conversations"
on public.dialogue_lines for insert
with check (
  exists (
    select 1
    from public.conversations c
    where c.id = conversation_id
      and c.created_by = auth.uid()
      and c.source = 'user'
  )
);

drop policy if exists "Users can update lines for own conversations" on public.dialogue_lines;
create policy "Users can update lines for own conversations"
on public.dialogue_lines for update
using (
  exists (
    select 1
    from public.conversations c
    where c.id = conversation_id
      and c.created_by = auth.uid()
      and c.source = 'user'
  )
)
with check (
  exists (
    select 1
    from public.conversations c
    where c.id = conversation_id
      and c.created_by = auth.uid()
      and c.source = 'user'
  )
);

drop policy if exists "Users can delete lines for own conversations" on public.dialogue_lines;
create policy "Users can delete lines for own conversations"
on public.dialogue_lines for delete
using (
  exists (
    select 1
    from public.conversations c
    where c.id = conversation_id
      and c.created_by = auth.uid()
      and c.source = 'user'
  )
);
