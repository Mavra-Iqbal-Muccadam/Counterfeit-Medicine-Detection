import { getManufacturerStatus } from "../../../lib/check-status";

export async function handleSubmit(inputValue, setErrorMessage, setStatus, setStatusColor, setStatusModalOpen) {
    if (!inputValue) {
        setErrorMessage("Please enter a valid wallet address.");
        return;
    }
    setErrorMessage(""); // Clear error if input is valid

    setStatus("Processing...");
    setStatusColor("#FFC107");

    try {
        console.log("🔍 Fetching manufacturer status for wallet:", inputValue);
        const status = await getManufacturerStatus(inputValue);
        console.log("🟢 Database returned status:", status);

        let statusColor = "#FFC107"; // Default to Pending color

        if (status === "accepted") {
            statusColor = "#4CAF50";
        } else if (status === "rejected") {
            statusColor = "#F44336";
        } else if (status === "pending") {
            statusColor = "#FFC107";
        } else {
            console.log("🔴 Wallet address not found in DB.");
            setErrorMessage("Wallet address not found.");
            setStatus("");
            return;
        }

        setTimeout(() => {
            console.log(`✅ Updating UI: Status = ${status}, Color = ${statusColor}`);
            setStatus(status);
            setStatusColor(statusColor);
            setStatusModalOpen(true);
        }, 1500);
    } catch (error) {
        console.error("❌ Error fetching manufacturer status:", error);
        setErrorMessage("An error occurred while checking the status.");
        setStatus("");
    }
}
