if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://shashank:shashank14@ds113482.mlab.com:13482/video_idea'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost:27017/video_idea'}
}
