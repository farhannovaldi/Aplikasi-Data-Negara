    require('dotenv').config();
    const nodemailer = require('nodemailer');

    // Konfigurasi transporter (pengirim)
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });

function kirimEmail() {
    // Mengumpulkan nilai dari elemen formulir HTML
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const subjek = document.getElementById('subjek').value;
    const pesan = document.getElementById('pesan').value;

    // Pengaturan email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'aplikasinegara@gmail.com',
        subject: subjek,
        text: `Nama: ${nama}\nEmail: ${email}\nSubjek: ${subjek}\nPesan: ${pesan}`
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
