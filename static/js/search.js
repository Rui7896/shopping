// static/js/search.js
(function () {
    'use strict';

    const searchInput = document.getElementById('search-page-query'); // 页面内搜索框的输入
    const headerSearchInput = document.querySelector('#search input[name="q"]'); // 头部搜索框的输入
    const resultsContainer = document.getElementById('search-results');
    const searchTitle = document.getElementById('search-title');
    let lunrIndex, data; // lunr 索引和原始数据

    // --- 1. 获取搜索参数 ---
    function getQueryVariable(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
        return null;
    }

    const searchQuery = getQueryVariable('q');

    // --- 2. 初始化 Lunr 索引 ---
    function initLunr(searchData) {
        lunrIndex = lunr(function () {
            this.ref('permalink');
            this.field('title', { boost: 10 });
            this.field('tags', { boost: 5 });
            this.field('categories', { boost: 5 });
            this.field('content');

            searchData.forEach(function (doc) {
                if (doc.permalink && doc.title && doc.content) {
                    this.add(doc);
                }
            }, this);
        });
    }

    // ========================================
    // 截断函数 (移到 displayResults 之前)
    // ========================================
    function truncate(text, length) {
        if (!text || typeof text !== 'string') {
            return ''; // 如果 text 不是有效字符串，返回空字符串
        }
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + '...';
    }

    // --- 3. 显示搜索结果 ---
    function displayResults(results) {
        if (!resultsContainer) {
            return;
        }
        resultsContainer.innerHTML = '';

        if (results.length) {
            const ul = document.createElement('ul');
            ul.className = 'search-results-list global-list';

            results.forEach(function (result) {
                const item = data.find(d => d.permalink === result.ref);
                if (item) {
                    const li = document.createElement('li');
                    li.className = 'search-result-item sa-post small-post post-style-1 mb-3';
                    let itemHTML = '';
                    const imageToDisplay = item.thumbnail || item.image;

                    if (imageToDisplay) {
                       itemHTML += `
                           <div class="entry-header">
                               <div class="entry-thumbnail">
                                   <a href="${item.permalink}">
                                       <img class="img-fluid" 
                                            src="${imageToDisplay}" 
                                            alt="${item.title}" 
                                            style="width: 350px; height: 190px; object-fit: cover;">
                                   </a>
                               </div>
                           </div>`;
                    } else {
                        itemHTML += `
                           <div class="entry-header">
                               <div class="entry-thumbnail">
                                   <a href="${item.permalink}">
                                       <div style="width: 350px; height: 190px; background: #eee; display: flex; align-items: center; justify-content: center;">No preview image</div>
                                   </a>
                               </div>
                           </div>`;
                    }

                    itemHTML += `
                        <div class="entry-content">
                            <h2 class="entry-title"><a href="${item.permalink}">${item.title}</a></h2>
                            <div class="entry-meta">
                               <ul class="global-list">
                                   <li><i class="far fa-clock"></i> ${item.date}</li>
                                   ${item.categories ? `<li><i class="far fa-folder"></i> ${item.categories.join(', ')}</li>` : ''}
                                   ${item.tags ? `<li><i class="fas fa-tags"></i> ${item.tags.join(', ')}</li>` : ''}
                               </ul>
                            </div>
                            <p class="search-excerpt">${truncate(item.content, 150)}</p>   
                        </div>`;
                    li.innerHTML = itemHTML;
                    ul.appendChild(li);
                }
            });
            resultsContainer.appendChild(ul);
        } else {
            resultsContainer.innerHTML = '<p class="text-center text-muted">No results that match your search term were found.</p>';
        }
    }

    // --- 4. 执行搜索 ---
    function performSearch(query) {
        if (!query || !lunrIndex) {
            if (resultsContainer) { // 确保 resultsContainer 存在
                resultsContainer.innerHTML = '<p class="text-center text-muted">Please enter keywords for the search...</p>';
            }
            if (searchTitle) { // 确保 searchTitle 存在
                 searchTitle.textContent = 'Search results';
            }
            return;
        }

        if (searchTitle) {
            const displayQuery = query.length > 50 ? query.substring(0, 50) + '...' : query;
            searchTitle.textContent = `The results of searching for "${displayQuery}" `;
        }
        if (searchInput) searchInput.value = query;
        if (headerSearchInput && document.activeElement !== headerSearchInput) { // 修正了判断条件
            headerSearchInput.value = query;
        }

        try {
            const lunrResult = lunrIndex.search(`*${query}*~1 ${query}~1`);
            displayResults(lunrResult);
        } catch (e) {
            console.error("Lunr search error:", e);
            if (resultsContainer) {
                resultsContainer.innerHTML = '<p class="text-center text-danger">An error occurred during the search. Please try again later.</p>';
            }
        }
    }

    // --- 5. 加载索引并初始化 ---
    document.addEventListener('DOMContentLoaded', function() {
        fetch('/index.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
             })
            .then(searchData => {
                if (!searchData || searchData.length === 0) { // 检查 searchData 是否为空
                    console.warn("Search index is empty or invalid.");
                    if(resultsContainer) {
                        resultsContainer.innerHTML = '<p class="text-center text-warning">The search index is empty or invalid, and the search function may not work properly.</p>';
                    }
                    return; // 如果索引为空，不继续初始化 Lunr
                }
                data = searchData;
                initLunr(searchData);

                if (searchQuery) {
                    performSearch(searchQuery);
                } else {
                     if(resultsContainer) {
                        resultsContainer.innerHTML = '<p class="text-center text-muted">Please enter keywords for the search..</p>';
                     }
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing search index:', error);
                 if(resultsContainer) {
                    resultsContainer.innerHTML = '<p class="text-center text-danger">The search index cannot be loaded. Please try again later.</p>';
                 }
            });

        const searchPageForm = document.getElementById('search-page-form');
        if (searchPageForm && searchInput) {
            searchPageForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const newQuery = searchInput.value;
                if (window.history.pushState) {
                    const newURL = window.location.pathname + '?q=' + encodeURIComponent(newQuery);
                    window.history.pushState({path:newURL}, '', newURL);
                }
                performSearch(newQuery);
            });
        }
    });

})();