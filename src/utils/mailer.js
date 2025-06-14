import nodemailer from 'nodemailer'

export const sendRecoveryEmail = async (to, token) => {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
    })

    const resetLink = `http://localhost:3000/reset-password?token=${token}`

    const info = await transporter.sendMail({
    from: `"Ecommerce 👻" <${testAccount.user}>`,
    to,
    subject: 'Recuperación de contraseña',
    html: `
        <h2>Restablecer contraseña</h2>
        <p>Haz clic en el siguiente enlace:</p>
        <a href="${resetLink}">${resetLink}</a>
    `
    })

    console.log('Mensaje enviado:', info.messageId)
    console.log('Vista previa:', nodemailer.getTestMessageUrl(info))
}