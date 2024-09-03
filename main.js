document.getElementById('shortenBtn').addEventListener('click', function() {
    const inputUrl = document.getElementById('inputUrl').value;
    
    if (inputUrl.trim() === "") {
        alert("Please enter a valid URL.");
        return;
    }

    // API request to shorten the URL
    fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.result_url) {
            document.getElementById('result').innerText = `Shortened URL: ${data.result_url}`;
        } else {
            document.getElementById('result').innerText = "Failed to shorten the URL.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = "An error occurred.";
    });
});
