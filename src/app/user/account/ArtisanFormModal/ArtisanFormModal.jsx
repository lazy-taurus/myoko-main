import { useState } from "react";

export default function ArtisanFormModal({ name, email, onClose }) {
  const [formData, setFormData] = useState({
    bio: "",
    village: "",
    state: "",
    district: "",
    familyTradition: "",
    craftname: "", 
    description: "",
    culturalSignificance: "",
    materials: "",
    imagesBase64: [],
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (event) => {
    const files = event.target.files;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagesBase64: [...prev.imagesBase64, reader.result.split(",")[1]],
        }));
      };
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/artisan/artisan-resister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, ...formData }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Artisan Registered Successfully!");
      onClose();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto pt-[500px]">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Register as an Artisan</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Village:</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">District:</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Family Tradition:</label>
            <textarea
              name="familyTradition"
              value={formData.familyTradition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Craft Name:</label>
            <input
              type="text"
              name="craftname"
              value={formData.craftname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Craft Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cultural Significance:</label>
            <textarea
              name="culturalSignificance"
              value={formData.culturalSignificance}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Materials Used:</label>
            <textarea
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
