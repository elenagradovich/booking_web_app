const Comment = require('../models/comment');


const getCommentsByHotelId = async (req, res, next) => {
  const hotelId = req.params.id;
  
    const courses = await Comment
      .find()
      .populate('userId', 'email name') //populate достает и добавляет данные по id в таблицу courses из users
      .select('price title img') //select относится к курсам, для вывода нужных полей
  
    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      courses
    })


  try {
    const hotel = await Hotel.findById(hotelId);
    res.send( hotel );
  } catch (err) {
    return res.status(404).json({message: "Hotel not found"})
  }
};

const addNewComment = async (req, res, next) => {
  const { id } = req.body
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body)
  res.redirect('/courses')
}

module.exports.getCommentsByHotelId = getCommentsByHotelId;
module.exports.addNewComment = addNewComment;