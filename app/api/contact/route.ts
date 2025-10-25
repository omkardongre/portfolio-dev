import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("Contact API called")
    console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY)

    const body = await request.json()
    console.log("Form data received:", body)

    const { name, email, company, subject, inquiryType, message } = body

    // Validate required fields
    if (!name || !email || !subject || !inquiryType || !message) {
      console.log("Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Attempting to send notification email...")

    // Send notification email to you
    const notificationEmail = await resend.emails.send({
      from: "contact@omkard.site",
      to: ["omkardongre5@gmail.com"],
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `,
    })

    console.log("Notification email result:", notificationEmail)

    console.log("Attempting to send confirmation email...")

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
      from: "Omkar Dongre <hello@omkard.site>",
      to: [email],
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank You for Your Message!
          </h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Hi ${name},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Thank you for reaching out through my portfolio website. I've received your message about 
            "<strong>${subject}</strong>" and I appreciate you taking the time to contact me.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">What's Next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>I'll review your message carefully</li>
              <li>You can expect a response within 24-48 hours</li>
              <li>I'll reach out to discuss your ${inquiryType.replace("-", " ")} in detail</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            In the meantime, feel free to check out my latest projects on 
            <a href="https://github.com/omkardongre" style="color: #007bff;">GitHub</a> or connect with me on 
            <a href="https://linkedin.com/in/omkardongre" style="color: #007bff;">LinkedIn</a>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Best regards,<br>
            <strong>Omkar Dongre</strong><br>
            Fullstack Developer
          </p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This is an automated confirmation email. Please don't reply to this email.
            </p>
          </div>
        </div>
      `,
    })

    console.log("Confirmation email result:", confirmationEmail)

    return NextResponse.json({
      message: "Email sent successfully",
      notificationId: notificationEmail.data?.id,
      confirmationId: confirmationEmail.data?.id,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
