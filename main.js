document.getElementById('shortenBtn').addEventListener('click', function () {
    const inputUrl = document.getElementById('urlInput').value.trim();

    // Validación básica de URL
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/i;
    if (!inputUrl || !urlPattern.test(inputUrl)) {
        alert("Please enter a valid URL (must start with http:// or https://).");
        console.log("Invalid URL provided:", inputUrl);
        return;
    }

    fetch('https://ulvis.net/api/v1/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.shortUrl) {
            document.getElementById('result').innerHTML = `
                Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
            `;
        } else {
            console.log("API did not return shortUrl:", data);
            document.getElementById('result').innerText = "Failed to shorten the URL.";
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        document.getElementById('result').innerText = "An error occurred while shortening the URL.";
    });
});
