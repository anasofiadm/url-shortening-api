document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#urlShortenerForm');
  const input = document.querySelector('#urlInput');
  const errorMessage = document.querySelector('.invalid-feedback');
  const resultContainer = document.querySelector('#resultContainer');
  const shortenedLink = document.querySelector('#shortenedLink');
  const copyButton = document.querySelector('#copyButton');

  form.addEventListener('submit', function (e) {
      e.preventDefault();

      const longUrl = input.value.trim();

      if (!longUrl) {
          input.classList.add('is-invalid');
          errorMessage.textContent = 'Please add a link.';
          return;
      } else {
          input.classList.remove('is-invalid');
          errorMessage.textContent = '';
      }

      fetch('https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `url=${encodeURIComponent(longUrl)}`
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          shortenedLink.textContent = data.result_url;
          shortenedLink.href = data.result_url;
          resultContainer.classList.remove('d-none');
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Failed to shorten URL. Please try again later.');
      });
  });

  copyButton.addEventListener('click', function () {
      const urlToCopy = shortenedLink.textContent;
      navigator.clipboard.writeText(urlToCopy).then(() => {
          copyButton.textContent = 'Copied!';
          copyButton.classList.add('btn-primary');
      }).catch(err => {
          console.error('Could not copy text: ', err);
      });
  });

  input.addEventListener('input', function () {
      if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
          errorMessage.textContent = '';
      }
  });
});
