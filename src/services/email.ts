/**
 * Interface representing the structure of an order.
 */
export interface Order {
  items: { name: string; quantity: number; price: number }[];
  totalCost: number;
}

/**
 * Asynchronously sends an email notification with the order details.
 *
 * @param order The order object containing items and total cost.
 * @param recipientEmail The email address of the recipient.
 * @returns A promise that resolves when the email is sent successfully.
 */
export async function sendOrderNotificationEmail(
  order: Order,
  recipientEmail: string
): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log(
    `Sending email to ${recipientEmail} with order details:`, // eslint-disable-line no-console
    order
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Simulated email sent to ${recipientEmail}`);
      resolve();
    }, 1000);
  });
}
