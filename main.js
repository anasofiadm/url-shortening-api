document.getElementById('urlShortenerForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the default form submission

  const urlInput = document.getElementById('urlInput').value;
  const encodedUrl = encodeURIComponent(urlInput); // Encode the URL

  try {
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `url=${encodedUrl}`
      });

      const data = await response.json();

      if (data.result_url) {
          alert(`Shortened URL: ${data.result_url}`);
      } else {
          alert(`Error: ${data.error}`);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while shortening the URL.');
  }
});
