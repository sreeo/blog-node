import { IPost } from '@src/models/Post';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

import { PaginatedResult } from '@src/routes/types/express/misc';

// **** Functions **** //

/**
 * Get one post.
 */
async function getOne(postId: number): Promise<IPost | null> {
    return orm.get(postId);
}

/**
 * Get all posts.
 */
async function getAll(page: number, limit: number): Promise<PaginatedResult<IPost[]>> {
    return orm.getAll(page, limit);
}

/**
 * Add one post.
 */
async function add(post: IPost): Promise<IPost> {
    return orm.create(post);
}

/**
 * Update a post.
 */
async function update(post: IPost): Promise<void> {
    return orm.write(post);
}

/**
 * Delete one post.
 */
async function delete_(id: number): Promise<void> {
    await orm.delete(id);
}

async function exists(id: number): Promise<Boolean> {
    const post = await getOne(id);
    if (!post) {
        return false;
    } else {
        return true;
    }

}

// **** Export default **** //

export default {
    getOne,
    getAll,
    add,
    update,
    delete: delete_,
    exists,
} as const;
