import React, { useState } from 'react';

export default function Report() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalSales, setTotalSales] = useState(0);

    const reports = [
        { id: 1, title: 'Total Orders', value: 120 },
        { id: 2, title: 'Pending Orders', value: 45 },
        { id: 3, title: 'Completed Orders', value: 75 },
    ];

    const handleFilter = () => {
        // Example logic to calculate total sales based on date range
        // Replace this with actual logic to fetch or calculate sales
        if (startDate && endDate) {
            setTotalSales(5000); // Example static value
        } else {
            setTotalSales(0);
        }
    };

    return (
        <div className='container-fluid m-4'>
            <div className='row mb-4'>
                <div className='col-md-3'>
                    <label htmlFor='startDate'>Start Date:</label>
                    <input
                        type='date'
                        id='startDate'
                        className='form-control'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='col-md-3'>
                    <label htmlFor='endDate'>End Date:</label>
                    <input
                        type='date'
                        id='endDate'
                        className='form-control'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className = 'col-md-2 d-flex'>
                    <button className='btn btn-success mt-4 d-flex' onClick={handleFilter}>
                    Filter
                </button>
                </div>
            </div>
            

            <div className='row'>
                <div className='col-md-4 mb-4'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Total Sales</h5>
                            <p className='card-text'>${totalSales}</p>
                        </div>
                    </div>
                </div>
                {reports.map((report) => (
                    <div className='col-md-4 mb-4' key={report.id}>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>{report.title}</h5>
                                <p className='card-text'>{report.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}