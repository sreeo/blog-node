

import jsonfile from 'jsonfile';

import { IPost } from '@src/models/Post';
import { PaginatedResult } from '@src/routes/types/express/misc';

// **** Variables **** //



// **** Types **** //

interface IDb {
    [id: number]: IPost;
}

let nextId: number = 1;
let lock: Promise<void> = Promise.resolve();
let posts: IDb = {};

// **** Functions **** //

async function getAll(page: number, limit: number): Promise<PaginatedResult<IPost[]>> {
    const allPosts = Object.values(posts);
    const total = allPosts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const data = allPosts.slice(startIndex, endIndex);

    return Promise.resolve({
        data,
        total,
        page,
        limit
    });
}

async function write(post: IPost): Promise<void> {
    posts[post.id] = post;
    return Promise.resolve();
}

async function create(postData: Omit<IPost, 'id'>): Promise<IPost> {
    // Wait for any ongoing operations to complete
    await lock;

    // Create a new lock
    let releaseLock: () => void;
    lock = new Promise<void>(resolve => {
        releaseLock = resolve;
    });
    try {
        const newPost: IPost = {
            ...postData,
            id: nextId++
        };
        await write(newPost);
        return newPost;
    } finally {
        // Release the lock
        releaseLock!();
    }
}
async function get(id: number): Promise<IPost> {
    return Promise.resolve(posts[id]);
}

async function delete_(id: number): Promise<boolean> {
    return Promise.resolve(delete posts[id]);
}
// **** Export default **** //

export default {
    create,
    getAll,
    write,
    get,
    delete: delete_
} as const;
