"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { track } from "@vercel/analytics";

/* ─── Zod schema ─── */

const schema = z.object({
  nombre:      z.string().min(2, "Nombre requerido"),
  empresa:     z.string().min(2, "Empresa / Razón social requerida"),
  cuit:        z.string().min(10, "CUIT requerido"),
  email:       z.string().email("Email inválido"),
  telefono:    z.string().min(7, "Teléfono requerido"),
  tipoNegocio: z.enum(["distribuidor","restaurante","tienda","hotel","otro"], {
    errorMap: () => ({ message: "Seleccioná un tipo de negocio" }),
  }),
  provincia:   z.string().min(2, "Provincia requerida"),
  volumen:     z.enum(["menos-10","10-50","50-100","mas-100"], {
    errorMap: () => ({ message: "Seleccioná un volumen estimado" }),
  }),
  mensaje:     z.string().optional(),
  terminos:    z.literal(true, {
    errorMap: () => ({ message: "Debés aceptar los términos y condiciones" }),
  }),
});

/* ─── Shared input styles ─── */

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
      <label
        className="text-cream text-sm"
        style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
      >
        {label}
        {required && <span className="text-amber ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-red-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── Component ─── */

export default function SolicitudForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    setServerError(null);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Error al enviar la solicitud");
      }

      track("solicitud_mayorista_enviada", {
        tipoNegocio: data.tipoNegocio,
        volumen:     data.volumen,
        provincia:   data.provincia,
      });

      setSubmitted(true);
    } catch (err) {
      setServerError(err.message);
    }
  }

  /* ─── Success state ─── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-16 px-8"
      >
        <CheckCircle size={48} className="text-amber mx-auto mb-5" strokeWidth={1.5} />
        <h3
          className="text-white-soft text-2xl mb-3"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
        >
          Solicitud recibida
        </h3>
        <p className="text-cream/60 max-w-sm mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Revisamos tu perfil en 24–48hs y te contactamos por email para darte
          acceso a los precios mayoristas.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nombre */}
        <Field label="Nombre completo" required error={errors.nombre?.message}>
          <input
            {...register("nombre")}
            placeholder="Juan García"
            style={{
              ...inputBase,
              border: errors.nombre ? inputError : inputBase.border,
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.nombre ? inputError : inputBase.border;
            }}
          />
        </Field>

        {/* Empresa */}
        <Field label="Empresa / Razón social" required error={errors.empresa?.message}>
          <input
            {...register("empresa")}
            placeholder="Distribuidora El Monte S.R.L."
            style={{
              ...inputBase,
              border: errors.empresa ? inputError : inputBase.border,
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.empresa ? inputError : inputBase.border;
            }}
          />
        </Field>

        {/* CUIT */}
        <Field label="CUIT" required error={errors.cuit?.message}>
          <input
            {...register("cuit")}
            placeholder="20-12345678-9"
            style={{
              ...inputBase,
              border: errors.cuit ? inputError : inputBase.border,
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.cuit ? inputError : inputBase.border;
            }}
          />
        </Field>

        {/* Email */}
        <Field label="Email comercial" required error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="contacto@empresa.com"
            style={{
              ...inputBase,
              border: errors.email ? inputError : inputBase.border,
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.email ? inputError : inputBase.border;
            }}
          />
        </Field>

        {/* Teléfono */}
        <Field label="Teléfono / WhatsApp" required error={errors.telefono?.message}>
          <input
            {...register("telefono")}
            placeholder="+54 351 000 0000"
            style={{
              ...inputBase,
              border: errors.telefono ? inputError : inputBase.border,
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.telefono ? inputError : inputBase.border;
            }}
          />
        </Field>

        {/* Tipo de negocio */}
        <Field label="Tipo de negocio" required error={errors.tipoNegocio?.message}>
          <select
            {...register("tipoNegocio")}
            defaultValue=""
            style={{
              ...inputBase,
              border: errors.tipoNegocio ? inputError : inputBase.border,
              cursor: "pointer",
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.tipoNegocio ? inputError : inputBase.border;
            }}
          >
            <option value="" disabled style={{ background: "#0D0A06" }}>
              Seleccioná una opción
            </option>
            <option value="distribuidor" style={{ background: "#0D0A06" }}>Distribuidor</option>
            <option value="restaurante"  style={{ background: "#0D0A06" }}>Restaurante</option>
            <option value="tienda"       style={{ background: "#0D0A06" }}>Tienda</option>
            <option value="hotel"        style={{ background: "#0D0A06" }}>Hotel</option>
            <option value="otro"         style={{ background: "#0D0A06" }}>Otro</option>
          </select>
        </Field>

        {/* Provincia */}
        <Field label="Provincia" required error={errors.provincia?.message}>
          <input
            {...register("provincia")}
            placeholder="Córdoba"
            style={{
              ...inputBase,
              border: errors.provincia ? inputError : inputBase.border,
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.provincia ? inputError : inputBase.border;
            }}
          />
        </Field>

        {/* Volumen estimado */}
        <Field label="Volumen estimado mensual" required error={errors.volumen?.message}>
          <select
            {...register("volumen")}
            defaultValue=""
            style={{
              ...inputBase,
              border: errors.volumen ? inputError : inputBase.border,
              cursor: "pointer",
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => {
              e.target.style.border = errors.volumen ? inputError : inputBase.border;
            }}
          >
            <option value="" disabled style={{ background: "#0D0A06" }}>
              Seleccioná un rango
            </option>
            <option value="menos-10" style={{ background: "#0D0A06" }}>Menos de 10 kg</option>
            <option value="10-50"    style={{ background: "#0D0A06" }}>10 – 50 kg</option>
            <option value="50-100"   style={{ background: "#0D0A06" }}>50 – 100 kg</option>
            <option value="mas-100"  style={{ background: "#0D0A06" }}>Más de 100 kg</option>
          </select>
        </Field>
      </div>

      {/* Mensaje adicional — full width */}
      <div className="mt-5">
        <Field label="Mensaje adicional" error={errors.mensaje?.message}>
          <textarea
            {...register("mensaje")}
            rows={3}
            placeholder="Contanos más sobre tu negocio o consultá lo que necesites..."
            style={{
              ...inputBase,
              resize: "vertical",
              minHeight: "80px",
            }}
            onFocus={(e) => { e.target.style.border = inputFocus; }}
            onBlur={(e) => { e.target.style.border = inputBase.border; }}
          />
        </Field>
      </div>

      {/* Términos */}
      <div className="mt-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              {...register("terminos")}
              className="sr-only"
            />
            <div
              className="w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors duration-200"
              style={{
                background: "rgba(200, 121, 58, 0.1)",
                border: errors.terminos
                  ? "1px solid rgba(239,68,68,0.7)"
                  : "1px solid rgba(200, 121, 58, 0.4)",
              }}
            >
              {/* checkmark — shown via CSS sibling selector via JS workaround */}
            </div>
          </div>
          <span
            className="text-cream/60 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Acepto los{" "}
            <a href="/terminos" className="text-amber hover:text-gold underline transition-colors duration-200">
              términos y condiciones
            </a>{" "}
            de uso del programa de distribuidores
            <span className="text-amber ml-0.5">*</span>
          </span>
        </label>
        {errors.terminos && (
          <span className="block mt-1.5 text-red-400 text-xs ml-7"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {errors.terminos.message}
          </span>
        )}
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-red-400 text-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="mt-7">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-sm rounded-[4px] transition-all duration-300"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            background: isSubmitting ? "rgba(200, 121, 58, 0.5)" : "#C8793A",
            color: "#0D0A06",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.background = "#F0A835";
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.background = "#C8793A";
          }}
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </button>
      </div>
    </form>
  );
}
