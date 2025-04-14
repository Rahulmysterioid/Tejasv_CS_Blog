let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const blogList = document.getElementById('blogList');
  if (!blogList) return;

  blogList.innerHTML = '';
  posts.forEach((post, i) => {
    if (post.title.toLowerCase().includes(search) || post.content.toLowerCase().includes(search)) {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<strong>${i + 1}. ${post.title}</strong><p class="date">${post.date}</p><p>${post.content.substring(0, 100)}...</p>`;
      div.onclick = () => window.location = 'post.html?id=' + i;
      blogList.appendChild(div);
    }
  });
}
function addPost() {
  const title = document.getElementById('titleInput').value;
  const content = quill.root.innerHTML;
  const date = new Date().toLocaleString();
  if (!title || !content) return alert("Please enter title and content.");

  posts.push({ title, content, date });
  localStorage.setItem('posts', JSON.stringify(posts));
  alert("Post added!");
  document.getElementById('titleInput').value = '';
  quill.setContents([]);
}
renderPosts();

// Like button click handler
document.querySelectorAll(".like-btn").forEach(button => {
  button.addEventListener("click", () => {
    let count = parseInt(button.innerText.match(/\d+/)) || 0;
    count += 1;
    button.innerText = `👍 Like (${count})`;
  });
});


