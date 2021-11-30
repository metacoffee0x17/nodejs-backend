const ses = require("node-ses");
let senderEmail = "donotreply@techspecs.io";

const AWS_KEY = process.env.AWS_KEY;
const AWS_SECRET = process.env.AWS_SECRET;

class EmailService {
  constructor() {
    this.client = ses.createClient({
      key: AWS_KEY,
      secret: AWS_SECRET,
      amazon: "https://email.us-west-1.amazonaws.com",	
    });
  }

  async ContactUsMail(body) {
    this.client.sendEmail(
      {
        from: `TechSpecs<${senderEmail}>`,
        to: 'hello@techspecs.io',
        subject: 'Contact Us Email',
        message: `<div>User Email:${body.email}</div><div>Message:${body.message}</div>`,
      },
      function (error, data, response) {
        if (error) {
          console.log("Error in sending email");
          console.log(error);
        } else {
          console.log("Email sent Successfully");
        }
      }
    );
  }
}

module.exports = new EmailService();
