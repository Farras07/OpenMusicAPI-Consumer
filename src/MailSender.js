const nodemailer = require('nodemailer');
 
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music Apps',
      to: targetEmail,
      subject: 'Ekspor Lagu Playlist',
      text: 'Terlampir hasil dari ekspor Lagu Playlist',
      attachments: [
        {
          filename: 'playlistSongs.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
