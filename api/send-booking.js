export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ message: "Method not allowed" });
    return;
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    response.status(500).json({ message: "Server email settings are missing." });
    return;
  }

  const data = request.body || {};

  const emailBody = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey,
    template_params: {
      customer_name: data.customer_name || "",
      customer_email: data.customer_email || "",
      customer_phone: data.customer_phone || "",
      order_summary: data.order_summary || "",
      total_amount: data.total_amount || ""
    }
  };

  try {
    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      response.status(500).json({ message: errorText || "Email send failed." });
      return;
    }

    response.status(200).json({ message: "Email sent" });
  } catch (error) {
    response.status(500).json({ message: "Email request failed." });
  }
}
