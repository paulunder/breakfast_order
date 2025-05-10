// pages/api/send-order.ts
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const {
    to,
    subject,
    text,
  } = req.body

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const transporter = nodemailer.createTransport({
    host: 'diezillertalerin.tirol',
    port: 465,
    secure: true,
    auth: {
      user: process.env.owner_email,
      pass: process.env.owner_email_pw,
    },
  })

  const mailOptions = {
    from: `"Frühstücksservice" <${process.env.owner_email}>`,
    to,
    cc: 'booking@diezillertalerin.tirol',
    subject,
    text,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return res.status(200).json({ message: 'Email sent', info })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ message: 'Error sending email' })
  }
}
