function get_tasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks){
      let inside_cart = document.getElementById("inside_cart");
      let pay_money = document.getElementsByClassName("pay_money")[0];
      let ul_task_list = "";
      inside_cart.style.display = "none";
      pay_money.innerHTML = "進入結帳頁面";
      pay_money.href = "#";
      tasks.forEach(function(item,i){
        ul_task_list += 
            `
                <li data-id="${item.item_id}">
                    <div class="shopping_li_list">
                        <p>商品圖片</p>
                        <p>商品名稱</p>
                        <p>商品數量</p>
                        <p>金額小計</p>
                        <i>刪除</i>
                    </div>
                    <div class="shopping_detail_list">
                        <img class="shoppimg_img" src="${item.item_img}"></img>
                        <p>${item.item_name}</p>
                        <section>
                            <button type="button" class ="cart_minus">  </button>
                            <input type = "text" class="in_cart_number" value="${item.item_number}" disabled>
                            <button type="button" class ="cart_plus">  </button>
                        </section>
                        <p class="cart_total_price">${item.item_price}元</p>
                        <button class='remove'></button>
                    </div>
                </li>
            `   
        });
        let cart_list = document.getElementsByClassName("cart_list")[0];
        cart_list.innerHTML = ul_task_list;
    }
}

/* localStorage 存取完成 */

get_tasks();

var ham_btn = document.getElementById("hamburger");
var ham_under = document.getElementById("hamburger_under_line");
var ham_middle = document.getElementById("hamburger_middle_line");
var ham_top = document.getElementById("hamburger_top_line");
var header_nav = document.getElementById("header_nav");


ham_btn.addEventListener("click", function(){
    // alert("hello");
    ham_top.classList.toggle("up_donw");
    ham_middle.classList.toggle("middle_line");
    ham_under.classList.toggle("donw_up");
    header_nav.classList.toggle("nav_open");
})

// 購物車談窗

var cart_btn = document.getElementsByClassName("shopping_cart")[0];
var cart_close_btn = document.getElementsByClassName("shopping_cart_close")[0]
var shopping_cart_list = document.getElementsByClassName("shopping_cart_list")[0];
var pay_btn = document.getElementsByClassName("pay_money")[0];


cart_btn.addEventListener("click", function(){
    shopping_cart_list.classList.toggle("cart_open");
})

cart_close_btn.addEventListener("click", function(){
    shopping_cart_list.classList.toggle("cart_open");
})

// document.addEventListener("click", function(e){
//     if(e.target.closest("div.shopping_cart_list")){
//         shopping_cart_list.classList.add("cart_open");
//     }else{
//         shopping_cart_list.classList.remove("cart_open");
//     }
// })

/* 購物車點擊刪除等功能 */
document.addEventListener("click", function(e){
    if(e.target.classList.contains("remove")){
        let shopping_list = e.target.closest("li");
        let cart_list = e.target.closest("ul").querySelectorAll("li");
        let pay_money = document.getElementsByClassName("pay_money")[0];
        if(confirm("確定刪除此商品??")){
            shopping_list.closest("li").remove();

            let this_id = e.target.closest("li").getAttribute("data-id");  //找出該項目的item_id
            let tasks = JSON.parse(localStorage.getItem("tasks"));    // 從 localStorage 取得資料
            let updated_tasks = [];   // 準備用來放要存到 localStorage 裡的資料

            tasks.forEach(function(task, i){
                if(this_id != task.item_id){
                updated_tasks.push(task);
                }
            });

            // 回存至 localStorage
            localStorage.setItem("tasks", JSON.stringify(updated_tasks));
            

            if(cart_list.length == 1){
                inside_cart.style.display = "block";
                pay_money.innerHTML = "商品一覽";
                pay_money.href = "./shopping _page.html";

                // 清空localStorage
                localStorage.clear();
            }
        }
    }
})

document.addEventListener("click", function(e){
    if(e.target.classList.contains("cart_plus")){
        let in_cart_number = e.target.closest("section").querySelector("input");
        let cart_total_price = e.target.closest("li").querySelector("p.cart_total_price");
         
        e.target.closest("section").querySelector("input").value = parseInt(in_cart_number.value) + 1;
        cart_total_price.innerHTML = (490 * parseInt(in_cart_number.value)) + "元";
    }
})

document.addEventListener("click", function(e){
    if(e.target.classList.contains("cart_minus")){
        let in_cart_number = e.target.closest("section").querySelector("input");
        let cart_total_price = e.target.closest("li").querySelector("p.cart_total_price");
        if(in_cart_number.value > 1){
            e.target.closest("section").querySelector("input").value = parseInt(in_cart_number.value) - 1 ;
            cart_total_price.innerHTML = (490 * parseInt(in_cart_number.value)) + "元";
        }
        
    }
})
