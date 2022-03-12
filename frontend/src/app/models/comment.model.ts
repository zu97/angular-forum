export interface Comment {
  _id: string,
  user: {
    name: string,
  },
  text: string,
}

export interface AddCommentData {
  comment: string,
  text: string,
}
