export declare const sendWelcomeEmail: (email: string, name: string) => Promise<void>;
export declare const sendDonationReceiptEmail: (email: string, name: string, amount: number, campaignTitle: string, receiptNumber: string) => Promise<void>;
