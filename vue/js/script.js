document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup_login").classList.add("active");
  });
  document.querySelector(".popup_login .close-btn").addEventListener("click",function(){
    document.querySelector(".popup_login").classList.remove("active");
  });
  document.querySelector(".show-signup").addEventListener("click",function(){
    document.querySelector(".popup_login").classList.remove("active");
    document.querySelector(".popup_signup").classList.add("active");
  });
  document.querySelector(".popup_signup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup_signup").classList.remove("active");
  });
  document.querySelector(".show-login").addEventListener("click",function(){
    document.querySelector(".popup_signup").classList.remove("active");
    document.querySelector(".popup_login").classList.add("active");
  });