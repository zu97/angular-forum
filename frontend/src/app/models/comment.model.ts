export interface Comment {
  _id: string,
  user: {
    name: string,
  },
  text: string,
  datetime: string,
}

export interface AddCommentData {
  comment: string,
  text: string,
}

export interface FieldError {
  message: string,
}

export interface AddCommentError {
  comment: FieldError,
  text: FieldError,
}

export interface CommentError {
  error: string,
}
