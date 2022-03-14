export interface Post {
  _id: string,
  user: {
    name: string,
  },
  title: string,
  description: string,
  image: string,
  commentsCount: number,
  datetime: string,
}

export interface AddPostData {
  [key: string]: any;
  title: string,
  description?: undefined | string,
  image?: undefined | string,
}

export interface FieldError {
  message: string,
}

export interface AddPostError {
  title: FieldError,
  description: FieldError,
  image: FieldError,
}

export interface PostError {
  error: string,
}
