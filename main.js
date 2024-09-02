
document.getElementById('shortenBtn').addEventListener('click', function() {
  var url = document.getElementById('urlInput').value;
  var apiUrl = 'https://cleanuri.com/api/v1/shorten';

  // Validate URL
  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  // Prepare the request data
  var formData = new URLSearchParams();
  formData.append('url', encodeURIComponent(url));

  // Make the API call
  fetch(apiUrl, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.result_url) {
      // Show alert with the shortened URL
      alert('Shortened URL: ' + data.result_url);
    } else {
      alert('An error occurred: ' + (data.error || 'Unknown error'));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});

