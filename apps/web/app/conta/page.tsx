"use client";

import Link from "next/link";
import { useAuth } from "@/lib/authContext";

export default function AccountPage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <section className="max-w-[720px] mx-auto px-8 py-[90px] text-center text-[#6b7178]">Loading…</section>;
  }

  if (!user) {
    return (
      <section className="max-w-[480px] mx-auto px-8 py-[90px] text-center">
        <h1 className="text-[28px] font-display font-semibold mb-3">My Account</h1>
        <p className="text-[#6b7178] mb-8">Log in to view your account.</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
        >
          Log In
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[720px] mx-auto px-8 py-[90px]">
      <h1 className="text-[28px] font-display font-semibold mb-2">My Account</h1>
      <p className="text-[#6b7178] mb-10">Welcome back, {user.name}.</p>

      <div className="rounded-brand border border-silver p-6 mb-6">
        <h2 className="text-[15px] font-semibold mb-4">Account details</h2>
        <dl className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
          <dt className="text-[#6b7178]">Name</dt>
          <dd>{user.name}</dd>
          <dt className="text-[#6b7178]">Email</dt>
          <dd>{user.email}</dd>
          <dt className="text-[#6b7178]">Account type</dt>
          <dd className="capitalize">{user.role}</dd>
        </dl>
      </div>

      <div className="rounded-brand border border-dashed border-silver bg-graySoft/50 p-6 mb-6 text-center">
        <p className="text-[15px] text-[#6b7178]">Order history is being connected. Check back soon.</p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/favoritos"
          className="h-11 px-5 rounded-xl border border-silver text-[13.5px] font-medium flex items-center hover:bg-graySoft transition-colors"
        >
          View Wishlist
        </Link>
        <button
          onClick={logout}
          className="h-11 px-5 rounded-xl border border-silver text-[13.5px] font-medium hover:bg-graySoft transition-colors"
        >
          Log Out
        </button>
      </div>
    </section>
  );
}
