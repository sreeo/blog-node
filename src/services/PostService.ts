import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PostRepo from '@src/repos/PostRepo';
import { IPost } from '@src/models/Post';

import { PaginatedResult } from '@src/routes/types/express/misc';

// **** Variables **** //

export const POST_NOT_FOUND_ERR = 'Post not found';


// **** Functions **** //

/**
 * Get all posts.
 */
function getAll(page: number, limit: number): Promise<PaginatedResult<IPost[]>> {
    return PostRepo.getAll(page, limit);
}

async function get(id: number): Promise<IPost | null> {
    let post = await PostRepo.getOne(id);

    if (!post) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, POST_NOT_FOUND_ERR);
    }
    return post;
}
/**
 * Add one post.
 */
function addOne(post: IPost): Promise<IPost> {
    return PostRepo.add(post);
}

/**
 * Update one post.
 */
async function updateOne(id: number, post: IPost): Promise<void> {
    const persists = await PostRepo.exists(id);

    if (!persists) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, POST_NOT_FOUND_ERR);
    }
    post.id = id;
    return PostRepo.update(post);
}

/**
 * Delete a post by their id.
 */
async function _delete(id: number): Promise<void> {
    const persists = await PostRepo.exists(id);
    if (!persists) {
        throw new RouteError(HttpStatusCodes.NOT_FOUND, POST_NOT_FOUND_ERR);
    }
    return PostRepo.delete(id);
}


// **** Export default **** //

export default {
    get,
    getAll,
    addOne,
    updateOne,
    delete: _delete,
} as const;
