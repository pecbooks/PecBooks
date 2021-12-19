{
    function noty(message){
        new Noty({
        theme: 'relax',
        text: message,
        type: 'success',
        layout: 'topRight',
        timeout: 1500
        }).show();
    }

    var createPost = function(){
        var newPostForm = $('#new-post-form');
        // console.log("JS Loaded");
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: 'posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    var newPost = newPostDOM(data.data);
                    noty(data.message);
                    deletePost($(' .delete-post-button', newPost));
                    new ToggleLike($(' .toggle_likes_button',newPost));
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })

        });
    };

    var newPostDOM = function(data){
        return $(`<li id="post-${data.post._id}">
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${data.post._id}">X</a>
                        </small>
                    ${data.post.content}<br>
                    <small>${data.user}</small>
                    <small><a class="toggle_likes_button" data-likes="0" href="/likes/toggle/?id=${data.post._id}&type=Post">0 Likes</a></small>
                    <div id="post-comments">
                        <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Comment... " required>
                        <input type="hidden" name="post" value="${data.post._id}">
                        <input type="submit" value="Add Comment">
                        </form>
                    </div>

                </li>`) 
    }

    var deletePost = function(deleteLink){
        deleteLink.click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                data: $(deleteLink).prop('postid'),
                success: function(data){
                    $(`#post-${data.post_id}`).remove();
                    noty(data.message);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    createPost();
}