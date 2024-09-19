let posts;

const loadPost = async (searchInput = 'coding') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInput}`);
    const data = await res.json();
    posts = data.posts;
    displayPost(posts);
};

loadPost();

// Display Posts

const postContainer = document.getElementById('post-container');

const displayPost = (posts) => {

    if (posts.length <= 0) {
        postContainer.innerHTML = `
            <p class="text-3xl text-red-500">No posts found! <br>
                    Please search again.</p>
        `
    }
    
    posts.forEach(post => {
        const postCard = document.createElement('div');

        const activeClass = post.isActive ? 'bg-yellow-400' : 'bg-red-600';

        postCard.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8 bg-slate-50 rounded-xl p-4 md:p-10">

                <!-- avatar -->
                <div class="avatar">
                    <div class="w-20 h-20 rounded-lg">
                        <img src="${post.image}" />
                    </div>

                    <div id="active" class="${activeClass} w-3 h-3 rounded-full absolute left-[72px] -top-1"></div>
                </div>

                <!-- post content -->
                <div class="w-full">
                    <div class="flex gap-8 text-sm md:text-base">
                        <p># ${post.category}</p>
                        <p>Author: <span>${post.author.name}</span></p>
                    </div>

                    <div class="my-2 space-y-3">
                        <h3 class="text-lg font-bold">${post.title}</h3>

                        <p class="text-gray-400 text-sm md:text-base">${post.description}</p>

                        <p class="border border-dashed"></p>
                    </div>

                    <div class="flex justify-between">
                        <div class="flex gap-2 md:gap-6 text-gray-600 text-sm md:text-base">
                            <div class="flex justify-center items-center gap-2">
                                <i class="fa-regular fa-message"></i>
                                <p>${post.comment_count}</p>
                            </div>

                            <div class="flex justify-center items-center gap-2">
                                <i class="fa-regular fa-eye"></i>
                                <p>${post.view_count}</p>
                            </div>

                            <div class="flex justify-center items-center gap-2">
                                <i class="fa-regular fa-clock"></i>
                                <p>${post.posted_time} min</p>
                            </div>
                        </div>
                        <div onclick="displayReadPost('${post.id}')">
                            <i class="fa-solid fa-envelope-open text-blue-400 hover:cursor-pointer hover:text-red-300 duration-200"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
        postContainer.appendChild(postCard);
    });
};

// Search Post

const searchPost = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    loadPost(searchText);
    searchField.value = '';
    postContainer.innerHTML = '';
};

// display mark as read
const readPostContainer = document.getElementById('read-container');
let markAsReadArr = [];

const displayReadPost = (id) => {
    const matchedItem = markAsReadArr.find(item => item.id == id);

    if (matchedItem) {
        return alert('Already added')
    };

    let readPost = posts.find(post => post.id == id);
    markAsReadArr.push(readPost);

    readPostContainer.innerHTML = '';

    markAsReadArr.forEach(post => {
        const readPostCard = document.createElement('div');
        readPostCard.innerHTML = `
            <div class="flex justify-between gap-4 bg-white p-4 text-sm md:text-base">
                <div>
                    <p class="font-semibold">${post.title}</p>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fa-regular fa-eye"></i>
                    <p>${post.view_count}</p>
                </div>
            </div>
        `
        readPostContainer.appendChild(readPostCard);

    })

};