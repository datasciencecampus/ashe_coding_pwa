// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', {scope:'/'})
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('csv-file');
    const dataTable = document.getElementById('data-table');
    const suggestionPanel = document.getElementById('suggestions');
    const saveSocCodeButton = document.getElementById('save-soc-code');

    let data = [];
    let grid;

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                data = results.data;
                renderTable();
            }
        });
    });

    function renderTable() {
        if (grid) {
            grid.destroy();
        }

        grid = new gridjs.Grid({
            columns: Object.keys(data[0]).map(key => ({
                name: key,
                sort: true,
                formatter: (cell) => gridjs.html(`<div class="cell-content">${cell}</div>`)
            })),
            data: data,
            search: true,
            sort: true,
            pagination: true,
        }).render(dataTable);

        grid.on('rowClick', (e, row) => {
            updateSuggestionPanel(row.cells);
        });
    }

    function updateSuggestionPanel(rowData) {
        const row = rowData.reduce((obj, cell) => {
            obj[cell.data.column.name] = cell.data;
            return obj;
        }, {});

        const suggestions = mockGetSuggestions(row.job_title, row.job_description);
        suggestionPanel.innerHTML = `
            <h3>Job Title: ${row.job_title}</h3>
            <p>Job Description: ${row.job_description}</p>
            <h4>Suggested SOC Codes:</h4>
            <ul>
                ${suggestions.map(sug => `<li>${sug.code}: ${sug.title}</li>`).join('')}
            </ul>
            <input type="text" name="soc_code" value="${row.soc_code || ''}" placeholder="Enter SOC Code">
        `;
    }

    saveSocCodeButton.addEventListener('click', () => {
        // Implement save functionality
    });

    function mockGetSuggestions(jobTitle, jobDescription) {
        // Mock function as before
        return [
            { code: '11-1011', title: 'Chief Executives' },
            { code: '13-1111', title: 'Management Analysts' },
            { code: '15-1252', title: 'Software Developers' },
        ];
    }
});


// document.addEventListener('DOMContentLoaded', () => {
//     const fileInput = document.getElementById('csv-file');
//     const dataTable = document.getElementById('data-table');
//     const suggestionPanel = document.getElementById('suggestions');
//     const saveSocCodeButton = document.getElementById('save-soc-code');

//     let data = [];
//     let selectedRow = null;

//     fileInput.addEventListener('change', (event) => {
//         const file = event.target.files[0];
//         Papa.parse(file, {
//             header: true,
//             complete: (results) => {
//                 data = results.data;
//                 renderTable();
//             }
//         });
//     });

//     function renderTable() {
//         const headers = Object.keys(data[0]);
//         const tableHTML = `
//             <table>
//                 <thead>
//                     <tr>${headers.map(h => `<th>${h}</th>`).join('')}<th>SOC Code</th></tr>
//                 </thead>
//                 <tbody>
//                     ${data.map((row, index) => `
//                         <tr hx-get="/get-suggestions" hx-trigger="click" hx-target="#suggestions" hx-vals='{"index": ${index}}'>
//                             ${headers.map(h => `<td>${row[h]}</td>`).join('')}
//                             <td>${row.soc_code || ''}</td>
//                         </tr>
//                     `).join('')}
//                 </tbody>
//             </table>
//         `;
//         dataTable.innerHTML = tableHTML;
//     }

//     htmx.on('htmx:afterSwap', (event) => {
//         if (event.detail.target.id === 'suggestions') {
//             selectedRow = event.detail.requestConfig.parameters.index;
//         }
//     });

//     saveSocCodeButton.addEventListener('click', () => {
//         if (selectedRow !== null) {
//             const socCode = document.querySelector('#suggestions input[name="soc_code"]').value;
//             data[selectedRow].soc_code = socCode;
//             renderTable();
//         }
//     });

//     // Mock API endpoint for getting suggestions
//     htmx.on('htmx:beforeSend', (event) => {
//         if (event.detail.requestConfig.url === '/get-suggestions') {
//             event.detail.xhr.abort();
//             const index = event.detail.requestConfig.parameters.index;
//             const row = data[index];
//             const suggestions = mockGetSuggestions(row.job_title, row.job_description);
//             event.detail.target.innerHTML = `
//                 <h3>Job Title: ${row.job_title}</h3>
//                 <p>Job Description: ${row.job_description}</p>
//                 <h4>Suggested SOC Codes:</h4>
//                 <ul>
//                     ${suggestions.map(sug => `<li>${sug.code}: ${sug.title}</li>`).join('')}
//                 </ul>
//                 <input type="text" name="soc_code" placeholder="Enter SOC Code">
//             `;
//         }
//     });

//     function mockGetSuggestions(jobTitle, jobDescription) {
//         // This is a mock function. In a real app, you would call your API here.
//         return [
//             { code: '11-1011', title: 'Chief Executives' },
//             { code: '13-1111', title: 'Management Analysts' },
//             { code: '15-1252', title: 'Software Developers' },
//         ];
//     }
// });

