document.getElementById('shortenForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  
  var url = document.getElementById('urlInput').value;
  var apiUrl = 'https://cleanuri.com/api/v1/shorten';

  // Validate URL
  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  // Prepare the request data
  var formData = new URLSearchParams();
  formData.append('url', url);

  // Make the API call
  fetch(apiUrl, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the response for debugging
    if (data.result_url) {
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

