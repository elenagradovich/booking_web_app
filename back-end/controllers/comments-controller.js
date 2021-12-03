const Comment = require('../models/comment');


const getCommentsByHotelId = async (req, res, next) => {
  const id = req.params.hotel_id
  try {
    const comments = await Comment
      .find({hotelId: id})
      .populate({ path: 'userId', select: 'name' }) 
      .select('comment date rating')
    
    res.status(200).send( comments );
  } catch (err) {
    return res.status(400).json({message: "Comments for this hotel not found"})
  }
};

const addNewComment = async (req, res, next) => {
  const hotelId = req.params.hotel_id;
  const userId = req.userData.userId;
  const { comment, rating} = req.body
  try {
    const newComment = new Comment(
      {
        comment,
        rating,
        userId,
        hotelId
      }
    )
    await newComment.save();
  } catch (err) {
    return res.status(400).json({message: "Comments wasn't saved"})
  }
  const comments = await Comment
    .find({hotelId: hotelId})
    .populate({ path: 'userId', select: 'name' }) 
    .select('comment date rating')
  if(!comments) {
    return res.status(400).json({message: "Comments for this hotel not found"})
  }
  res.status(200).send( comments );
}

module.exports.getCommentsByHotelId = getCommentsByHotelId;
module.exports.addNewComment = addNewComment;