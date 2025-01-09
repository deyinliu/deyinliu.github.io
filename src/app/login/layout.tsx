import { Geist } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "登录 - MediFlow",
  description: "MediFlow医疗数据分析平台登录",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={geist.className} style={{ background: '#f0f2f5' }}>
        {children}
      </body>
    </html>
  );
}
