document.getElementById('shortenForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que la página se recargue

  const inputUrl = document.getElementById('urlInput').value.trim();

  // Validación básica de URL
  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  if (!urlPattern.test(inputUrl)) {
    alert("Por favor, ingresá una URL válida que comience con http:// o https://");
    console.log("URL inválida:", inputUrl);
    return;
  }

  // Llamada al proxy (el que desplegaste en Render)
  fetch('https://url-shortener-proxy.onrender.com/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: inputUrl }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error de API: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.urlEncurtada) {
        const shortUrl = data.urlEncurtada.startsWith("http")
          ? data.urlEncurtada
          : `https://${data.urlEncurtada}`;
        
        console.log("Shortened URL:", shortUrl);
        document.getElementById('result').innerHTML = `
          <p>Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
        `;
      } else {
        console.error("Respuesta inesperada:", data);
        document.getElementById('result').innerText = "No se pudo acortar el enlace.";
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      document.getElementById('result').innerText = "Ocurrió un error al acortar la URL.";
    });
});
