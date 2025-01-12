const RECIPIENTS = ['rafa@mafm.pro', 'julian@mafm.pro', 'reynaldo@mafm.pro'];

export async function sendAuditRequest(formData: {
  name: string;
  email: string;
  company: string;
}): Promise<void> {
  const WEBHOOK_URL = 'https://hook.us1.make.com/pmq6avak8t2j1awlbtr218yj7ied0ctb'; // Replace with your webhook URL

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: RECIPIENTS,
        subject: 'New Audit Request',
        message: `
          Name: ${formData.name}
          Email: ${formData.email}
          Company: ${formData.company}
        `,
        formData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email. Status: ${response.status}`);
    }

    console.log('Email successfully sent to:', RECIPIENTS);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
