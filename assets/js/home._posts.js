{

    // Method to submit form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new ToggleLike($(' .toggle-like-button', newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })

        })
    }

    // Method to create post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
                ${post.content}
                        <br>
                        <small>
                        ${post.user.name}
                        </small>
                        <br>
                        <small>
                            <a class="toggle-like-button" data-likes="0"
                                href="/likes/toggle/?id=${post._id}&type=Post">
                                0 Likes
                            </a>
                    </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment...." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                    <div id="post-comments-list">
                        
                    </div>
        </div>
    
    
    </li>`);
    }
    // Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}