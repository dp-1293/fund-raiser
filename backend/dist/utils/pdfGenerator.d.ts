export declare const generateTaxReceiptPDFBuffer: (data: {
    receiptNumber: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    campaignTitle: string;
    date: string;
}) => Promise<Buffer>;
