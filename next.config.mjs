/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    REACT_APP_KEYCLOAK_ISSUER:
      "https://usw2.auth.ac/auth/realms/tetricks-develop",
  },
};

export default nextConfig;
