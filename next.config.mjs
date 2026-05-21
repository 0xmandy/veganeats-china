/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "restapi.amap.com" },
      { protocol: "https", hostname: "store.is.autonavi.com" },
      { protocol: "http",  hostname: "store.is.autonavi.com" },
      { protocol: "https", hostname: "aos-comment.amap.com" },
      { protocol: "https", hostname: "img.alicdn.com" },
    ],
  },
};

export default nextConfig;
