// Sidebar Navigation Fix
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar dropdown toggle functionality
    document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = item.closest('.group');
            
            if (parent.classList.contains('selected')) {
                parent.classList.remove('selected');
            } else {
                // Close all other dropdowns first
                document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (i) {
                    i.closest('.group').classList.remove('selected');
                });
                // Open clicked dropdown
                parent.classList.add('selected');
            }
        });
    });

    // Mobile sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const main = document.querySelector('.main');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.preventDefault();
            if (main) main.classList.toggle('active');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('hidden');
            if (sidebarMenu) sidebarMenu.classList.toggle('-translate-x-full');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function (e) {
            e.preventDefault();
            if (main) main.classList.add('active');
            sidebarOverlay.classList.add('hidden');
            if (sidebarMenu) sidebarMenu.classList.add('-translate-x-full');
        });
    }

    // Initialize mobile state
    if (window.innerWidth < 768) {
        if (main) main.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('hidden');
        if (sidebarMenu) sidebarMenu.classList.add('-translate-x-full');
    }
});