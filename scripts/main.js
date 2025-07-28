const blogURL = "https://bdurham130.github.io/dev-blog-data/data.json";
const container = document.getElementById("blogContainer");
const toast = new bootstrap.Toast(document.getElementById("successToast"));
let blogData = [];

async function loadBlog() {
  const res = await fetch(blogURL);
  blogData = await res.json();
  renderPosts(blogData);
}

function renderPosts(data) {
  container.innerHTML = data.map(post => `
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${post.title}</h5>
          <h6 class="card-subtitle text-muted mb-2">${post.date}</h6>
          <p class="card-text flex-grow-1">${post.content}</p>
          <p><span class="badge bg-secondary">${post.tags.join('</span> <span class="badge bg-secondary">')}</span></p>
          <a href="${post.link}" target="_blank" class="btn btn-outline-primary mt-2">Read More</a>
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById("savePostBtn").addEventListener("click", () => {
  const title = document.getElementById("titleInput").value;
  const content = document.getElementById("contentInput").value;
  const tags = document.getElementById("tagsInput").value.split(",").map(t => t.trim());
  const link = document.getElementById("linkInput").value;
  const newPost = {
    id: blogData.length + 1,
    title,
    date: new Date().toISOString().split("T")[0],
    content,
    tags,
    link
  };
  blogData.unshift(newPost);
  renderPosts(blogData);
  toast.show();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = blogData.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.tags.some(tag => tag.toLowerCase().includes(term))
  );
  renderPosts(filtered);
});

loadBlog();