export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  media: {
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE as string, 10) || 5242880, // 5MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ],
  },
  googleCloud: {
    credentials: process.env.GOOGLE_CLOUD_CREDENTIALS,
    keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
    bucket:
      process.env.GOOGLE_CLOUD_BUCKET ||
      (process.env.NODE_ENV === 'production'
        ? 'portfolio-media-prod'
        : 'portfolio-media-dev'),
  },
});
