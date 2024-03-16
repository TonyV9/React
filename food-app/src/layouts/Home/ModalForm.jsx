import React, { useState } from 'react';

const ModalForm = ({ visible, onClose, onSubmit }) => {
    
  const [formData, setFormData] = useState({
    description: '',
    kcal: '0',
    protein: '0',
    fat: '0',
    carbs: '0'
  });
  const [errorMessage, setErrorMessage] = useState('');

  if (!visible) {
    return null;
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name !== "description"){
      if (value < 0) value = 0;
      else if (value > 5000) value = 5000;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description.length < 3 || formData.description.length > 25) {
      setErrorMessage('Description must be between 3 and 25 characters');
      return;
    }
    if (isNaN(parseFloat(formData.kcal))) {
      setErrorMessage('Kcal must be a number');
      return;
    }
    if (isNaN(parseFloat(formData.fat))) {
      setErrorMessage('Fat must be a number');
      return;
    }
    if (isNaN(parseFloat(formData.protein))) {
      setErrorMessage('Protein must be a number');
      return;
    }
    if (isNaN(parseFloat(formData.carbs))) {
      setErrorMessage('Carbs must be a number');
      return;
    }

    onSubmit(formData);
    setFormData({
      description: '',
      kcal: '0',
      protein: '0',
      fat: '0',
      carbs: '0'
    });
    setErrorMessage('');
  };

  return (
    <div className={`modal-overlay ${visible ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Food</h2>
          <span className="modal-close" onClick={onClose}>&times;</span>
        </div>
        <div className="error-message">{errorMessage}</div>
        <form className='add-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Kcal:</label>
            <input type="number" min={0} max={5000} name="kcal" value={formData.kcal} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Protein (g):</label>
            <input type="number" min={0} max={5000} name="protein" value={formData.protein} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fat (g):</label>
            <input type="number" min={0} max={5000} name="fat" value={formData.fat} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Carbs (g):</label>
            <input type="number" min={0} max={5000} name="carbs" value={formData.carbs} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;