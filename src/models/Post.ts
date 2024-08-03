import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'titleOrObj arg must a string or an object ' + 
  'with the appropriate post keys.';

export enum PostRoles {
  Standard,
  Admin,
}


// **** Types **** //

export interface IPost {
  id: number;
  title: string;
  text: string;
  created: Date;
}

export interface ISessionPost {
  id: number;
  title: string;
  text: string;
}


// **** Functions **** //

/**
 * Create new Post.
 */
function new_(
  title?: string,
  text?: string,
  created?: Date,
  id?: number, // id last cause usually set by db
): IPost {
  return {
    id: (id ?? -1),
    title: (title ?? ''),
    text: (text ?? ''),
    created: (created ? new Date(created) : new Date())
  };
}

/**
 * Get post instance from object.
 */
function from(param: object): IPost {
  if (!isPost(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPost;
  return new_(p.title, p.text, p.created, p.id);
}

/**
 * See if the param meets criteria to be a post.
 */
function isPost(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'text' in arg && typeof arg.text === 'string' && 
    'title' in arg && typeof arg.title === 'string' 
  );
}




// **** Export default **** //

export default {
  new: new_,
  from,
  isPost,
} as const;
