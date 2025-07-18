// import AWS from "aws-sdk";
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });
// const s3 = new AWS.S3();

// export const uploadImageToS3 = async (file: any, uniqueFileName: string) => {
//     const params = {
//         Bucket: process.env.S3_BUCKET_NAME || "",
//         Key: `latdashop/${uniqueFileName}`, // ชื่อไฟล์ใน S3
//         Body: file.buffer, // Buffer ของไฟล์รูปภาพ
//         ContentType: file.mimetype, // ชนิดของไฟล์ (เช่น 'image/jpeg')
//     };

//     try {
//         const data = await s3.upload(params).promise(); // อัปโหลดไปยัง S3
//         console.log('File uploaded successfully:', data.Location);
//         return true
//     } catch (error) {
//         console.error('Error uploading file to S3:', error);
//         return false;
//     }
// };

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    }
});

export const uploadImageToS3 = async (file: any, uniqueFileName: string) => {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || "",
        Key: `latdashop/${uniqueFileName}`,
        Body: file.buffer, // Buffer ของไฟล์รูปภาพ
        ContentType: file.mimetype, // ชนิดของไฟล์ (เช่น 'image/jpeg')
    });

    try {
        await s3.send(command); // อัปโหลดไปยัง S3
        return true
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        return false;
    }
}
export const deleteImageFromS3 = async (filename: string) => {
    const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME || "",
        Key: `latdashop/${filename}`,
    };
    try {
        await s3.send(new DeleteObjectCommand(deleteParams));
        return true
    } catch (err) {
        console.error('❌ ลบรูปไม่สำเร็จ:', err);
        return false;
    }
}
