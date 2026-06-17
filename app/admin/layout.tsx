import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Agrawal Cycles",
  description: "Secure administrative catalog management panel for Agrawal Cycles.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
