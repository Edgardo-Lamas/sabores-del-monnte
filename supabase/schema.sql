-- ================================================================
--  Sabores del Monte — Schema inicial
--  Pegar en: Supabase → SQL Editor → New query → Run
-- ================================================================


-- ─── 1. STOCK ────────────────────────────────────────────────────
-- Un registro por cada combinación producto + presentación

create table if not exists stock (
  id               uuid primary key default gen_random_uuid(),
  product_id       text not null,          -- ej: "miel-multifloral"
  presentacion     text not null,          -- ej: "500 g"
  cantidad         integer not null default 0 check (cantidad >= 0),
  alerta_minima    integer not null default 5,  -- avisa cuando baja de este número
  updated_at       timestamptz default now()
);

-- Índice para buscar rápido por producto
create index if not exists stock_product_id_idx on stock (product_id);

-- Trigger: actualiza updated_at automáticamente
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger stock_updated_at
  before update on stock
  for each row execute function update_updated_at();


-- ─── 2. SOLICITUDES (Club Origen) ────────────────────────────────
-- Formulario de solicitud de acceso mayorista

create table if not exists solicitudes (
  id              uuid primary key default gen_random_uuid(),
  nombre          text not null,
  email           text not null,
  telefono        text,
  negocio         text,                    -- nombre del negocio
  tipo_negocio    text,                    -- restaurante, tienda, hotel, etc.
  mensaje         text,
  estado          text not null default 'pendiente'
                  check (estado in ('pendiente', 'aprobado', 'rechazado')),
  created_at      timestamptz default now()
);

create index if not exists solicitudes_estado_idx on solicitudes (estado);
create index if not exists solicitudes_created_at_idx on solicitudes (created_at desc);


-- ─── 3. PEDIDOS ──────────────────────────────────────────────────
-- Historial de pedidos confirmados por WhatsApp

create table if not exists pedidos (
  id              uuid primary key default gen_random_uuid(),
  cliente_nombre  text,
  cliente_tel     text,                    -- número de WhatsApp
  items           jsonb not null,          -- [{ product_id, presentacion, qty, precio }]
  total           numeric(12,2) not null,
  estado          text not null default 'recibido'
                  check (estado in ('recibido', 'en_preparacion', 'enviado', 'entregado', 'cancelado')),
  notas           text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists pedidos_estado_idx on pedidos (estado);
create index if not exists pedidos_created_at_idx on pedidos (created_at desc);

create trigger pedidos_updated_at
  before update on pedidos
  for each row execute function update_updated_at();


-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────
-- Solo el admin puede leer/escribir (anon no tiene acceso directo)

alter table stock       enable row level security;
alter table solicitudes enable row level security;
alter table pedidos     enable row level security;

-- Solicitudes: el formulario público puede insertar, no leer
create policy "insertar_solicitud" on solicitudes
  for insert to anon with check (true);

-- Stock y pedidos: solo service_role (admin) puede operar
-- (se agrega política de admin cuando conectemos el panel)



-- ─── MIGRACIÓN 001 — columnas extra en solicitudes ───────────────
-- Ejecutar si la tabla solicitudes ya existe sin estas columnas

alter table solicitudes add column if not exists empresa   text;
alter table solicitudes add column if not exists cuit      text;
alter table solicitudes add column if not exists provincia text;
alter table solicitudes add column if not exists volumen   text;


-- ─── MIGRACIÓN 002 — tabla de usuarios admin ─────────────────────
-- Ejecutar en: Supabase → SQL Editor → New query → Run

create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  nombre        text not null,
  empresa       text,
  rol           text not null default 'mayorista'
                check (rol in ('admin', 'mayorista', 'pending')),
  activo        boolean not null default true,
  created_at    timestamptz default now()
);

alter table users enable row level security;

-- Solo service_role puede leer usuarios (nunca el cliente browser)
-- (sin políticas anon = nadie desde el browser puede acceder)

-- ─── INSERT usuario admin ─────────────────────────────────────────
-- Reemplazá el password_hash si querés cambiar la contraseña.
-- Contraseña actual: SaboresMonte2025!

insert into users (email, password_hash, nombre, empresa, rol)
values (
  'admin@sabores.com',
  '$2b$12$bCKtlke7jzxtH0ZBsqwtH.kM9ZeOrrXTGWofvm.jwYQQNDkBt1nAm',
  'Administrador',
  'Sabores del Monte',
  'admin'
)
on conflict (email) do nothing;
