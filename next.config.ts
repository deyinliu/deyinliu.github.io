import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true, // 确保路径后面有斜杠，适应大多数静态托管服务器
  output: "export", // 生成静态 HTML 文件
};

export default nextConfig;
