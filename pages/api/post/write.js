import { createPost } from '../../../lib/posts'
import { format } from 'date-fns'

export default async function handler(req, res) {
  const { id, title, content } = req.body

  try {
    await createPost({
      id,
      title,
      date: format(new Date(), 'yyyy-MM-dd'),
      content,
    })

    res.status(200).json({ message: `create success` })
  } catch (e) {
    res.status(500).json({ message: `crate failed : ${e}` })
  }
}
