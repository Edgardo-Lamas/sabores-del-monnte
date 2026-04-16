"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";

const inputBase = {
  background: "#0D0A06",
  border: "1px solid rgba(200, 121, 58, 0.3)",
  borderRadius: "4px",
  color: "#F5F0E8",
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "0.875rem",
  padding: "0.65rem 0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export default function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") || "/tienda";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email:    email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--color-base)" }}
    >
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-[0.05] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C8793A, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* ─── Logo ─── */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-full border flex items-center justify-center mb-4"
            style={{ borderColor: "rgba(200, 121, 58, 0.4)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-amber">
              <path
                d="M12 2L17.196 5.5V12.5L12 16L6.804 12.5V5.5L12 2Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
              />
              <path
                d="M12 16L17.196 19.5V22L12 22L6.804 22V19.5L12 16Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"
              />
            </svg>
          </div>
          <span
            className="text-white-soft text-xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Sabores de Monte
          </span>
          <span
            className="text-cream/40 text-[10px] tracking-[0.25em] uppercase mt-0.5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Acceso mayorista
          </span>
        </div>

        {/* ─── Card ─── */}
        <div
          className="rounded-[4px] p-8"
          style={{
            background: "#1A1510",
            border: "1px solid rgba(200, 121, 58, 0.25)",
          }}
        >
          <h1
            className="text-white-soft text-xl mb-6"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
          >
            Iniciá sesión
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-cream text-sm"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Email comercial
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@empresa.com"
                autoComplete="email"
                required
                style={inputBase}
                onFocus={(e) => { e.target.style.border = "1px solid #C8793A"; }}
                onBlur={(e)  => { e.target.style.border = inputBase.border; }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-cream text-sm"
                style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  style={{ ...inputBase, paddingRight: "2.75rem" }}
                  onFocus={(e) => { e.target.style.border = "1px solid #C8793A"; }}
                  onBlur={(e)  => { e.target.style.border = inputBase.border; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs text-center py-2 px-3 rounded-[3px]"
                style={{
                  background: "rgba(239, 68, 68, 0.06)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm rounded-[4px] mt-2 transition-all duration-300"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                background:
                  loading || !email || !password
                    ? "rgba(200, 121, 58, 0.4)"
                    : "#C8793A",
                color: "#0D0A06",
                cursor: loading || !email || !password ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading && email && password)
                  e.currentTarget.style.background = "#F0A835";
              }}
              onMouseLeave={(e) => {
                if (!loading && email && password)
                  e.currentTarget.style.background = "#C8793A";
              }}
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        {/* ─── Link registro ─── */}
        <p
          className="text-center text-cream/40 text-sm mt-5"
          style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
        >
          ¿No tenés cuenta?{" "}
          <Link
            href="/distribuidores"
            className="text-amber hover:text-gold transition-colors duration-200 underline"
          >
            Solicitá acceso mayorista
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
