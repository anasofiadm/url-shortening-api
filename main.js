document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('urlForm');
  const urlInput = document.getElementById('urlInput');
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://cleanuri.com/api/v1/shorten';

  form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          urlInput.classList.add('is-invalid');
      } else {
          event.preventDefault();
          urlInput.classList.remove('is-invalid');
          const longUrl = urlInput.value.trim();
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
      }
      form.classList.add('was-validated');
  });
});
