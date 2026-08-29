const cloudinary = require('cloudinary').v2;

const cloudName = "djbuw0ykp";

const apiKey = "289758979264819";
const apiSecret = "ZpiB4ThW82N5GiXJWa7CUdZf0OA";

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

console.log("Testing Cloudinary credentials...");

// Attempt to get account information or list folders to test authentication
cloudinary.api.sub_folders("adruva-website", function(error, result) {
  if (error) {
    console.error("Cloudinary Authentication FAILED!");
    console.error(error);
    process.exit(1);
  } else {
    console.log("Cloudinary Authentication SUCCESSFUL!");
    console.log(result);
    process.exit(0);
  }
});
