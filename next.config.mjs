/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.diyetprogrami.com",
        port: "",
        pathname: "/uploads/blog/**",
      },
    ],
  },
};

export default nextConfig;
