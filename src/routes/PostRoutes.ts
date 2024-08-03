import HttpStatusCodes from '@src/common/HttpStatusCodes';

import PostService from '@src/services/PostService';
import { IPost } from '@src/models/Post';
import { IReq, IRes } from '@src/routes/types/express/misc';


// **** Functions **** //

/**
 * Get all posts.
 */
async function getAll(req: IReq, res: IRes) {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const posts = await PostService.getAll(page, limit);
    return res.status(HttpStatusCodes.OK).json({ posts });
}

async function get(req: IReq, res: IRes) {
    const id = +req.params.id;
    const post = await PostService.get(id);
    return res.status(HttpStatusCodes.OK).json({post});
}
/**
 * Add one post.
 */
async function add(req: IReq<{ post: IPost }>, res: IRes) {
    const { post } = req.body;
    await PostService.addOne(post);
    return res.status(HttpStatusCodes.CREATED).json({post});
}

/**
 * Update one post.
 */
async function update(req: IReq<{ post: IPost }>, res: IRes) {
    const { post } = req.body;
    const id = +req.params.id;
    await PostService.updateOne(id, post);
    return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one post.
 */
async function delete_(req: IReq, res: IRes) {
    const id = +req.params.id;
    await PostService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
    get,
    getAll,
    add,
    update,
    delete: delete_,
} as const;
