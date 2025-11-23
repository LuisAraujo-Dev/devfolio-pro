// src/app/(admin)/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Cards de Estatísticas (Placeholders) */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-xl border border-white/10 bg-surface p-6">
          <h3 className="text-sm font-medium text-muted">Total Projetos</h3>
          <p className="mt-2 text-3xl font-bold text-white">12</p>
        </div>
      ))}
    </div>
  );
}