function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.width === '250px' || sidebar.style.width === '') {
    sidebar.style.width = '0';
  } else {
    sidebar.style.width = '250px';
  }
}

// Function to close the sidebar completely
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.width = '0'; // Ensure the sidebar width is completely reset
  setTimeout(function() {
    sidebar.style.width = ''; // Reset inline styles for a clean slate
  }, 500); // Optional: delay to allow transition (match CSS transition time)
}

// Attach closeSidebar to all navigation links
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', closeSidebar);
});


