import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif' }}>
        <header>
          {/* <nav>
            <a href="/">Home</a> |
            <a href="/manufacturer">Manufacturer Registration</a> ✅ Updated link
          </nav> */}
        </header>

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
