// next.config.js
// Dùng 'require'
const path = require('path');

const nextConfig = {
  // Chuyển hướng
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/sign-in',
        permanent: false,
      },
    ];
  },

  // Tùy chọn Sass/SCSS
  sassOptions: {
    // __dirname đã có sẵn trong CommonJS, không cần import
    includePaths: [path.join(__dirname, 'node_modules')],
  },

  // Cấu hình ảnh Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

// Dùng 'module.exports'
module.exports = nextConfig;