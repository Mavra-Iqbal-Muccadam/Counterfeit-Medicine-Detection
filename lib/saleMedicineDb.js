// lib/saleMedicineDb.js
import { supabase } from './supabaseClientanon';

export const addMedicineToSale = async (medicineData) => {
  try {
    const { data, error } = await supabase
      .from('sale_medicine')
      .insert([{
        medicine_id: medicineData.tokenId,
        name: medicineData.name,
        batch_number: medicineData.batchNumber,
        description: medicineData.description,
        excipients: medicineData.excipients || medicineData.ingredients || [],
        expiry_date: medicineData.expiryDate,
        manufacture_date: medicineData.manufactureDate,
        status: 'Accepted',
        types: medicineData.types,
        image_url: medicineData.uploadedFiles?.[0]?.ipfsHash 
          ? `https://ipfs.io/ipfs/${medicineData.uploadedFiles[0].ipfsHash}` 
          : null,
        wallet_address: medicineData.walletAddress,
        price: medicineData.price,
        quantity: medicineData.quantity
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding medicine to sale:', error);
    throw error;
  }
};

export const updateSaleMedicine = async (medicineId, updates, walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('sale_medicine')
      .update(updates)
      .eq('medicine_id', medicineId)
      .eq('wallet_address', walletAddress)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating sale medicine:', error);
    throw error;
  }
};

export const removeMedicineFromSale = async (medicineId, walletAddress) => {
  try {
    const { error } = await supabase
      .from('sale_medicine')
      .delete()
      .eq('medicine_id', medicineId)
      .eq('wallet_address', walletAddress);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing medicine from sale:', error);
    throw error;
  }
};

export const fetchSaleMedicinesByWallet = async (walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('sale_medicine')
      .select('*')
      .eq('wallet_address', walletAddress);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching sale medicines:', error);
    throw error;
  }
};

export const fetchAllMedicineTypes = async (walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('sale_medicine')
      .select('types')
      .eq('wallet_address', walletAddress);

    if (error) throw error;
    
    const allTypes = data.flatMap(item => item.types || []);
    const uniqueTypes = [...new Set(allTypes)];
    return uniqueTypes.filter(Boolean);
  } catch (error) {
    console.error('Error fetching medicine types:', error);
    throw error;
  }
};

// lib/saleMedicineDb.js
// Add this new function to fetch all medicines
export const fetchAllMedicines = async () => {
  try {
    const { data, error } = await supabase
      .from('sale_medicine')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching all medicines:', error);
    throw error;
  }
};