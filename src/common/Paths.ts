/**
 * Express router paths go here.
 */


export default {
  Base: '',
  Posts: {
    Base: '/posts',
    Detail: '/:id',
    Get: '/',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
