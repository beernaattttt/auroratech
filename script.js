const staffUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlG3JxHmaS3q-_4Z0EZYolgZEJlpo1FyQxy6VIT_3BgJypkqRCuiqn_Y0NJrz7P7Rd9H4GgNRUQMZU/pubhtml?gid=0&single=true';

// Function to show login notifications
function showNotification(type, message) {
  const notification = document.getElementById('notification');
  notification.classList = 'notification ' + type;
  document.getElementById('notif-message').textContent = message;
  notification.style.display = 'flex';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Function to handle the login process
function login() {
  const username = document.getElementById('username').value;

  fetch(staffUrl)
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const rows = Array.from(doc.querySelectorAll('table tbody tr'));

      const userRow = rows.find(row => row.querySelector('td').innerText === username);

      if (userRow) {
        const columns = Array.from(userRow.querySelectorAll('td')).map(col => col.innerText);
        showNotification('success', 'Login successful!');

        // Redirect to another page (dashboard, profile, etc.)
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        showNotification('error', 'User not found!');
      }
    })
    .catch(error => console.error('Error fetching staff data:', error));
}
