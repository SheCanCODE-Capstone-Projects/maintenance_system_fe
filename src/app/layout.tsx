import "../styles/globals.css";

export const metadata = {
  title: "Maintenance Hub",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
