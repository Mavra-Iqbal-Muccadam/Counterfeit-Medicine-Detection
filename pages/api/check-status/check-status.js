import { getManufacturerStatus } from "../../../lib/check-status";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address is required" });
    }

    try {
        const status = await getManufacturerStatus(walletAddress);

        if (!status) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }

        res.status(200).json({ status });
    } catch (error) {
        console.error("Error fetching manufacturer status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
