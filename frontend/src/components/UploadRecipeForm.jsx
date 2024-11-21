import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const UploadRecipeForm = () => {
  const [formData, setFormData] = useState({
    label: '',
    ingredients: '',
    calories: '',
    dietLabels: '',
    healthLabels: '',
    image: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/recipe/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is present
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Recipe uploaded successfully!');
        console.log('Uploaded Recipe:', result);
        navigate('/profile'); // Redirect to profile page after successful upload
      } else {
        throw new Error('Failed to upload recipe');
      }
    } catch (error) {
      console.error('Error uploading recipe:', error);
      alert('An error occurred while uploading the recipe.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>Upload Recipe</h1>
      <input
        type="text"
        name="label"
        placeholder="Recipe Name"
        value={formData.label}
        onChange={handleChange}
        required
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (comma-separated)"
        value={formData.ingredients}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="calories"
        placeholder="Calories"
        value={formData.calories}
        onChange={handleChange}
      />
      <input
        type="text"
        name="dietLabels"
        placeholder="Diet Labels (comma-separated)"
        value={formData.dietLabels}
        onChange={handleChange}
      />
      <input
        type="text"
        name="healthLabels"
        placeholder="Health Labels (comma-separated)"
        value={formData.healthLabels}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit" style={{ marginTop: '10px' }}>Upload Recipe</button>
    </form>
  );
};

export default UploadRecipeForm;
