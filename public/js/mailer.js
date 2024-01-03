    const nodemailer = require('nodemailer');

    // Konfigurasi transporter (pengirim)
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "farhannovaldi002@gmail.com",
        pass: "hiam ehvc mvhn cpeh"
    }
    });

function kirimEmail() {
    // Mengumpulkan nilai dari elemen formulir HTML
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const pesan = document.getElementById('pesan').value;

    // Pengaturan email
    const mailOptions = {
        from: user,
        to: 'aplikasinegara@gmail.com',
        subject:`Berikut laporan dari Email: ${email}`,
        text: `Nama: ${nama}\nPesan: ${pesan}`
    };

    // Kirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            alert('Terjadi kesalahan saat mengirim email. Silakan coba lagi.');
        } else {
            console.log('Email terkirim: ' + info.response);
            alert('Email terkirim dengan sukses!');
        }
    });
    return false;
}
