async function createDynamicTable() {
    const apiUrl = 'http://localhost:3000/api/data';

    async function fetchDataFromDatabase() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }

    try {
        const data = await fetchDataFromDatabase();
        const table = document.getElementById('dynamic-table');

        // Clear existing rows
        table.innerHTML = '';

        // Display column headers
        const headers = Object.keys(data[0]);
        const headerRow = table.insertRow();
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        // Display data rows
        data.forEach(rowData => {
            const row = table.insertRow();
            headers.forEach(header => {
                const cell = row.insertCell();
                cell.textContent = rowData[header];
            });
        });

    } catch (error) {
        console.error('Error creating dynamic table:', error);
    }
}

// Call the function to create the dynamic table on page load
document.addEventListener('DOMContentLoaded', createDynamicTable);