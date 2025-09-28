const express = require('express');
const path = require('path');
const axios = require('axios');   // for making HTTP requests
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Forward form submission to Flask backend
app.post('/submit', async (req, res) => {
    try {
        const { name, age, email } = req.body;

        // Forward data to Flask backend (running on port 8000)
        const response = await axios.post('http://backend:8000/submit', {
            name,
            age,
            email
        });

        // Show Flask response in browser
        res.send(`
            <h2>Form Submitted via Flask Backend</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <br>
            <p><em>Flask says:</em> ${JSON.stringify(response.data)}</p>
            <a href="/">Go Back</a>
        `);

    } catch (error) {
        console.error("Error forwarding request:", error.message);
        res.status(500).send("Error communicating with Flask backend.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀Express frontend running at http://localhost:${port}`);
});
