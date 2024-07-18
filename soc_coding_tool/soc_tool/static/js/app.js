document.addEventListener('DOMContentLoaded', function() {
    // Sample data (replace this with actual data loading logic later)
    const jobs = [
        { id: 1, title: "Police inspector", description: "Constable" },
        { id: 2, title: "Labourer", description: "Site worker" },
        { id: 3, title: "Administrator", description: "Export admin" },
    ];

    const jobList = document.getElementById('job-list');
    const jobDetails = document.getElementById('job-details');
    const socResults = document.getElementById('soc-results');

    // Populate job list
    jobs.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.id}</td>
            <td>${job.title}</td>
            <td>${job.description}</td>
        `;
        row.addEventListener('click', () => showJobDetails(job));
        jobList.appendChild(row);
    });

    function showJobDetails(job) {
        jobDetails.innerHTML = `
            <h2>Job Details</h2>
            <p><strong>Title:</strong> ${job.title}</p>
            <p><strong>Description:</strong> ${job.description}</p>
        `;
        // In a real app, you would call the API here to get SOC codes
        showMockSocResults();
    }

    function showMockSocResults() {
        socResults.innerHTML = `
            <h2>Top SOC Results:</h2>
            <ul>
                <li>34215 - Professional administrators in export (Confidence: 0.90)</li>
                <li>16184 - Sales and support professionals in import (Confidence: 0.38)</li>
                <li>92845 - Administrative occupations n.e.c. (Confidence: 0.34)</li>
            </ul>
        `;
    }
});