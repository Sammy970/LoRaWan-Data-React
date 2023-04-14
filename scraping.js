const axios = require('axios');
const fs = require('fs');

const url = 'https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country/';
axios.get(url)
    .then(response => {
        const html = response.data;
        // HTML content is available in the "html" variable
        // Proceed with parsing and creating JSON object

        const cheerio = require('cheerio');

        // ... Fetch the HTML content using axios as shown in step 2 ...

        const $ = cheerio.load(html); // Load HTML into Cheerio

        // Extract data from specific elements using CSS selectors
        const rows = $('table tbody tr'); // Assuming the data is in a table with rows and columns
        const data = [];
        rows.each((index, row) => {
            const columns = $(row).find('td'); // Assuming each row has three columns
            const country = $(columns[0]).text();
            const frequencyPlan = $(columns[1]).text();
            const regulatoryDocument = $(columns[2]).text();
            data.push({ country, frequencyPlan, regulatoryDocument });
        });

        // console.log(data);
        // ... Extract and store data in the "data" array as shown in step 3 ...

        const jsonData = JSON.stringify(data);
        fs.writeFileSync('./data.json', jsonData);

    })
    .catch(error => {
        console.error(`Failed to fetch data from ${url}: ${error}`);
    });


