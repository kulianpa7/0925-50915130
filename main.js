$('.card').on('click', function() {
    $(this).toggleClass('flipped');
});
Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        // 隨機選擇一個索引
        const j = Math.floor(Math.random() * (i + 1));
        // 交換元素
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this; // 返回打亂後的陣列
}
$(document).ready(function() {
    let picture_img = 1;
    let timerInterval;
    let elapsedTime = 0;
    timerInterval = setInterval(function() {
        elapsedTime++;
        if (10 - elapsedTime > 0) {
            $('.sec').text(10 - elapsedTime);
        }else if(10 - elapsedTime == 0){
            $('.sec').text('');
        }
    }, 1000);
    let front_img = [
    ];
    let front_img1 = [
        `https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800`,
        "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/34231/antler-antler-carrier-fallow-deer-hirsch.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/62289/yemen-chameleon-chamaeleo-calyptratus-chameleon-reptile-62289.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/17811/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/86405/penguin-funny-blue-water-86405.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ];
    let front_img2 = [
        `https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg`,
        "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
    front_img = front_img1;
    front_img.forEach(ele=>{
        front_img.push(ele);
    })
    const $main = $('.main'); // 主容器
    $('.maintitle').on('click',function(){
        win= 0;
        elapsedTime=0;
        if(picture_img==1){
            $main.empty();
            clearsidebar2();
            front_img = front_img2;
            front_img.forEach(ele=>{
                front_img.push(ele);
            })
            rows=4;
            cols=4;
            renderGrid()
            picture_img = 0;
        }else {
            $main.empty();
            clearsidebar2()
            rows=4;
            cols=4;
            front_img = front_img1;
            front_img.forEach(ele=>{
                front_img.push(ele);
            })
            renderGrid()
            picture_img=1;
        }
        // 預設開啟卡片
        $('.card').addClass('flipped'); // 假設這會顯示正面
        // 設置 10 秒後翻轉卡片
        setTimeout(() => {
            $('.card').toggleClass('flipped'); // 翻轉卡片
        }, 10000); // 10秒（10000毫秒）
    })
    front_img.shuffle();
    front_img.shuffle();
    let rows = 4; // 初始行數
    let cols = 4; // 初始列數
    let index = 0;
    let win = 0;
    const $sidebar2 = $('.sidebar2');
    const clearsidebar2 = () =>{
        $sidebar2.empty();
        index = 0;
        while(index++ <= rows*cols/2-1){
            $sidebar2.append(`
                <div class="imglink" id="${index}">
                    <input type="text" value="${front_img[index-1]}" class="inp">
                </div>
            `)
        }
    }
    while(index++ <= rows*cols/2-1){
        $sidebar2.append(`
            <div class="imglink" id="${index}">
                <input type="text" value="${front_img[index-1]}" class="inp">
            </div>
        `)
    }
    function renderGrid() {
        $main.empty(); // 清空主容器
        for (let i = 0; i < rows; i++) {
            const $row = $('<div>').addClass(`row rol-margin rol${i}`);
            for (let j = 0; j < cols; j++) {
                const $card = $(`
                    <div class="card col pic col${j}">
                        <div class="card-inner">
                            <div class="card-front">
                                <img src="https://picsum.photos/200" alt="Front Image">
                            </div>
                            <div class="card-back">
                                <img src="${front_img[i*4+j]}" alt="Back Image">
                            </div>
                        </div>
                    </div>
                `);
                $row.append($card);
            }
            $main.append($row);
        }
        
        let flippedCards = []; // 用於存儲翻轉的卡片

        // 點擊卡片翻面
        $('.card').on('click', function() {
            const $card = $(this);
            if($(this).hasClass('success')){
                return
            }
            if (flippedCards.length <= 1) 
                $card.toggleClass('flipped');
        
            // 獲取翻轉的卡片
            if ($card.hasClass('flipped')) {
                flippedCards.push($card); // 將翻轉的卡片添加到數組中
            } else {
                // 如果卡片翻回去，從數組中移除
                flippedCards = flippedCards.filter(card => card[0] !== $card[0]);
            }
        
            // 當翻轉的卡片數量達到2張時檢查
            if (flippedCards.length === 2) {
                const imgUrl1 = flippedCards[0].find('.card-back img').attr('src');
                const imgUrl2 = flippedCards[1].find('.card-back img').attr('src');
                console.log(imgUrl1,imgUrl2)
                // 判斷兩個圖片的 URL 是否相同
                if (imgUrl1 === imgUrl2) {
                    // 如果相同，添加 success 類
                    flippedCards.forEach(card => card.addClass('success'));
                    win++;
                    if(win == rows*cols/2+1){
                        Swal.fire({
                            title: "勝利",
                            text: `你花了${elapsedTime}秒`,
                            icon: "success",
                            confirmButtonText: '確定'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // 當用戶點擊確定按鈕後執行以下代碼
                              $main.empty();
                              rows = 4;
                              cols = 4;
                              clearsidebar2();
                              renderGrid();
                            }
                          });
                    }
                } else {
                    // 如果不同，延遲翻回去
                    setTimeout(() => {
                        $('.card').not('.success').removeClass('flipped');
                    }, 1000); // 延遲1秒翻回去
                }
        
                // 清空翻轉卡片數組
                flippedCards = [];
            }
        });

    }

    // 初始化網格
    renderGrid();

    // 點擊 .btn2 增加 X 軸列數
    $('.btn2').on('click', function() {
        cols++;
        $sidebar2.empty();
        clearsidebar2();
        renderGrid(); // 重新渲染網格
    });

    // 點擊 .btn3 增加 Y 軸行數
    $('.btn3').on('click', function() {
        rows++;
        $sidebar2.empty();
        clearsidebar2();
        renderGrid(); // 重新渲染網格
    });
    // 點擊 .btn4 減少 X 軸列數
    $('.btn4').on('click', function() {
        if (cols > 1) {
            cols--;
            clearsidebar2();
            renderGrid(); // 重新渲染網格
        }
    });
    // 點擊 .btn5 減少 Y 軸行數
    $('.btn5').on('click', function() {
        if (rows > 1) {
            rows--;
            $sidebar2.empty();
            index=0;
            while(index++ <= rows*cols/2-1){
                $sidebar2.append(`
                    <div class="imglink" id="${index}">
                        <input type="text" value="${front_img[index-1]}" class="inp">
                    </div>
                `)
            }
            renderGrid(); // 重新渲染網格
        }
    });
    //重製成 4*4
    $('.restart').on('click',()=>{
        $main.empty()
        rows=4;
        cols=4;
        clearsidebar2();
        front_img.shuffle(); // 如果你有 shuffle 方法
        front_img.shuffle(); // 如果你有 shuffle 方法
        renderGrid();

        win= 0;
        elapsedTime=0;
        // 預設開啟卡片
        $('.card').addClass('flipped'); // 假設這會顯示正面
        // 設置 10 秒後翻轉卡片
        setTimeout(() => {
            $('.card').toggleClass('flipped'); // 翻轉卡片
        }, 10000); // 10秒（10000毫秒）
    })
    $('.btn1').on('click', function() {
        $('.sidebar2').toggle(); // 切換顯示和隱藏
    });

    $('.inp').on('change', function() {
        $main.empty();
        // 收集所有 .inp 的值
        clearsidebar2()
        front_img = $('.inp').map(function() {
            return $(this).val(); // 取得每個 .inp 的值
        }).get(); // 使用 .get() 轉換 jQuery 對象為陣列
        front_img.forEach(ele=>{
            front_img.push(ele);
        })
        // 初始化網格
        front_img.shuffle(); // 如果你有 shuffle 方法
        front_img.shuffle(); // 如果你有 shuffle 方法
        
        renderGrid();
    });
    $('.btn7').on('click',function(){
        $('.card').addClass('flipped')
    })
    $('.btn8').on('click',function(){
        $('.card').removeClass('flipped')
    })

    // 預設開啟卡片
    $('.card').addClass('flipped'); // 假設這會顯示正面

    // 設置 10 秒後翻轉卡片
    setTimeout(() => {
        $('.card').toggleClass('flipped'); // 翻轉卡片
    }, 10000); // 10秒（10000毫秒）

});
