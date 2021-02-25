import doGet from './server/webapp';
import './es6';
import './server/menu';

global.doGet = doGet;

global.sendmail = (email = Session.getActiveUser().getEmail()) => {
  const htmlBody = `
    <p>Hi!!</p>
  `;

  const textBody = htmlBody.replace(/<[^>]+>/g, ' ');
  GmailApp.sendEmail(email, 'Hello from Google Apps Script', textBody, { htmlBody });
};
