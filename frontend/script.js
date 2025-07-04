const apiUrl = 'http://localhost:3000/items';
const form = document.getElementById('form');
const list = document.getElementById('list');

async function fetchItems() {
  const res = await fetch(apiUrl);
  const items = await res.json();
  list.innerHTML = items.map(i => `<li>${i.text}</li>`).join('');
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  form.reset();
  fetchItems();
});

// Au chargement
fetchItems();
