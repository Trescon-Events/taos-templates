import { redirect } from "next/navigation";
import { getSessionData } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionData();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#080A0C",
        fontFamily: "'Inter', 'SF Pro Display', sans-serif",
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          marginLeft: "220px",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
