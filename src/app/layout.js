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
          {children} {/* ✅ This renders the current page */}
        </main>

        <footer>
          <p>© 2025 Fake Medicine Detector</p>
        </footer>
      </body>
    </html>
  );
}

  