// // src/app/api/send-order/route.ts
// import { NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'

// export async function POST(request: Request) {
//   const body = await request.json()
//   const { to, subject, text } = body

//   if (!to || !subject || !text) {
//     return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'diezillertalerin.tirol',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.owner_email,
//       pass: process.env.owner_email_pw,
//     },
//   })

//   const mailOptions = {
//     from: `"Frühstücksservice" <${process.env.owner_email}>`,
//     to,
//     cc: 'booking@diezillertalerin.tirol',
//     subject,
//     text,
//   }

//   try {
//     const info = await transporter.sendMail(mailOptions)
//     return NextResponse.json({ message: 'Email sent', info })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     return NextResponse.json({ message: 'Error sending email' }, { status: 500 })
//   }
// }
