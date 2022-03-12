export interface Post {
  _id: string,
  user: {
    name: string,
  },
  title: string,
  description: string,
  image: string,
  datetime: string,
}

export interface AddPostData {
  [key: string]: any;
  title: string,
  description?: undefined | string,
  image?: undefined | string,
}


