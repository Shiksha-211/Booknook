const product = [
    {
        id: 0,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1716342357l/209801563.SX98.jpg',
        title: 'City of the Night Birds',
        price: 260
    },
    {
        id: 1,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1710382537l/202991908.SX98.jpg',
        title: 'Very Bad Thing',
        price: 300
    },
    {
        id: 2,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1695073655l/195790893.SX98.jpg',
        title: 'A Legend in the Baking',
        price: 275
    },
    {
        id: 3,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1709454818l/200998630.SX98.jpg',
        title: 'Before We Forget Kindness',
        price: 190
    },
    {
        id: 4,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1708765656l/208209832.SX98.jpg',
        title: 'Games Untold',
        price: 240
    },
    {
        id: 5,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1708004345l/207571151.SX98.jpg',
        title: "The Lake of the Lost Girls",
        price: 320
    },
    {
        id: 6,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1712758755l/203579073.SX98.jpg',
        title: 'Deadly Animals',
        price: 230
    },
    {
        id: 7,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1704835003l/200982372.SX98.jpg',
        title: 'Leap',
        price: 430
    },
    {
        id: 8,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1715672563l/210999862.SX98.jpg',
        title: 'Giants',
        price: 290
    },
    {
        id: 9,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1709127525l/204190332.SX98.jpg',
        title: 'Queer as Folklore',
        price: 310
    },
    {
        id: 10,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1720693086l/210722967.SX98.jpg',
        title: 'Hexed',
        price: 395
    },
    {
        id: 11,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1634139994l/58724745.SX98.jpg',
        title: 'The Book Eaters',
        price: 245
    }
];

const categories = [...new Set(product.map((item) => item))];
document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item) => {
        return item.title.toLowerCase().includes(searchData);
    });
    displayItem(filterData);
});
const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) => {
        var { image, title, price } = item;
        return (`
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src='${image}'></img>
                </div>
                <div class='button'>
                    <p>${title}</p>
                    <h2>₹${price}.00</h2>
                    <button>Add to cart</button>
                </div>
            </div>
        `);
    }).join('');
};

displayItem(categories);
// JavaScript to handle comments with local storage
document.addEventListener('DOMContentLoaded', (event) => {
    // Clear comments from local storage on page load
    localStorage.removeItem('comments');
    
    // Load comments from local storage
    loadComments();

    // Add event listener to the submit button
    document.getElementById('submit-comment').addEventListener('click', addComment);
});

function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        // Get the existing comments from local storage or initialize an empty array if none
        const comments = JSON.parse(localStorage.getItem('comments')) || [];

        // Add the new comment
        comments.push(commentText);

        // Save the updated comments array to local storage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Clear the input field
        commentInput.value = '';

        // Display the updated list of comments
        displayComments(comments);
    }
}

function loadComments() {
    // Get the existing comments from local storage or initialize an empty array if none
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    // Display the comments
    displayComments(comments);
}

function displayComments(comments) {
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', deleteComment);

        commentItem.appendChild(deleteButton);
        commentList.appendChild(commentItem);
    });
}

function deleteComment(event) {
    const index = event.target.getAttribute('data-index');

    // Get the existing comments from local storage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Remove the comment at the specified index
    comments.splice(index, 1);

    // Save the updated comments array to local storage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Display the updated list of comments
    displayComments(comments);
}