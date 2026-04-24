"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const TIPO_NEGOCIO_OPTIONS = [
  { value: "",              label: "Tipo de negocio" },
  { value: "distribuidora", label: "Distribuidora" },
  { value: "restaurante",   label: "Restaurante / Gastronomía" },
  { value: "tienda",        label: "Tienda / Dietética / Gourmet" },
  { value: "supermercado",  label: "Supermercado / Almacén" },
  { value: "otro",          label: "Otro" },
];

const schema = z.object({
  nombre:       z.string().min(2, "Nombre requerido"),
  negocio:      z.string().min(2, "Nombre del negocio requerido"),
  email:        z.string().email("Email inválido"),
  telefono:     z.string().min(7, "Teléfono requerido"),
  provincia:    z.string().min(2, "Provincia requerida"),
  tipo_negocio: z.string().min(1, "Seleccioná el tipo de negocio"),
  password:     z.string().min(6, "Mínimo 6 caracteres"),
});

const inputBase = {
  background: "#0D0A06",
  border: "1px solid rgba(200, 121, 58, 0.3)",
  borderRadius: "4px",
  color: "#F5F0E8",
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "0.875rem",
  padding: "0.625rem 0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const inputFocus = "1px solid #C8793A";
const inputError = "1px solid rgba(239, 68, 68, 0.7)";

function Field({ label, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-cream text-sm" style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
        {label}{required && <span className="text-amber ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-red-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>{error}</span>
      )}
    </div>
  );
}

export default function SolicitudForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    setServerError(null);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:       data.nombre,
          negocio:      data.negocio,
          email:        data.email,
          telefono:     data.telefono,
          provincia:    data.provincia,
          tipo_negocio: data.tipo_negocio,
          password:     data.password,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.error || "Error al registrarse");
      }

      fetch("/api/actividad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo:        "registro",
          user_email:  data.email.trim().toLowerCase(),
          user_nombre: data.nombre,
          payload: {
            negocio:      data.negocio,
            provincia:    data.provincia,
            tipo_negocio: data.tipo_negocio,
          },
        }),
      }).catch(() => {});

      // Auto-login inmediato
      const result = await signIn("credentials", {
        email:    data.email.trim().toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (result?.error) throw new Error("Cuenta creada pero no se pudo iniciar sesión. Andá a /login.");

      router.push("/productos");
      router.refresh();

    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <Field label="Nombre completo" required error={errors.nombre?.message}>
          <input
            {...register("nombre")}
            placeholder="Juan García"
            style={{ ...inputBase, border: errors.nombre ? inputError : inputBase.border }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e)  => { e.target.style.border = errors.nombre ? inputError : inputBase.border; }}
          />
        </Field>

        <Field label="Nombre del negocio" required error={errors.negocio?.message}>
          <input
            {...register("negocio")}
            placeholder="Tienda El Monte"
            style={{ ...inputBase, border: errors.negocio ? inputError : inputBase.border }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e)  => { e.target.style.border = errors.negocio ? inputError : inputBase.border; }}
          />
        </Field>

        <Field label="Email" required error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="contacto@negocio.com"
            style={{ ...inputBase, border: errors.email ? inputError : inputBase.border }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e)  => { e.target.style.border = errors.email ? inputError : inputBase.border; }}
          />
        </Field>

        <Field label="Teléfono / WhatsApp" required error={errors.telefono?.message}>
          <input
            {...register("telefono")}
            placeholder="+54 11 0000 0000"
            style={{ ...inputBase, border: errors.telefono ? inputError : inputBase.border }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e)  => { e.target.style.border = errors.telefono ? inputError : inputBase.border; }}
          />
        </Field>

        <Field label="Provincia" required error={errors.provincia?.message}>
          <input
            {...register("provincia")}
            placeholder="Córdoba"
            style={{ ...inputBase, border: errors.provincia ? inputError : inputBase.border }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e)  => { e.target.style.border = errors.provincia ? inputError : inputBase.border; }}
          />
        </Field>

        <Field label="Tipo de negocio" required error={errors.tipo_negocio?.message}>
          <select
            {...register("tipo_negocio")}
            style={{ ...inputBase, border: errors.tipo_negocio ? inputError : inputBase.border }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e)  => { e.target.style.border = errors.tipo_negocio ? inputError : inputBase.border; }}
          >
            {TIPO_NEGOCIO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Contraseña" required error={errors.password?.message}>
          <div className="relative">
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              placeholder="Mínimo 6 caracteres"
              style={{ ...inputBase, paddingRight: "2.75rem", border: errors.password ? inputError : inputBase.border }}
              onFocus={(e) => { e.target.style.border = inputFocus; }}
              onBlur={(e)  => { e.target.style.border = errors.password ? inputError : inputBase.border; }}
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
        </Field>

      </div>

      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 text-sm text-red-400 text-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-7">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-sm rounded-[4px] transition-all duration-300"
          style={{
            fontFamily: "var(--font-body)", fontWeight: 500,
            background: isSubmitting ? "rgba(200, 121, 58, 0.5)" : "#C8793A",
            color: "#0D0A06", cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#F0A835"; }}
          onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#C8793A"; }}
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? "Creando cuenta..." : "Unirme al Club Origen"}
        </button>
        <p className="text-center text-cream/30 text-xs mt-3" style={{ fontFamily: "var(--font-body)" }}>
          Acceso inmediato a precios mayoristas · Sin esperas
        </p>
      </div>
    </form>
  );
}
