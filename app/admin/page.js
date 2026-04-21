import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Panel de control | Sabores del Monte",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
