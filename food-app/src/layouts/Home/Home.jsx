import React, { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const ENDPOINT = "https://localhost:7092";
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = async (e) => {
        const { value } = e.target;
        setSearchValue(value);

        if (value.trim().length > 0) {
            try {
                const response = await fetch(`${ENDPOINT}/api/Food/get?input=${value}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (err) {
                console.error(err);
            }
        }
        else {
            setSearchResults([]);
        }
    };

    const handleAddItemClick = (item) => {
        setSelectedItems([...selectedItems, item]);
    };

    const handleRemoveItemClick = (indexToRemove) => {
        const updatedSelectedItems = selectedItems.filter((item, index) => index !== indexToRemove);
        setSelectedItems(updatedSelectedItems);
    };

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            isNumeric: false
        },
        {
            title: 'Kcal',
            dataIndex: 'kcal',
            key: 'kcal',
            isNumeric: true
        },
        {
            title: 'Protein(g)',
            dataIndex: 'protein',
            key: 'protein',
            isNumeric: true
        },
        {
            title: 'Fat(g)',
            dataIndex: 'fat',
            key: 'fat',
            isNumeric: true
        },
        {
            title: 'Carbs(g)',
            dataIndex: 'carbs',
            key: 'carbs',
            isNumeric: true
        },
    ];

    const calculateTotal = () => {
        const total = {};

        columns.forEach(column => {
            if (column.isNumeric) {
                total[column.dataIndex] = 0;
            }
        });

        selectedItems.forEach(item => {
            columns.forEach(column => {
                if (column.isNumeric) {
                    total[column.dataIndex] += parseFloat(item[column.dataIndex]) || 0;
                }
            });
        });

        return total;
    };

    const clear = () => {
        setSearchValue('');
        setSearchResults([]);
    }

    const total = calculateTotal();

    return (
        <>
            <h2 className='heading'>Food Lookup</h2>
            <div className='main'>
                <div className='top-box'>
                    <Link className="add-button" to={'/add'} >Add Food</Link>
                </div>
                <div className="selected-table">
                    <div className='selected-row'>
                        <p className='selected-food'>Selected foods</p>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th key={column.key}>{column.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map((item, index) => (
                                    <tr key={item.key}>
                                        {columns.map(column => (
                                            <td key={column.key}>{item[column.dataIndex]}</td>
                                        ))}
                                        <td>
                                            <button className='remove-btn' onClick={() => handleRemoveItemClick(index)}>X</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className='bold'>Total</td>
                                    {columns.map(column => (
                                        column.isNumeric && <td className='bold' key={column.key}>{total[column.dataIndex]}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="search-table">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search foods..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="search-input"
                            referrerPolicy="no-referrer"
                        />
                        <svg
                            className="search-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                                fill='#000000' />
                        </svg>
                        <svg onClick={clear} className='clear-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M6.29 6.71a.996.996 0 0 0 0 1.41L10.59 12 6.29 16.29a.996.996 0 1 0 1.41 1.41L12 13.41l4.29 4.3a.996.996 0 1 0 1.41-1.41L13.41 12l4.3-4.29a.996.996 0 1 0-1.41-1.41L12 10.59 7.71 6.29a.996.996 0 0 0-1.41 0z"
                                fill='#000000' />
                        </svg>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th key={column.key}>{column.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(item => (
                                    <tr key={item.key}>
                                        {columns.map(column => (
                                            <td key={column.key}>{item[column.dataIndex]}</td>
                                        ))}
                                        <td>
                                            <button className='add-btn' onClick={() => handleAddItemClick(item)}>Add</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;