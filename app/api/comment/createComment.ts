import type { NextApiRequest, NextApiResponse } from "next";
import { client } from '../../../sanity/lib/client'

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('Submitting Comment')
    const { _id, name, email, comment } = JSON.parse(req.body)

    try{
        await client.create({
            _type: 'comment',
            post: {
                _type: "reference",
                _ref: _id,
            },
            name,
            email,
            comment
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({ message: 'Could not submit your comment', err })
    }
    console.log("Comment Submitted")
    res.status(200).json({message: 'Comment Submitted'})
}