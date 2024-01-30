// Function to fetch data from SQLite database
async function fetchDataFromDatabase() {
    // Load the SQL.js library
    const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/${file}`
    });

    // Replace the path with the correct relative path to your SQLite file
    const response = await fetch('assets/RodWiki.sqlite');
    const buffer = await response.arrayBuffer();
    const dbData = new Uint8Array(buffer);

    // Create a new SQL.js database
    const db = new SQL.Database(dbData);

    // Execute a sample query (replace with your actual query)
    const query = 'SELECT * FROM ItemsView';
    const result = db.exec(query);

    return result[0].values;
}

// Function to create dynamic table
async function createDynamicTable() {
    try {
        const data = await fetchDataFromDatabase();
        const table = document.getElementById('dynamic-table');

        // Clear existing rows
        table.innerHTML = '';

        // Display column headers
        const headers = ['WorkBench_Name', 'Item_Category', 'Item', 'Child', 'Item_Cost_Amount']; // Replace with your actual column names

        const headerRow = table.insertRow();
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        // Display data rows
        data.forEach(rowData => {
            const row = table.insertRow();
            rowData.forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });
    } catch (error) {
        console.error('Error creating dynamic table:', error);
    }
}

// Load the SQL.js library and call createDynamicTable
initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.1/${file}`
}).then(() => {
    createDynamicTable();
}).catch(error => {
    console.error('Error loading SQL.js:', error);
});
