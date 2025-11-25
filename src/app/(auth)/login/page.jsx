"use client";
"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="rounded-xl bg-white p-8 shadow-2xl">
          <p className="text-slate-800">Login page coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
