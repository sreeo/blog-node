import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '@src/common/Paths';
import Post from '@src/models/Post';

import authMiddleware from './middleware/authMiddleware';
import PostRoutes from './PostRoutes';

import routeCache from 'route-cache';

// **** Variables **** //

const apiRouter = Router(),
    validate = jetValidator();


// ** Add PostRouter ** //

const postRouter = Router();

// Get all posts
postRouter.get(
    Paths.Posts.Get,
    routeCache.cacheSeconds(20),
    PostRoutes.getAll,
);

postRouter.get(
    Paths.Posts.Detail,
    PostRoutes.get,
);
// Add one post
postRouter.post(
    Paths.Posts.Add,
    validate(['post', Post.isPost]),
    PostRoutes.add,
);

// Update one post
postRouter.put(
    Paths.Posts.Update,
    validate(['post', Post.isPost]),
    PostRoutes.update,
);

// Delete one post
postRouter.delete(
    Paths.Posts.Delete,
    validate(['id', 'number', 'params']),
    PostRoutes.delete,
);

// Add PostRouter
apiRouter.use(Paths.Posts.Base, authMiddleware, postRouter);


// **** Export default **** //

export default apiRouter;
