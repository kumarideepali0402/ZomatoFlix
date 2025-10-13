// const ImageKit = require("imagekit");
// require("dotenv").config();

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// async function uploadFile(file, fileName) {
//     const result = await imagekit.upload({
//         file:file,
//         fileName:fileName,
//     })
// }

// module.exports = {
//     uploadFile
// };

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFile(buffer, filename) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                { resource_type: "auto", public_id: filename },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )
            .end(buffer);
    });
}

module.exports = { uploadFile };
