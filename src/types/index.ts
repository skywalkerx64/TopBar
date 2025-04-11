export type Link = {
  id: number
  message: string
  gifUrl: string
  url: string
  backgroundColor: string
  textColor: string
}

export type Track = {
  id: number,
  ip: string,
  url: string,
  linkId: number
  link?: Link
  createdAt: string
  updatedAt: string
}
