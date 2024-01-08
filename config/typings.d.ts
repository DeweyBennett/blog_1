import { Image } from "sanity"

export interface Post {
    title: string;
    _description: string;
    mainImage: string;
    slug: {
        current: string;
    };
    author: {
        name: string;
        image: string;
    }
    categories: string[]
    comments: [Comment];
    body: [object]
}

export interface PostBase extends Omit<Post, {"mainImage", "author.image"}> {
    _id: string;
    _createdAt: string;
    mainImage: Image;
    author: {
        name: string;
        image: Image;
    }
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _type: string;
    _updatedAt: string;
}

export interface Category {
    _id: string;
    title: string;
    description: string;
}