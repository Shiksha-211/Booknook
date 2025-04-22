const product = [
    {
        id: 0,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566742512l/41150487.SX98.jpg',
        title: 'Red White and Royal Blue',
        price: 260
    },
    {
        id: 1,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1610900883l/54189398.SX98.jpg',
        title: 'The Spanish Love Deception',
        price: 300
    },
    {
        id: 2,
        image: 'https://www.goodreads.com/book/show/61055838-heartstopper-coloring-book?ref=rae_2',
        title: 'Heartstopper',
        price: 275
    },
    {
        id: 3,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1632928346l/60060431.SX98.jpg',
        title: 'Things We Never Got Over',
        price: 190
    },
    {
        id: 4,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1657897729l/59571699.SX98.jpg',
        title: 'Love on the Brain',
        price: 240
    },
    {
        id: 5,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1656593818l/32822135.SX98.jpg',
        title: "Archer's Voice",
        price: 320
    },
    {
        id: 6,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1610730335l/53086843.SX98.jpg',
        title: 'You Have Reached Sam',
        price: 230
    },
    {
        id: 7,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1668782119l/40097951.SX98.jpg',
        title: 'The Silent Patient',
        price: 430
    },
    {
        id: 8,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1588319723l/51335759.SX98.jpg',
        title: 'Good Girl, Bad Blood',
        price: 290
    },
    {
        id: 9,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1663266312l/61833058.SX98.jpg',
        title: 'How to Kill Men',
        price: 310
    },
    {
        id: 10,
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1404331702l/18460392.SX98.jpg',
        title: 'All the Bright Places',
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