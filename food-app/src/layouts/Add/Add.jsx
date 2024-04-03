import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Add = () => {
    const API = "https://localhost:7092";
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        description: '',
        kcal: '0',
        protein: '0',
        fat: '0',
        carbs: '0'
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name !== "description") {
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

        handleSubmitForm(formData);
    };

    const handleSubmitForm = (formData) => {
        fetch(`${API}/api/Food/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    setSuccessMessage(`Successfully added ${formData.description}`);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                } else {
                    throw new Error("Failed creation");
                }
            })
            .catch(error => {
                setErrorMessage("Failed creation");
            });
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="add-page">
            <div className="add-form-container">
                <h2 className='heading'>Add Food</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form className="add-form" onSubmit={handleSubmit}>
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
                    <div className='btn-box'>
                        <Link className="back-button" to={'/'} >↩ Back</Link>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;
