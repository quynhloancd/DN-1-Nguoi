-- Thêm cột zalo và resource cho bảng leads để thu đầy đủ dữ liệu phễu
-- (Số Zalo của khách + tài nguyên miễn phí mà khách đã tải)

alter table public.leads add column if not exists zalo text;
alter table public.leads add column if not exists resource text;

-- Index để lọc theo tài nguyên đã tải
create index if not exists leads_resource_idx on public.leads(resource);
