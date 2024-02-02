// Fetch users
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => {
    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(posts => {
        // Fetch comments
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
          .then(res => res.json())
          .then(comments => {

            const combinedData = users.map(user => ({
              ...user,
              posts: posts
                .filter(post => post.userId === user.id)
                .map(post => ({
                  ...post,
                  comments: comments.filter(comment => comment.postId === post.id)
                }))
            }));

            combinedData.forEach(combinedUser => {
              const userMarkup = `<li>${combinedUser.name} - Posts: ${combinedUser.posts.length}</li>`;
              document.querySelector('ul').insertAdjacentHTML('beforeend', userMarkup);


              combinedUser.posts.forEach(post => {
                const postMarkup = `
                  <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <ul class="comments">
                      ${post.comments.map(comment => `<li>${comment.name}: ${comment.body}</li>`).join('')}
                    </ul>
                  </div>
                `;
                document.querySelector('.posts').insertAdjacentHTML('beforeend', postMarkup);
              });
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
