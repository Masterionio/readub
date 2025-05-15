function generateContent() {
  const query = document.getElementById("searchInput").value.trim();
  const type = document.getElementById("contentType").value;
  const output = document.getElementById("contentArea");

  if (!query) {
    output.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  // Simulate AI generation
  let generatedHTML = `<h2>Results for "${query}" [${type}]</h2>`;

  for (let i = 1; i <= 3; i++) {
    if (type === "book") {
      generatedHTML += `
        <article>
          <h3>Chapter ${i}: ${query} - A New Tale</h3>
          <p>${generateText(query)}</p>
        </article>`;
    } else if (type === "comic" || type === "manga") {
      generatedHTML += `
        <article>
          <h3>Page ${i}</h3>
          <img src="https://placehold.co/400x600?text=${query}+${type}+${i}" alt="Generated ${type} Page ${i}">
        </article>`;
    } else if (type === "video") {
      generatedHTML += `
        <article>
          <h3>Clip ${i}: ${query} Explained</h3>
          <video controls width="100%">
            <source src="sample-video.mp4" type="video/mp4">
            <track kind="captions" src="sample.vtt" srclang="en" label="English" default>
          </video>
        </article>`;
    }
  }

  output.innerHTML = generatedHTML;
}

function generateText(seed) {
  return `Once upon a time, in a world of ${seed}, something amazing happened. 
  The journey began, filled with wonder and unexpected twists.`;
}
