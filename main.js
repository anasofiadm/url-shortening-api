document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const urlInput = document.getElementById('urlInput');
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://cleanuri.com/api/v1/shorten';

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const longUrl = urlInput.value.trim();
      if (!longUrl) {
          alert('Please enter a URL.');
          return;
      }

      const encodedUrl = encodeURIComponent(longUrl);
      const requestBody = `url=${encodedUrl}`;

      fetch(proxyUrl + apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: requestBody
      })
      .then(response => response.json())
      .then(data => {
          if (data.result_url) {
              alert(`Shortened URL: ${data.result_url}`);
          } else if (data.error) {
              alert(`Error: ${data.error}`);
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while shortening the URL.');
      });
  });
});
