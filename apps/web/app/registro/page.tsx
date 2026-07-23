"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

const COUNTRIES = [
  { code: "BR", label: "Brazil" },
  { code: "US", label: "United States" },
  { code: "PT", label: "Portugal" },
  { code: "ES", label: "Spain" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "IT", label: "Italy" },
  { code: "GB", label: "United Kingdom" },
  { code: "MX", label: "Mexico" },
  { code: "CA", label: "Canada" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("BR");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 10 || !/[0-9]/.test(password)) {
      setError("Password needs at least 10 characters and 1 number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password, country);
      router.push("/conta");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-[420px] mx-auto px-8 py-[90px]">
      <h1 className="text-[28px] font-display font-semibold mb-2">Create Account</h1>
      <p className="text-[#6b7178] mb-8">Join LINEA to track orders and save your favorites.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#44494f]">Full name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            className="h-11 rounded-xl border border-silver bg-graySoft px-4 text-sm focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10 focus:bg-white transition-all"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#44494f]">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="h-11 rounded-xl border border-silver bg-graySoft px-4 text-sm focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10 focus:bg-white transition-all"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#44494f]">Country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-11 rounded-xl border border-silver bg-graySoft px-4 text-sm focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10 focus:bg-white transition-all"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[#44494f]">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={10}
            className="h-11 rounded-xl border border-silver bg-graySoft px-4 text-sm focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10 focus:bg-white transition-all"
          />
          <span className="text-[12px] text-[#6b7178]">At least 10 characters, including a number.</span>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-60 disabled:translate-y-0 mt-2"
        >
          {isSubmitting ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-[#6b7178] mt-6 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue font-medium">
          Log in
        </Link>
      </p>
    </section>
  );
}
