var express = require('express');
const mailjet = require('node-mailjet')
    // .connect('975b520b579ed7f68df24d988d34d3bc', '9439b6d37a402d058601580521c5476b')4
    .connect('d5756bd2a66525b42917761f83330586', '7550398337eafabeff9e7677d4af213b')

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send({
        'message': 'GET API For UERM Admission',
        'routes': [
            '/registration'
        ],
        'help': [
            'Accepts base 64 encoded string (json)',
            'Json string should look like this',
            [
                {
                    "email": "student@email.com",
                    "firstName": "First Name",
                    "lastName": "Last Name",
                },
                {
                    "email": "another_student@email.com",
                    "firstName": "First Name",
                    "lastName": "Last Name",
                },
            ],
            'Base 64 equivalent: W3siZW1haWwiOiAic3R1ZGVudEBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiAiRmlyc3QgTmFtZSIsImxhc3ROYW1lIjogIkxhc3QgTmFtZSJ9LHsiZW1haWwiOiAiYW5vdGhlcl9zdHVkZW50QGVtYWlsLmNvbSIsImZpcnN0TmFtZSI6ICJGaXJzdCBOYW1lIiwibGFzdE5hbWUiOiAiTGFzdCBOYW1lIn1d',
            'Final url: /admission/registration/W3siZW1haWwiOiAic3R1ZGVudEBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiAiRmlyc3QgTmFtZSIsImxhc3ROYW1lIjogIkxhc3QgTmFtZSJ9LHsiZW1haWwiOiAiYW5vdGhlcl9zdHVkZW50QGVtYWlsLmNvbSIsImZpcnN0TmFtZSI6ICJGaXJzdCBOYW1lIiwibGFzdE5hbWUiOiAiTGFzdCBOYW1lIn1d'
        ]
    });
})
router.get('/registration/:params', (req, res) => {
    // const str = 'eyJlbWFpbCI6ImpvbW1hci5pbGFnYW5AZ21haWwuY29tIn0='
    let recipients = []
    const str = req.params.params
    const buffer = new Buffer(str, 'base64')
    const jsonString = buffer.toString('ascii')
    const json = JSON.parse(jsonString)
    json.forEach((item) => {
        recipients.push({
            "Email": item.email,
            "Name": `${item.firstName} ${item.lastName}`,
        })
    })
    const email = {
        heading: '<h1>UERM Service Notification</h1>',
        body: '<p>Eu sit exercitation ullamco ad ea nostrud est. Cillum quis excepteur consectetur id duis officia amet pariatur cillum. Elit amet eiusmod cupidatat dolor culpa aute est non nostrud ea ut. Sint velit ad irure duis pariatur minim pariatur ex et occaecat enim tempor ea. Aute minim officia ut occaecat do in est voluptate. Laboris amet culpa adipisicing esse non laborum ut eiusmod in culpa id est. Amet adipisicing duis occaecat consectetur ipsum.</p>',
        recipients: recipients,
    }

    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "service-notification@uerm.edu.ph",
                        "Name": "UERM Notification"
                    },
                    "To": email.recipients,
                    "Subject": "UERM Notification Test",
                    // "TextPart": "My first Mailjet email",
                    "HTMLPart": `
                        ${email.heading}
                        ${email.body}
                    `,
                    "CustomID": "UERMAdmissionAPI"
                }
            ]
        })

    request
        .then((result) => {
            // console.log(result.body)
            res.send({ success: result.body })
        })
        .catch((err) => {
            // console.log(err.statusCode)
            res.send({ error: err.statusCode })
        })
    // res.send(JSON.stringify(param));
})
// router.get('/registration', (req, res, next) => {
//     const body = "<p>Eu sit exercitation ullamco ad ea nostrud est. Cillum quis excepteur consectetur id duis officia amet pariatur cillum. Elit amet eiusmod cupidatat dolor culpa aute est non nostrud ea ut. Sint velit ad irure duis pariatur minim pariatur ex et occaecat enim tempor ea. Aute minim officia ut occaecat do in est voluptate. Laboris amet culpa adipisicing esse non laborum ut eiusmod in culpa id est. Amet adipisicing duis occaecat consectetur ipsum.</p>";
//     const request = mailjet
//         .post("send", { 'version': 'v3.1' })
//         .request({
//             "Messages": [
//                 {
//                     "From": {
//                         "Email": "service-notification@uerm.edu.ph",
//                         "Name": "UERM Notification"
//                     },
//                     "To": [
//                         // {
//                         //     "Email": "jeff_zacarias@uerm.edu.ph",
//                         //     "Name": "Jeff"
//                         // },
//                         {
//                             "Email": "jom102386@gmail.com",
//                             "Name": "Jommar"
//                         }
//                     ],
//                     "Subject": "UERM Notification",
//                     // "TextPart": "My first Mailjet email",
//                     "HTMLPart": `
//                         <h1>UERM Service Notification</h1>
//                         ${body}
//                     `,
//                     "CustomID": "UERMAdmissionAPI"
//                 }
//             ]
//         })

//     request
//         .then((result) => {
//             // console.log(result.body)
//             res.send({ success: result.body })
//         })
//         .catch((err) => {
//             // console.log(err.statusCode)
//             res.send({ error: err.statusCode })
//         })
//     // res.send()
// });

module.exports = router;
