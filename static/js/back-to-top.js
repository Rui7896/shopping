// 在 main.js 或者 back-to-top.js 中

document.addEventListener('DOMContentLoaded', function() {
    var backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        // 当用户滚动页面时执行
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            // 当页面向下滚动超过 300px 时显示按钮
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = "block";
                // 如果想用淡入效果，需要配合CSS的opacity和visibility
                // backToTopButton.style.opacity = "1";
                // backToTopButton.style.visibility = "visible";
            } else {
                backToTopButton.style.display = "none";
                // backToTopButton.style.opacity = "0";
                // backToTopButton.style.visibility = "hidden";
            }
        }

        // 当用户点击按钮时，平滑滚动到页面顶部
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认的锚点行为
            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            // 平滑滚动效果
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});