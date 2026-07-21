export declare const config: {
    env: string;
    port: number;
    frontendUrl: string;
    apiUrl: string;
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    payments: {
        stripeSecret: string;
        stripeWebhookSecret: string;
        razorpayKeyId: string;
        razorpayKeySecret: string;
        upiVpa: string;
    };
    email: {
        host: string;
        port: number;
        user: string;
        pass: string;
        from: string;
    };
};
