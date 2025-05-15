async function generateContent() {
  const query = document.getElementById("searchInput").value.trim();
  const type = document.getElementById("contentType").value;
  const output = document.getElementById("contentArea");

  if (!query) {
    output.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  output.innerHTML = "<p>Generating content...</p>";

  const response = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: query, type })
  });

  const data = await response.json();
  let html = `<h2>${data.title}</h2>`;

  if (type === "book") {
    data.pages.forEach(p => {
      html += `<article><h3>Chapter ${p.chapter}</h3><p>${p.text}</p></article>`;
    });
  } else if (type === "comic" || type === "manga") {
    data.images.forEach((img, i) => {
      html += `<article><h3>Page ${i + 1}</h3><img src="${img}" alt="${type} page" /></article>`;
    });
  } else if (type === "video") {
    html += `
      <article>
        <video id="videoPlayer" controls>
          <source src="${data.video_url}" type="video/mp4">
          <track kind="captions" src="${data.captions.en}" srclang="en" label="English" default>
        </video>
        <label>Playback Speed: <span id="speedVal">1.00×</span></label>
        <input type="range" min="0.25" max="3.00" step="0.05" value="1" 
               oninput="updateSpeed(this, 'videoPlayer', 'speedVal')" />
        <button onclick="toggleCaptions('videoPlayer')">Toggle Captions</button>
      </article>`;
  }

  output.innerHTML = html;
}

function updateSpeed(slider, videoId, labelId) {
  const video = document.getElementById(videoId);
  const label = document.getElementById(labelId);
  const speed = parseFloat(slider.value).toFixed(2);
  video.playbackRate = speed;
  label.textContent = `${speed}×`;
}

function toggleCaptions(videoId) {
  const tracks = document.getElementById(videoId).textTracks;
  for (let track of tracks) {
    track.mode = track.mode === "showing" ? "disabled" : "showing";
  }
}
