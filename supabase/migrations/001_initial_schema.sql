-- ============================================================
--  Sabores de Monte — Schema inicial
--  Ejecutar en: Supabase > SQL Editor
-- ============================================================

-- Extension para UUIDs
create extension if not exists "uuid-ossp";

-- ============================================================
--  TABLA: users
--  Usuarios registrados. Rol controla el acceso a la tienda.
-- ============================================================
create table public.users (
  id            uuid        primary key default uuid_generate_v4(),
  email         text        unique not null,
  password_hash text        not null,
  nombre        text        not null,
  empresa       text,
  cuit          text,
  telefono      text,
  provincia     text,
  rol           text        not null default 'pending'
                            check (rol in ('pending', 'mayorista', 'admin')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Índice para login rápido por email
create index idx_users_email on public.users (email);

-- ============================================================
--  TABLA: productos
--  Catálogo de productos del negocio.
-- ============================================================
create table public.productos (
  id          uuid    primary key default uuid_generate_v4(),
  slug        text    unique not null,
  nombre      text    not null,
  categoria   text    not null check (categoria in ('miel', 'aceite', 'sal', 'otro')),
  descripcion text,
  imagen_url  text,
  badge       text,
  activo      boolean not null default true,
  orden       int     not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
--  TABLA: precios
--  Precios escalonados por producto y presentación.
--  Escala 1 = 1-10 kg | 2 = 11-50 kg | 3 = 51-100 kg | 4 = +100 kg
-- ============================================================
create table public.precios (
  id             uuid         primary key default uuid_generate_v4(),
  producto_id    uuid         not null references public.productos (id) on delete cascade,
  presentacion   text         not null,          -- "500g", "1kg", "250ml", etc.
  kg_unit        numeric(8,3) not null default 1, -- kg equivalentes para cálculo de escala
  precio_escala_1 numeric(10,2) not null,
  precio_escala_2 numeric(10,2) not null,
  precio_escala_3 numeric(10,2) not null,
  precio_escala_4 numeric(10,2) not null,
  activo         boolean      not null default true,
  created_at     timestamptz  not null default now(),

  unique (producto_id, presentacion)
);

-- ============================================================
--  TABLA: pedidos
--  Pedidos mayoristas. Estado controlado manualmente por admin.
-- ============================================================
create table public.pedidos (
  id         uuid         primary key default uuid_generate_v4(),
  user_id    uuid         not null references public.users (id) on delete restrict,
  items_json jsonb        not null,    -- snapshot de los items al momento del pedido
  escala     text,                     -- escala aplicada ("11 – 50 kg", etc.)
  total      numeric(12,2) not null,
  estado     text         not null default 'pendiente'
             check (estado in ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')),
  notas      text,
  created_at timestamptz  not null default now(),
  updated_at timestamptz  not null default now()
);

create index idx_pedidos_user_id on public.pedidos (user_id);
create index idx_pedidos_estado  on public.pedidos (estado);

-- ============================================================
--  TABLA: solicitudes
--  Solicitudes de acceso mayorista (formulario /distribuidores).
-- ============================================================
create table public.solicitudes (
  id         uuid        primary key default uuid_generate_v4(),
  datos_json jsonb       not null,   -- todos los campos del formulario
  estado     text        not null default 'pendiente'
             check (estado in ('pendiente', 'aprobada', 'rechazada')),
  notas      text,                   -- notas internas del admin
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_solicitudes_estado on public.solicitudes (estado);

-- ============================================================
--  ROW LEVEL SECURITY
-- ============================================================

-- Activar RLS en todas las tablas
alter table public.users      enable row level security;
alter table public.productos  enable row level security;
alter table public.precios    enable row level security;
alter table public.pedidos    enable row level security;
alter table public.solicitudes enable row level security;

-- Política: solo el service_role puede leer/escribir users
-- (la app usa service_role en el server, no el cliente browser)
create policy "service_role_only_users"
  on public.users
  using (auth.role() = 'service_role');

-- Política: productos y precios son legibles por usuarios autenticados
create policy "authenticated_read_productos"
  on public.productos for select
  using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "service_write_productos"
  on public.productos for all
  using (auth.role() = 'service_role');

create policy "authenticated_read_precios"
  on public.precios for select
  using (auth.role() = 'authenticated' or auth.role() = 'service_role');

create policy "service_write_precios"
  on public.precios for all
  using (auth.role() = 'service_role');

-- Política: cada usuario ve solo sus propios pedidos; admin ve todos (via service_role)
create policy "user_own_pedidos"
  on public.pedidos for select
  using (auth.uid()::text = user_id::text or auth.role() = 'service_role');

create policy "service_write_pedidos"
  on public.pedidos for insert
  using (auth.role() = 'service_role');

create policy "service_update_pedidos"
  on public.pedidos for update
  using (auth.role() = 'service_role');

-- Política: solicitudes solo accesibles por service_role
create policy "service_role_only_solicitudes"
  on public.solicitudes
  using (auth.role() = 'service_role');

-- ============================================================
--  DATOS INICIALES — Productos y precios de ejemplo
--  (Ajustar precios reales antes de producción)
-- ============================================================

insert into public.productos (slug, nombre, categoria, descripcion, imagen_url, badge, orden)
values
  ('miel-natural',      'Miel 100% Natural',    'miel',   'Miel multifloral de las sierras de Córdoba. Extracción propia, sin pasteurizar.', '/img/miel/miel-1.png',    'Producto principal', 1),
  ('aceite-oliva-unico','Aceite de Oliva ÚNICO', 'aceite', 'AOVE con Ajo Negro líquido. Sin conservantes ni colorantes.',                     '/img/oliva/oliva-1.png',  null,                  2),
  ('aceite-ajo-negro',  'AOVE Ajo Negro',        'aceite', 'Aceite de Oliva Virgen Extra macerado con Ajo Negro.',                            '/img/oliva/oliva-2.png',  null,                  3),
  ('sal-de-campo',      'Sal de Campo',          'sal',    'Mezclas artesanales con especias. Variedades: Original, Fina, Ahumada, Marina.',  '/img/sal/sal-1.png',      'Sin TACC',            4);

-- Precios: miel-natural
insert into public.precios (producto_id, presentacion, kg_unit, precio_escala_1, precio_escala_2, precio_escala_3, precio_escala_4)
select p.id, '500 g',  0.5,  3200,  2900,  2600,  2300 from public.productos p where p.slug = 'miel-natural'
union all
select p.id, '1 kg',   1,    5800,  5200,  4700,  4200 from public.productos p where p.slug = 'miel-natural'
union all
select p.id, '5 kg',   5,    27000, 24500, 22000, 19500 from public.productos p where p.slug = 'miel-natural'
union all
select p.id, '20 kg',  20,   98000, 90000, 82000, 74000 from public.productos p where p.slug = 'miel-natural';

-- Precios: aceite-oliva-unico
insert into public.precios (producto_id, presentacion, kg_unit, precio_escala_1, precio_escala_2, precio_escala_3, precio_escala_4)
select p.id, '500 ml', 0.5, 4800, 4400, 4000, 3600 from public.productos p where p.slug = 'aceite-oliva-unico';

-- Precios: aceite-ajo-negro
insert into public.precios (producto_id, presentacion, kg_unit, precio_escala_1, precio_escala_2, precio_escala_3, precio_escala_4)
select p.id, '250 ml',   0.25, 2800,  2550,  2300,  2050  from public.productos p where p.slug = 'aceite-ajo-negro'
union all
select p.id, 'Pack ×6',  1.5,  15500, 14200, 13000, 11800 from public.productos p where p.slug = 'aceite-ajo-negro';

-- Precios: sal-de-campo
insert into public.precios (producto_id, presentacion, kg_unit, precio_escala_1, precio_escala_2, precio_escala_3, precio_escala_4)
select p.id, '250 g', 0.25, 1600, 1450, 1300, 1150 from public.productos p where p.slug = 'sal-de-campo';
