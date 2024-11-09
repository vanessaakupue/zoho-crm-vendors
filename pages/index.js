import { useState, useEffect } from "react";
import VendorForm from "@/components/AddVendor";
import EditVendorForm from "@/components/EditVendor";

export default function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVendor, setEditingVendor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors');
      const data = await response.json();
      setVendors(data.data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVendor = async (vendorId) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await fetch(`/api/vendors/${vendorId}`, {
          method: 'DELETE',
        });
        
        fetchVendors();
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
  };

  if (loading) {
    return(    
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg
            transition duration-200 ease-in-out transform hover:-translate-y-1
            shadow-md hover:shadow-lg"
          >
            Add New Vendor
          </button>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg 
                transition duration-200 ease-in-out p-4 border border-gray-100"
              >
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {vendor.Vendor_Name}
                  </h2>
                  
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {vendor.Category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {vendor.Description}
                  </p>
                  
                  <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(vendor)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                               hover:bg-indigo-700 transition duration-200
                               text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteVendor(vendor.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg
                               hover:bg-red-700 transition duration-200
                               text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg">No vendors found.</p>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <VendorForm 
          onClose={() => setShowAddModal(false)}
          onVendorAdded={() => {
            fetchVendors();
            setShowAddModal(false)
          }} 
          />
        )}

      {editingVendor && (
        <EditVendorForm
          vendor={editingVendor}
          onClose={() => setEditingVendor(null)}
          onVendorUpdated={() => {
            fetchVendors();
            setEditingVendor(null)
          }}
        />
      )}
    </div>
  )
}