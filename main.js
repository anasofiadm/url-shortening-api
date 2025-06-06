 document.getElementById('shortenForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const inputUrl = document.getElementById('urlInput').value.trim();

      // Validar URL simple
      const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(inputUrl)) {
        alert("Please enter a valid URL starting with http:// or https://");
        console.log("Invalid URL:", inputUrl);
        return;
      }

      // Llamada a la API de encurtador.dev
     fetch('https://url-shortener-proxy.onrender.com/shorten', { ... }) {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.urlEncurtada) {
          console.log("Shortened URL:", data.urlEncurtada); // 👈 Aquí se muestra en consola
          document.getElementById('result').innerHTML = `
            Shortened URL: <a href="https://${data.urlEncurtada}" target="_blank">${data.urlEncurtada}</a>
          `;
        } else {
          console.log("Unexpected response:", data);
          document.getElementById('result').innerText = "Failed to shorten the URL.";
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        document.getElementById('result').innerText = "An error occurred while shortening the URL.";
      });
    });
