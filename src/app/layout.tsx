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
      <body className="font-sans bg-light-gray text-text">
        {children}
      </body>
    </html>
  );
}