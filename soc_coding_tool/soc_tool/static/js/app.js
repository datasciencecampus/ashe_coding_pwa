document.addEventListener('DOMContentLoaded', function() {
    // Sample data (replace this with actual data loading logic later)
    const jobs = [
        { id: 1, title: "Police inspector", description: "Constable" },
        { id: 2, title: "Labourer", description: "Site worker" },
        { id: 3, title: "Administrator", description: "Export admin" },
    ];

    const jobListBody = document.getElementById('job-list-body');
    const jobDetailsContent = document.getElementById('job-details-content');
    const socResultsTable = document.getElementById('soc-results-table');

    // Populate job list
    jobs.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.id}</td>
            <td>${job.title}</td>
            <td>${job.description}</td>
        `;
        row.addEventListener('click', () => showJobDetails(job));
        jobListBody.appendChild(row);
    });

    function showJobDetails(job) {
        jobDetailsContent.innerHTML = `
            <h2>Administrator</h2>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Wage:</strong> £32,000</p>
            <p><strong>Supervisory responsibilities:</strong> No</p>
        `;
        showMockSocResults();
    }

    function showMockSocResults() {
        socResultsTable.innerHTML = `
            <tr>
                <th>SOC code</th>
                <th>Description</th>
                <th>Confidence</th>
            </tr>
            <tr>
                <td>34215</td>
                <td>Professional administrators in export</td>
                <td>0.90</td>
            </tr>
            <tr>
                <td>16184</td>
                <td>Sales and support professionals in import</td>
                <td>0.38</td>
            </tr>
            <tr>
                <td>92845</td>
                <td>Administrative occupations n.e.c.</td>
                <td>0.34</td>
            </tr>
            <tr>
                <td>09101</td>
                <td>Accounts payable administrators</td>
                <td>0.12</td>
            </tr>
        `;
    }
});