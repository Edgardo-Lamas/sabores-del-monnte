import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * DEMO USERS — solo para desarrollo local.
 * Cuando Supabase esté configurado:
 *   1. Eliminar DEMO_USERS
 *   2. Descomentar el bloque "Consulta Supabase" en authorize()
 *   3. Agregar las variables de entorno en .env.local
 *
 * Credenciales demo:
 *   mayorista@demo.com  /  demo123
 *   admin@demo.com      /  admin123
 *   pending@demo.com    /  pending123
 */
const DEMO_USERS = [
  {
    id: "demo-1",
    email: "mayorista@demo.com",
    passwordPlain: "demo123",
    nombre: "Juan García",
    empresa: "Distribuidora El Monte",
    rol: "mayorista",
  },
  {
    id: "demo-2",
    email: "admin@demo.com",
    passwordPlain: "admin123",
    nombre: "Admin",
    empresa: "Sabores de Monte",
    rol: "admin",
  },
  {
    id: "demo-3",
    email: "pending@demo.com",
    passwordPlain: "pending123",
    nombre: "María López",
    empresa: "Tienda Gourmet MLP",
    rol: "pending",
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",      type: "email"    },
        password: { label: "Contraseña", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;

        /* ── DEMO MODE (development) ── */
        if (process.env.NODE_ENV !== "production") {
          const demo = DEMO_USERS.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );
          if (demo && demo.passwordPlain === password) {
            return {
              id:      demo.id,
              email:   demo.email,
              name:    demo.nombre,
              empresa: demo.empresa,
              rol:     demo.rol,
            };
          }
        }

        /* ── TODO: Consulta Supabase (descomentar cuando esté configurado) ──
        const { getSupabaseAdmin } = await import("@/lib/supabase");
        const supabase = getSupabaseAdmin();

        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, nombre, empresa, rol, password_hash")
          .eq("email", email.toLowerCase())
          .single();

        if (error || !user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) return null;

        return {
          id:      user.id,
          email:   user.email,
          name:    user.nombre,
          empresa: user.empresa,
          rol:     user.rol,
        };
        ── */

        return null;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.rol     = user.rol;
        token.empresa = user.empresa;
      }
      return token;
    },
    session({ session, token }) {
      session.user.rol     = token.rol;
      session.user.empresa = token.empresa;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge:   60 * 60 * 8, // 8 horas
  },
});
