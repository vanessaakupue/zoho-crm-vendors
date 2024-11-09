
import { useState } from 'react';

export default function VendorForm({ onClose, onVendorAdded }) {
  const [formData, setFormData] = useState({
    Vendor_Name: '',
    Email: '',
    Phone: '',
    Website: '',
    Category: '',
    Description: '',
  });
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onVendorAdded();
        onClose();
        setFormData({
          Vendor_Name: '',
          Email: '',
          Phone: '',
          Website: '',
          Category: '',
          Description: '',
        });
        
        alert('Vendor added successfully!');
      } else {
        alert('Failed to add vendor.');
      }
    } catch (error) {
      alert('Error adding vendor.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl mb-4">Add New Vendor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name:
            </label>
            <input
              id='name'
              type="text"
              name="Vendor_Name"
              value={formData.Vendor_Name}
              onChange={handleChange}
              placeholder="Vendor Name"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              id='email'
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone No:
            </label>
            <input
              id="phone"
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="website" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website:
            </label>
            <input
              id="website"
              type="text"
              name="Website"
              value={formData.Website}
              onChange={handleChange}
              placeholder="Website"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category:
            </label>
            <input
              id="category"
              type="text"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
