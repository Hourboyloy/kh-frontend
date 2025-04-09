import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: false, // បិទ Strict Mode ដើម្បីកុំឲ្យ render ពីរដង
  // experimental: {}, // លុប `concurrentFeatures`

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.kdramaomo.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production", // លុប console.log នៅ production
  // },

  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //         },
  //       ],
  //     },
  //   ];
  // },
});

export default nextConfig;



// import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = withNextIntl({
//   reactStrictMode: false, // បិទ Strict Mode ដើម្បីកុំឲ្យ render ពីរដង
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "www.kdramaomo.com",
//       },
//       {
//         protocol: "https",
//         hostname: "image.tmdb.org",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//     deviceSizes: [640, 750, 1080, 1200, 1920, 2048], // Optimize image loading sizes
//     imageSizes: [16, 32, 48, 64, 96],
//   },

//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production", // លុប console.log នៅ production
//   },

//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value:
//               process.env.NODE_ENV === "production"
//                 ? "public, max-age=31536000, immutable"
//                 : "no-store, max-age=0", // No caching in dev
//           },
//         ],
//       },
//     ];
//   },

//   // No need for server-side rendering configurations
//   experimental: {},
// });

// export default nextConfig;
