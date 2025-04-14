export type Link = {
  id: number
  messages: {
    data:
    {
      message: string | null, gifUrl: string | null,
    }[] | null
  } | null,
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
