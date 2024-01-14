import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAVW5IR7JZ7PFOPPNI",
        secretAccessKey: "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",
    },
});
export async function getObjectUrl(key) {
    const command = new GetObjectCommand({
        Bucket: "gaurav-aplus-backend",
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}
// this function will return an url that can be used to send put request with binary data
//
export const putObjectToBucket = async (fileName, contentType) => {
    const key = `/hi/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
        Bucket: "gaurav-aplus-backend",
        Key: key,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command);
    return { url, key };
};
//# sourceMappingURL=aws.js.map