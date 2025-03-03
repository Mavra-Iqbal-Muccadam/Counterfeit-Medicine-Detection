export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a> | 
            <a href="/manufacturer">Manufacturer Registration</a> {/* ✅ Updated link */}
          </nav>
        </header>
        
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
