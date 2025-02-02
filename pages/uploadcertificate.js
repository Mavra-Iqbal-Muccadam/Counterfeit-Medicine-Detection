import { useState } from 'react';

const UploadCertificateForm = () => {
  const [name, setName] = useState('');
  const [licenceNo, setLicenceNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [certification, setCertification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('licenceNo', licenceNo);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('physicalAddress', physicalAddress);
    formData.append('walletAddress', walletAddress);
    formData.append('certification', certification);

    try {
      const response = await fetch('/api/certificateupload/certificateupload', {
        method: 'POST',
        body: formData,
      });
      

      const result = await response.json();
      if (response.ok) {
        alert('Certificate uploaded and manufacturer details saved successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error uploading certificate:', error);
      alert('Error uploading certificate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Manufacturer Certificate</h2>
      
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Licence No</label>
        <input
          type="text"
          value={licenceNo}
          onChange={(e) => setLicenceNo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Physical Address</label>
        <textarea
          value={physicalAddress}
          onChange={(e) => setPhysicalAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Wallet Address</label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Upload Certification (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setCertification(e.target.files[0])}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Upload Certificate'}
      </button>
    </form>
  );
};

export default UploadCertificateForm;
