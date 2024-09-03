document.getElementById('shortenBtn').addEventListener('click', function() {
    const inputUrl = document.getElementById('urlInput').value.trim();
    
    if (inputUrl === "") {
        alert("Please enter a valid URL.");
        return;
    }

    console.log("Input URL:", inputUrl); // Debugging input URL

    // API request to shorten the URL
    fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data); // Debugging API response

        if (data.result_url) {
            // Display the shortened URL in the result div
            document.getElementById('result').innerText = `Shortened URL: ${data.result_url}`;
            
            // Show an alert with the shortened URL
            alert(`Shortened URL: ${data.result_url}`);
        } else {
            document.getElementById('result').innerText = "Failed to shorten the URL.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = "An error occurred while shortening the URL.";
    });
});
