document.getElementById('shortenBtn').addEventListener('click', function () {
    console.log('hola')
    const inputUrl = document.getElementById('urlInput').value.trim();

    if (!inputUrl) {
        alert("Please enter a valid URL.");
        return;
    }

    fetch('https://ulvis.net/api/v1/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: inputUrl
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error');
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data);

        if (data.shortUrl) {
            document.getElementById('result').innerHTML = `
                Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
            `;
        } else {
            document.getElementById('result').innerText = "Failed to shorten the URL.";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById('result').innerText = "An error occurred while shortening the URL.";
    });
});
