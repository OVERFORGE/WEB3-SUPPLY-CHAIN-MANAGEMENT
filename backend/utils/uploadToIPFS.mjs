import dotenv from "dotenv";
import multer from "multer";
import { PinataSDK } from "pinata"; // ✅ default import
import { Blob } from "buffer"; // ✅ Required for File
import { File } from "web3.storage"; // or any File implementation that supports Blob

dotenv.config();

// ✅ Initialize Pinata with JWT and optional gateway
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL, // Optional
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Upload image and metadata to IPFS using latest Pinata SDK
 */
export async function uploadMetadataToIPFS({
  name,
  description,
  image,
  location,
  latitude,
  longitude,
}) {
  try {
    if (!image || !image.buffer || image.size === 0) {
      throw new Error("Image is missing or corrupted");
    }

    console.log("Image info:", {
      originalname: image.originalname,
      mimetype: image.mimetype,
      size: image.size,
    });

    // Step 1: Upload image file
    const imageBlob = new Blob([image.buffer], { type: image.mimetype });
    const imageFile = new File([imageBlob], image.originalname, {
      type: image.mimetype,
    });

    const imageUploadRes = await pinata.upload.public.file(imageFile);
    const imageCID = imageUploadRes.cid;
    console.log("Image uploaded to IPFS:", `ipfs://${imageCID}`);

    // Step 2: Create metadata JSON
    const metadata = {
      name,
      description,
      image: `ipfs://${imageCID}`,
      properties: {
        location: location || "Unknown",
        latitude: latitude ? String(latitude) : "0",
        longitude: longitude ? String(longitude) : "0",
      },
    };

    // Step 3: Upload metadata JSON
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const metadataFile = new File([metadataBlob], "metadata.json", {
      type: "application/json",
    });

    const metadataUploadRes = await pinata.upload.public.file(metadataFile);
    const metadataCID = metadataUploadRes.cid;

    console.log("Metadata uploaded to IPFS:", `ipfs://${metadataCID}`);
    return metadataCID;
  } catch (error) {
    console.error("❌ Error uploading metadata to IPFS:", error.message);
    throw new Error("Failed to upload metadata");
  }
}

export { upload };
