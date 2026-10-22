-- Eseguire nel SQL Editor di Supabase V2. Non modifica PIN o login.
create table if not exists public.socosocial_posts (
 id bigint generated always as identity primary key,
 author_id uuid not null references auth.users(id) on delete cascade,
 body text not null check (char_length(trim(body)) between 1 and 1000),
 created_at timestamptz not null default now()
);
create table if not exists public.socosocial_comments (
 id bigint generated always as identity primary key,
 post_id bigint not null references public.socosocial_posts(id) on delete cascade,
 author_id uuid not null references auth.users(id) on delete cascade,
 body text not null check (char_length(trim(body)) between 1 and 500),
 created_at timestamptz not null default now()
);
create table if not exists public.socosocial_likes (
 post_id bigint not null references public.socosocial_posts(id) on delete cascade,
 author_id uuid not null references auth.users(id) on delete cascade,
 primary key (post_id, author_id)
);
create index if not exists socosocial_posts_created_idx on public.socosocial_posts(created_at desc);
create index if not exists socosocial_comments_post_idx on public.socosocial_comments(post_id,created_at);
alter table public.socosocial_posts enable row level security;
alter table public.socosocial_comments enable row level security;
alter table public.socosocial_likes enable row level security;
-- L'utente deve avere una squadra associata, non solo una sessione anonima.
create policy "posts_read" on public.socosocial_posts for select to authenticated using (exists(select 1 from public.sococup_profiles p where p.user_id = (select auth.uid())));
create policy "posts_write" on public.socosocial_posts for insert to authenticated with check (author_id = (select auth.uid()) and exists(select 1 from public.sococup_profiles p where p.user_id = (select auth.uid())));
create policy "posts_delete" on public.socosocial_posts for delete to authenticated using (author_id = (select auth.uid()));
create policy "comments_read" on public.socosocial_comments for select to authenticated using (exists(select 1 from public.sococup_profiles p where p.user_id = (select auth.uid())));
create policy "comments_write" on public.socosocial_comments for insert to authenticated with check (author_id = (select auth.uid()) and exists(select 1 from public.sococup_profiles p where p.user_id = (select auth.uid())));
create policy "comments_delete" on public.socosocial_comments for delete to authenticated using (author_id = (select auth.uid()));
create policy "likes_read" on public.socosocial_likes for select to authenticated using (exists(select 1 from public.sococup_profiles p where p.user_id = (select auth.uid())));
create policy "likes_write" on public.socosocial_likes for insert to authenticated with check (author_id = (select auth.uid()) and exists(select 1 from public.sococup_profiles p where p.user_id = (select auth.uid())));
create policy "likes_delete" on public.socosocial_likes for delete to authenticated using (author_id = (select auth.uid()));
grant select,insert,delete on public.socosocial_posts,public.socosocial_comments,public.socosocial_likes to authenticated;
grant usage,select on all sequences in schema public to authenticated;

-- Espone solo nomi delle squadre degli autori, mai PIN o dati privati.
create or replace function public.socosocial_author_names()
returns table(user_id uuid, team_id integer)
language sql stable security definer set search_path = ''
as $$
 select p.user_id, p.team_id from public.sococup_profiles p
 where exists(select 1 from public.sococup_profiles me where me.user_id = auth.uid());
$$;
revoke all on function public.socosocial_author_names() from public;
grant execute on function public.socosocial_author_names() to authenticated;
