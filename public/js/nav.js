document.addEventListener('DOMContentLoaded', function () {
    // Efek sticky pada header
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    const rightContent = document.querySelector('.right-content');
    
    if (header && rightContent) {
        header.classList.toggle('sticky', window.scrollY > 0);
        rightContent.style.marginRight = window.scrollY > 0 ? '100px' : '0';
    }
});


    // Efek bergulir halus saat menekan menu
    const menuLinks = document.querySelectorAll('.right-content a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Target section with ID ${targetId} not found`);
            }
        });
    });

    // Tambahkan event listener untuk logout
    const logoutButton = document.getElementById('menu-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();
            // Tambahkan kode untuk request logout ke server
            fetch('/logout', {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Logout request failed:', response.statusText);
                } else {
                    // Tambahkan kode untuk handle logout berhasil
                    console.log('Logout successful');
                    window.location.href = '/'; // Redirect ke halaman login
                }
            })
            .catch(error => {
                console.error('Logout request failed:', error.message);
            });
        });
    }
});
