-- Bảng lưu leads từ trang /lo-trinh và các form thu email
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  source      text default 'lo-trinh',
  subscribed  boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Index để tìm kiếm nhanh
create index if not exists leads_email_idx on public.leads(email);
create index if not exists leads_source_idx on public.leads(source);
create index if not exists leads_created_at_idx on public.leads(created_at desc);

-- Trigger cập nhật updated_at tự động
create or replace function public.set_leads_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.set_leads_updated_at();

-- RLS: chỉ admin/service_role được đọc
alter table public.leads enable row level security;

drop policy if exists "Admin reads leads" on public.leads;
create policy "Admin reads leads"
  on public.leads for select
  using (auth.role() = 'service_role');

drop policy if exists "Service inserts leads" on public.leads;
create policy "Service inserts leads"
  on public.leads for insert
  with check (true);

drop policy if exists "Service updates leads" on public.leads;
create policy "Service updates leads"
  on public.leads for update
  using (true);
