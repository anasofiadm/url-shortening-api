document.getElementById('shortenBtn').addEventListener('click', function() {
  const longUrl = document.getElementById('urlInput').value;

  // Validate that the URL is not empty
  if (!longUrl) {
      alert('Please enter a URL to shorten.');
      return;
  }

  // Ulvis API endpoint
  const apiUrl = `https://ulvis.net/API/write/get?url=${encodeURIComponent(longUrl)}&type=json`;

  // Send the GET request to the API
  fetch(apiUrl)
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
          if (data.success) {
              // Show the shortened URL in an alert
              alert(`Shortened URL: ${data.data.url}`);
          } else {
              // Handle the case where shortening failed
              alert(`Error: ${data.error.msg}`);
          }
      })
      .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('Error:', error);
          alert('An error occurred while shortening the URL.');
      });
});
