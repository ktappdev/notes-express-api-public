const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

async function upload(blob, blobName) {
  console.log("starting storage connection");
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const container = blobServiceClient.getContainerClient("images");

  const blockBlobClient = container.getBlockBlobClient(blobName);
  console.log(blob);
  console.log(blob.length);
  const uploadBlobResponse = await blockBlobClient.upload(blob, blob.length);
  console.log(
    `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
  );
}

async function getABlob(blobName) {
  if (!blobName) {
    console.log("blob name is required");
    return;
  }
  console.log("starting connection");
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  console.log("searching for container");
  const container = blobServiceClient.getContainerClient("images");
  console.log("searching for blob name " + blobName);
  const blobExist = await container.getBlockBlobClient(blobName).exists();
  if (!blobExist) {
    console.log("returning null " + blobExist);
    return null;
  }
  const blockBlobClient = container.getBlockBlobClient(blobName);
  console.log("returning URL " + blockBlobClient.url);
  return blockBlobClient.url;
}

module.exports = {
  upload,
  getABlob,
};
