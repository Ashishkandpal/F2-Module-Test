"use strict";

//modal should open and modal should close
const creatBtn = document.querySelector(".create__btn");
const modalContainer = document.querySelector(".modal__container");
const cross = document.querySelector(".cross");
const cancel = document.querySelector(".modal__cancel__btn");
const modalHeading = document.querySelector(".heading__h2");
//add event listeners for closing and opening the modals

const toggleTheHidden = function (e) {
  e.preventDefault();
  console.log("trying");
  modalContainer.classList.toggle("modal__container--hidden");
};

creatBtn.addEventListener("click", toggleTheHidden);

cross.addEventListener("click", toggleTheHidden);

cancel.addEventListener("click", toggleTheHidden);

//create array to store the input from the user
let blogs = [];
let inputText = document.querySelector(".post__input");
let inputTextArea = document.querySelector(".post__textArea");
let id = 0;

//html content for showing the data into UI
let data;
const blogData = function (blogs) {
  data = `<div class="blog__Containers blog__Container--blog-${id}">
      <div class="heading">
        <h2>${blogs[id].text}</h2>
       </div>
      <div class="description">
        <p>
          ${blogs[id].textArea}
        </p>
      </div>
      <div class="btns__dnt">
        <div class="btns__edit__del">
          <button class="btn edit__btn" data-id='${id}'>Edit Post</button>
          <button class="btn del__btn" data-id='${id}'>Delete Post</button>
        </div>
        <div class="dnt"><p class='current__Date'>${blogs[id].dnt}</p></div>
      </div>
  </div>
`;
};

//add event listener for addding the new input data
const post = document.querySelector(".modal__post__btn");
const main = document.querySelector("main");

//function for posting blogs
const postBlogs = function () {
  //insert the data in to the array
  const currentDnT = new Date();
  const date = currentDnT.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  blogs.push({
    text: inputText.value,
    textArea: inputTextArea.value,
    dnt: date,
  });

  inputText.value = "";
  inputTextArea.value = "";

  //adding the post to the UI
  blogData(blogs);
  const content = data;
  main.insertAdjacentHTML("afterbegin", content);
  id++;
};

post.addEventListener("click", postBlogs);

//closing the modal also
post.addEventListener("click", toggleTheHidden);

//adding functionality for deleting the blogs
// const mainDelBtn = document.querySelector(".del__btn");
// console.log(mainDelBtn);
main.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList[1] === "del__btn") {
    const delIdx = e.target.getAttribute("data-id");
    console.log("e.target ", e.target);
    console.log(`delete the id`, delIdx);
    // console.log(`blog__Container--blog-${delIdx}`);
    const blogContainer = document.querySelector(
      `.blog__Container--blog-${delIdx}`
    );
    console.log(`delid`, delIdx);
    blogs.splice(delIdx, 1);
    blogContainer.remove();
    console.log(blogs);
    id--;
    console.log(`id`, id);
    if (id <= 0) {
      blogs = [];
      id = 0;
    }
  }
});

//adding functionality to edit the already created blog
let ediIdx;
main.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList[1] === "edit__btn") {
    ediIdx = e.target.getAttribute("data-id");
    const blogContainer = document.querySelector(
      `.blog__Container--blog-${ediIdx}`
    );

    //open the modal and update the headings and button in the modal
    modalContainer.classList.toggle("modal__container--hidden");
    console.log(post.textContent);
    post.textContent = "Save Post";
    cancel.textContent = "Delete Post";
    modalHeading.textContent = "Edit A Post";

    console.log("edit post", inputText);
    inputText.value = blogs[ediIdx].text;
    inputTextArea.value = blogs[ediIdx].textArea;

    //modal__btns
    // const modaBtns = document.querySelector(".modal__btns");
    // modaBtns.addEventListener("click", function (e) {
    //   //update the UI
    //   if (e.target.classList[2] === "save__btn") {
    //     id--;
    //     //delete the current datat and post the updated data
    //     const blogContainer = document.querySelector(
    //       `.blog__Container--blog-${ediIdx}`
    //     );
    //     blogs.splice(ediIdx, 1);
    //     console.log(blogs);
    //     blogContainer.remove();

    //     // postBlogs();
    //     console.log("id", id);
    //     console.log("ediIdx", ediIdx);
    //   }
    // });

    // main.addEventListener("click", function (e) {
    //   e.preventDefault();
    //   console.log("clicking in the main");
    //   console.log(e.target.classList[2] === "del__btn");
    //   if (e.target.classList[2] === "del__btn") {
    //     const blogContainer = document.querySelector(
    //       `.blog__Container--blog-${ediIdx}`
    //     );
    //     blogs.splice(ediIdx, 1);
    //     blogContainer.remove();
    //     console.log(blogs);
    //   }
    // });
    const saveBtn = document.querySelector(".modal__save__btn");
    saveBtn.addEventListener("click", function (e) {
      id--;
      // //delete the current datat and post the updated data
      // const blogContainer = document.querySelector(
      //   `.blog__Container--blog-${ediIdx}`
      // );
      blogs.splice(ediIdx, 1);
      console.log(blogs);
      blogContainer.remove();

      // postBlogs();
      console.log("blogContainer", blogContainer);
      console.log("id", id);
      console.log("ediIdx", ediIdx);
    });

    const delBtn = document.querySelector(".modal__del__btn");
    delBtn.addEventListener("click", function (e) {
      id--;
      //delete the current datat and post the updated data
      // const blogContainer = document.querySelector(
      //   `.blog__Container--blog-${ediIdx}`
      // );
      blogs.splice(ediIdx, 1);
      console.log(blogs);
      blogContainer.remove();

      // postBlogs();
      console.log("blogContainer", blogContainer);
      console.log("id", id);
      console.log("ediIdx", ediIdx);
    });
  }
});
