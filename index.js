// Mock JSON DATA

var users = {
  user1: {
    userName: "@elonmusk",
    displayName: "Elon Musk",
    tweetCount: "14.3K Tweets",
    joinedDate: "June 2009",
    followingCount: 103,
    followerCount: 47900000,
    avatarURL: "assets/elonmusk.jpg",
    coverPhotoURL: "assets/elonmusk-cover.jpeg",
    tweets: [
      {
        text: "How much is that doge in the window?",
        timestamp: "2/10/2021 00:01:20",
      },
      {
        text: "Make it pointier",
        timestamp: "2/09/2021 18:37:12",
      },
      {
        text: "I'd rather be Boring",
        timestamp: "2/09/2021 12:11:51",
      },
      {
        text: "Happy Birthday X Æ A-Xii!",
        timestamp: "5/04/2021 00:01:20",
      },
    ],
  },

  user2: {
    userName: "@BillGates",
    displayName: "Bill Gates",
    tweetCount: "2,535 Tweets",
    joinedDate: "June 2009",
    followingCount: 274,
    followerCount: 53800000,
    avatarURL: "assets/billgates.jpg",
    coverPhotoURL: "assets/billgates-cover.jpeg",
    tweets: [
      {
        text:
          "Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/",
        timestamp: "2/10/2021 00:01:20",
      },
      {
        text: "Haven't seen that little paper clip guy in a while...",
        timestamp: "2/09/2021 18:37:12",
      },
      {
        text: "Ain't no party like a Microsoft Excel party",
        timestamp: "2/09/2021 12:11:51",
      },
      {
        text: "♫ Aaaaall Byyyyy MyyyyyySelf... ♫",
        timestamp: "5/25/2021 12:11:51",
      },
    ],
  },
};
//set Elon by default
var user = users.user1;

//functions to change users
function goToElon() {
  var usp = new URLSearchParams();
  usp.set("user", "user1");
  var url = location.pathname;
  url = `${url}?${usp.toString()}`;
  location.href = url;
}

function goToBill() {
  var usp = new URLSearchParams();
  usp.set("user", "user2");
  var url = location.pathname;
  url = `${url}?${usp.toString()}`;
  location.href = url;
}

var params = location.search;
if (params === "?user=user2") {
  var user = users.user2;
}

//buttons to change user
var elonBtn = document.getElementById("elon-btn");
elonBtn.addEventListener("click", goToElon);

var billBtn = document.getElementById("bill-btn");
billBtn.addEventListener("click", goToBill);

// create content container
var content = document.getElementById("content");

// header
var header = document.getElementById("header-container");
header.innerHTML = `
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
        <div>
          <h1> ${user.displayName} <i class="fas fa-check-circle"></i></h1>
          <p class="sub-text">${user.tweetCount}</p>
        </div>
        `;
content.appendChild(header);

// round followers to nearest million
var followerCount = Math.round(user.followerCount * 0.000001) + "M";

// cover content
var cover = document.getElementById("cover-container");
cover.innerHTML = `
        <img src=${user.coverPhotoURL} class="cover-photo">
        <img src=${user.avatarURL} class="avatar">
        <div class="follow-container">
            <a href="#" class="follow-btn">follow</a>
        </div>
        
        <div class="user-info">
            <h1 class="user-info-name">${user.displayName} <i class="fas fa-check-circle"></i></h1> 
            <p class="sub-text user-info-username">${user.userName}</p>
            <p class="sub-text info"><i class="far fa-calendar-alt sub-text"></i> Joined ${user.joinedDate}</p>
            <p class="sub-text follow-count info"><span class="follow-num">${user.followingCount}</span> Following <span class="follow-num followers">${followerCount}</span> Followers</p>
        </div>
        
        <div class="tabs-container">
            <div class="tab sub-text tab-active">Tweets</div>
            <div class="tab sub-text" id="tweets-and-replies">Tweets & replies</div>
            <div class="tab sub-text">Media</div>
            <div class="tab sub-text">Likes</div>
        </div>
        `;
content.appendChild(cover);

//change active tabs

//tweets
user.tweets.forEach((tweet) => {
  var tweetDiv = document.createElement("div");
  tweetDiv.classList.add("tweet-container");
  tweetDiv.innerHTML = `
  <img src=${user.avatarURL} class="avatar-mini">
  <div class="tweet-content">
    <div class="tweet-user-info"
      <h3 class="tweet-displayname">${user.displayName} </h3>
      <i class="fas fa-check-circle"></i> 
      <span class="sub-text tweet-username">${user.userName} ${new Date(
    tweet.timestamp
  ).toLocaleDateString()}</span>   
    </div>
    <p class="tweet-text">${tweet.text}</p>
  </div>
  `;
  content.appendChild(tweetDiv);
});

//function to change active tabs
function setNewActive(el) {
  var tabs = document.getElementsByClassName("tab");
  for (var tab of tabs) {
    tab.classList.remove("tab-active");
  }
  el.classList.add("tab-active");
}

// select tab class, loop through
var tabs = document.getElementsByClassName("tab");
for (var tab of tabs) {
  tab.addEventListener("click", function (e) {
    console.log(e.currentTarget);
    setNewActive(e.currentTarget);
  });
}
