const endpoint = 'https://wind-bow.gomix.me/twitch-api';
const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const channelInfo = []; 

function makeUrl(type, name) {
  return endpoint + '/' + type + '/' + name + '?callback=?';
}

function parseData(data) {
  // console.log(data);
  const channelsList = document.querySelector('section');
  const logo = data.logo;
  const name = data.display_name;
  const bio = data.bio;
  const game = data.game;
  const status = data.status;
  const profile_banner = data.profile_banner;
  const profile_banner_background_color = data.profile_banner_background_color;
  const url = data.url;
  const video_banner = data.video_banner;
  const views = data.video_views;
  if (status) {
    channelsList.innerHTML += `
      <div class="channel-container active" style="height: ${window.innerHeight}px; width: ${window.innerWidth}px; background: url('${profile_banner}'); background-size: cover; background-repeat: no-repeat; background-color: ${profile_banner_background_color}">
        <img src="${logo}" class="active" />
        <h2>${game}</h2>
        <a href="${url}"><p>${status}</p></a>
        <a href="${url}" class="display_name"><h1>${name}</h1></a>
        <!-- <img src="${video_banner}" height="100%" width="100%"/> -->
        <p>Views: ${views}</p>
        <p class="bio">${bio}</p>
      </div>
    `;
  } else {
    channelsList.innerHTML += `
      <div class="channel-container inactive" style="height: ${window.innerHeight}px; width: ${window.innerWidth}px; background-size: cover; background-repeat: no-repeat; background-color: purple;">
        <img src="${logo}" class="inactive"/>
        <a href="${url}" class="display_name"><h1>${name}</h1></a>
        <p class="bio">${bio}</p>
      </div>
    `;
  }
}

channels.forEach(channel => {
  const info = {};
  $.getJSON(makeUrl('users', channel), function (data) {
    // console.log(data);
    info.display_name = data.display_name;
    info.bio = data.bio;
    info.logo = data.logo;
    // info.userLink = data._links.self;
    // console.log(info);
  });
  $.getJSON(makeUrl('streams', channel), function (data) {
    // console.log(data);
    if (data.stream != null) {
      info.game = data.stream.channel.game;
      info.status = data.stream.channel.status;
      info.profile_banner = data.stream.channel.profile_banner;
      info.profile_banner_background_color = data.stream.channel.profile_banner_background_color;
      info.url = data.stream.channel.url;
      info.video_banner = data.stream.channel.video_banner;
      info.video_views = data.stream.viewers;
      // console.log(info);
    }
  });
  $.getJSON(makeUrl('channels', channel), function (data) {
    // console.log(data);
  });
  setTimeout(function () {
    parseData(info);
  }, 6000);
});

// parseData(channelInfo);