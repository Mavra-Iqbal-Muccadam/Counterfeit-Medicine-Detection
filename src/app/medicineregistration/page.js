'use client';
import FormComponent from '../components/medicineregistration/medicineregistrationform';

export default function Home() {
  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Welcome to My Form</h1>
      <FormComponent onSubmit={handleFormSubmit} />
    </div>
  );
}
