import { Request, Response } from 'express';
export declare const mockBlogPosts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    coverImage: string;
    publishedAt: string;
}[];
export declare const mockFAQs: {
    id: string;
    question: string;
    answer: string;
    category: string;
}[];
export declare const mockPartners: {
    id: string;
    name: string;
    logo: string;
    category: string;
}[];
export declare const getBlogPosts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getFAQs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPartners: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
