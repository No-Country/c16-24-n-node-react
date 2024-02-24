const cloudinary = require('cloudinary');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './',
  filename: (req, file, cb) => {
    cb(null, 'pp-' + Date.now());
  }
});

const uploadMulter = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const extractPublicId = (secure_url) =>{
  return secure_url.match(/\/image\/upload\/([^/]+)\/(.*?)\./)[2];
}

const deleteCloudinaryImage = async (secure_url) => {
  try {
    return await cloudinary.v2.uploader.destroy(extractPublicId(secure_url));
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

const getCloudinaryResizedImage = (secure_url, width, height) => {
  try {
    return cloudinary.v2.url(extractPublicId(secure_url), {
      width: width,
      height:height,
    });
  } catch (error) {
    
  }
}

function getMimeTypeFromBase64Data(base64Data) {
  const prefix = 'data:';
  const delimiter = ';';
  const mimeType = base64Data.substring(prefix.length, base64Data.indexOf(delimiter));
  return mimeType;
}

module.exports = {cloudinary, deleteCloudinaryImage, getCloudinaryResizedImage, getMimeTypeFromBase64Data}
