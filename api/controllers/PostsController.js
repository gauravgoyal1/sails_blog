/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `PostsController.index()`
   */
  index: function (req, res) {
    Post.find({}).exec(function afterwards(err, found){
      if (err) {
        console.log(err);
        return res.serverError();
      }
      if (!found.length){
        console.log('nothing found');
        return res.notFound();
      } else {
        var payload = {posts: found};
        return res.view('posts/index', payload);
      }
    });
  },


  /**
   * `PostsController.create()`
   */
  create: function (req, res) {
    var data = req.params.all();
    data = {title: data.title, content: data.content};
    Post.create(data).exec(function afterwards(err, created){
      if (err) {
        console.log(err);
        return res.serverError();
      }
      console.log('Created post with id ' + created.id);
    });
    return res.redirect('posts/');
  },


  /**
   * `PostsController.update()`
   */
  update: function (req, res) {
    var data = req.params.all();
    data = {title: data.title, content: data.content};
    Post.update({id: req.params.id}, data).exec(function afterwards(err, updated){
      if (err) {
        console.log(err);
        return res.serverError();
      }
      if (!updated){
        console.log('nothing updated');
        return res.notFound();
      } else {
        var payload = {post: updated[0]};
        console.log('post ' + updated[0].id + ' updated');
        return res.view('posts/show', payload);
      }
      console.log('Updated post with id ' + updated[0].id);
    });
  },


  /**
   * `PostsController.show()`
   */
  show: function (req, res) {
    Post.findOne({id: req.params.id}).exec(function afterwards(err, found){
      if (err) {
        console.log(err);
        return res.serverError();
      }
      if (!found){
        console.log('nothing found');
        return res.notFound();
      } else {
        var payload = {post: found};
        return res.view('posts/show', payload);
      }
    });
  },


  /**
   * `PostsController.destroy()`
   */
  destroy: function (req, res) {
    Post.destroy({id: req.params.id}).exec(function afterwards(err, deleted){
      if (err) {
        console.log(err);
        return res.serverError();
      }
      if (!deleted){
        console.log('no post to be deleted');
        return res.redirect('/posts');
      }else{
        console.log('post ' + deleted[0].id + ' deleted');
        return res.redirect('/posts');
      }
    });
  }
};

