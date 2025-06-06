document.getElementById('shortenBtn').addEventListener('click', function () {
    const inputUrl = document.getElementById('urlInput').value.trim();

    if (inputUrl === "") {
        alert("Please enter a valid URL.");
        return;
    }

    console.log("Input URL:", inputUrl);

    fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ url: inputUrl }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data);

        if (data.result_url) {
            document.getElementById('result').innerText = `Shortened URL: ${data.result_url}`;
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
