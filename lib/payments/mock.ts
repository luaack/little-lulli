import type { PaymentProvider } from "./index";

/** MOCK — nada é cobrado. Pix fica "pendente" até o botão de teste; cartão sempre aprova. */
export const mockPaymentProvider: PaymentProvider = {
  async createCharge(request) {
    await new Promise((r) => setTimeout(r, 700));
    const providerId = `mock_${request.method}_${request.orderId}`;
    if (request.method === "pix") {
      return {
        status: "pending",
        providerId,
        // Texto claramente falso: não é um código Pix válido.
        pixCode: `00020126-PIX-FICTICIO-NAO-PAGUE-${request.orderId}-${request.amount}`,
        pixExpiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      };
    }
    return { status: "paid", providerId };
  },
  async getStatus() {
    return "pending";
  },
};
