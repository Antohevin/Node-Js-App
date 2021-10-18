module.exports = function(router) {
    let User = require('./user/user');
    let imageUpload = require('./imageupload/imageupload');
    let topic = require('./topics/topic');
    let post = require('./post/post');
    let comment = require('./comment/comment');
    
    //User
    router.post('/user/registeruser', User.registerUser);
    router.post('/user/loginuser', User.loginUser);
    router.get('/user/getuserdata/:useruid',User.getUserData);


    //image upload
    router.post('/image/imageupload', imageUpload.multiImageUpload);

    //Topic
    router.post('/topic/createtopic', topic.createTopic);
    router.get('/topic/gettopic',topic.getTopic);

    //Post
    router.post('/post/createpost', post.createPost);
    router.get('/post/getpost',post.getPost);


    //Comment
    router.post('/comment/createcomment', comment.createComment);

}
