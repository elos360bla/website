create table if not exists varden_pos_state (
    id bigint primary key,
    menu_items jsonb not null default '[]'::jsonb,
    menu_toppings jsonb not null default '[]'::jsonb,
    active_orders jsonb not null default '[]'::jsonb,
    sales_archive jsonb not null default '[]'::jsonb,
    ready_notifications jsonb not null default '[]'::jsonb,
    updated_at timestamptz not null default now()
);

insert into varden_pos_state (id)
values (1)
on conflict (id) do nothing;

alter table varden_pos_state enable row level security;

create policy "POS can read"
on varden_pos_state
for select
to anon
using (true);

create policy "POS can insert"
on varden_pos_state
for insert
to anon
with check (true);

create policy "POS can update"
on varden_pos_state
for update
to anon
using (true)
with check (true);

await db
    .from("varden_pos_state")
    .update({
        active_orders: orders,
        sales_archive: sales
    })
    .eq("id", 1);
