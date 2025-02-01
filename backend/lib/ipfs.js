import { create } from 'ipfs-core';

let ipfsInstance = null;

// Initialize IPFS Node
export async function getIPFS() {
  if (!ipfsInstance) {
    ipfsInstance = await create();
  }
  return ipfsInstance;
}

// Upload JSON to IPFS
export async function uploadJSONToIPFS(jsonData) {
  const ipfs = await getIPFS();
  const jsonBuffer = Buffer.from(JSON.stringify(jsonData));
  const { cid } = await ipfs.add(jsonBuffer);
  return `http://127.0.0.1:8080/ipfs/${cid.toString()}`; // Local Gateway
}

// Upload PDF to IPFS
export async function uploadPDFToIPFS(file) {
  const ipfs = await getIPFS();
  const { cid } = await ipfs.add(file);
  return `http://127.0.0.1:8080/ipfs/${cid.toString()}`; // Local Gateway
}

// Upload Combined Data (JSON + PDF)
export async function uploadDataToIPFS(info, pdfFile) {
  const jsonUrl = await uploadJSONToIPFS(info);
  const pdfUrl = await uploadPDFToIPFS(pdfFile);

  return { jsonUrl, pdfUrl };
}
