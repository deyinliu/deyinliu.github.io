import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <meta name="format-detection" content="telephone=no,email=no" />
        <meta http-equiv="Content-Security-Policy" content="form-action 'self'" />
      </head>
      <body className={geist.className}>
        <div id="global-loading" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
          zIndex: 9999,
          transition: 'opacity 0.3s'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="loading-icon">⚙️</div>
            <div style={{ marginTop: '16px', fontSize: '16px' }}>
              系统初始化中...
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
