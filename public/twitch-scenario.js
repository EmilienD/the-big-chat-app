var insertElement = ({ color, name, message, badge, highlight }) => {
  var li = document.createElement('li')
  li.innerHTML = `
<div class="sc-AxjAm lmpqF vod-message vod-message--timestamp" data-test-selector="message-layout">
      <div class="sc-AxjAm fzeiWJ">
        <div class="sc-AxjAm eFjVnh">
          <div class="sc-AxjAm dVmHJR">${
            badge
              ? `<span><a data-a-target="chat-badge" class="ScCoreLink-udwpw5-0 FXIKh tw-link" rel="noopener noreferrer" target="_blank" href="https://www.twitch.tv/subs/auronplay"><img alt="Subscriber" aria-label="Subscriber badge" class="chat-badge" src="${badge}" style="height: 1.5em;"></a></span>`
              : '<span></span>'
          }<a data-test-selector="comment-author-selector"
              data-tt_content="tab_videos" data-tt_medium="video-message-author"
              class="ScCoreLink-udwpw5-0 FXIKh tw-link video-chat__message-author" rel="noopener noreferrer"
              target="_blank" href="/zienpies"><span><span class="chat-author__display-name"
                  data-a-target="chat-message-username" data-a-user="zienpies" data-test-selector="message-username"
                  style="color: ${color}">${name}</span></span></a>
            <div class="sc-AxjAm cOQKWc video-chat__message" data-test-selector="comment-message-selector" style="display: inline"><span
                class="InjectLayout-sc-588ddc-0 cQDIBe">:&nbsp;</span><span class=""><span class="text-fragment"
                  data-a-target="chat-message-text">${message}</span></span></div>
          </div>
          <div class="sc-AxjAm YOLYM video-chat__message-menu" data-test-selector="menu-options-wrapper">
            <div class="sc-AxjAm tCXbA"></div>
          </div>
        </div>
      </div>
    </div>
`
  if (highlight) {
    li.style.backgroundColor = '#660'
  }
  li.style.display = 'flex'
  li.style.width = '100%'
  document.querySelector('ul.InjectLayout-sc-588ddc-0.evsIlb').append(li)
}

var play = (scenario) => {
  if (!scenario.length) {
    return
  }
  setTimeout(() => {
    insertElement(scenario[0])
    play(scenario.slice(1))
  }, scenario[0].timeout || Math.floor(Math.random() * 400 + 100))
}

var scenario = [
  {
    message: 'Sinds dat Fellaini erop is, is alles veranderd',
    name: 'Levi',
    badge:
      'https://www.pinclipart.com/picdir/big/177-1773898_logo-rode-duivels-belgian-red-devils-logo-clipart.png',
    color: 'hotpink',
    timeout: 1000,
  },
  {
    message: 'Komaaan mannen nog 1tje!!',
    name: 'Karel_666',
    color: 'red',
    timeout: 800,
  },
  {
    message: 'Snel Courtois',
    name: 'Laurens',
    color: 'lime',
    timeout: 1200,
    highlight: true,
  },
  {
    message: 'Counteren snel!',
    name: 'Levi',
    badge:
      'https://www.pinclipart.com/picdir/big/177-1773898_logo-rode-duivels-belgian-red-devils-logo-clipart.png',
    color: 'hotpink',
    timeout: 600,
  },
  { message: 'Rechts meunier', name: 'Karel_666', color: 'red', timeout: 1400 },
  {
    message: 'BINNEEEUH',
    name: 'Levi',
    badge:
      'https://www.pinclipart.com/picdir/big/177-1773898_logo-rode-duivels-belgian-red-devils-logo-clipart.png',
    color: 'hotpink',
  },
  { message: 'OH OH OH ', name: 'Steven', color: 'orange' },
  { message: 'Yes!!!!!!!!', name: 'Laurens', color: 'lime' },
  { message: 'Ole Ole Ole Ole', name: 'Karel_666', color: 'red' },
  { message: 'Yesssssssss', name: 'Bram', color: 'cyan' },
  { message: 'Woooooowwwww', name: 'Jan', color: 'yellow' },
  {
    message: 'Wat een goal, wat een counter, wat een ploeg!',
    name: 'Steven',
    color: 'orange',
    timeout: 500,
  },
  {
    message: 'Wat een comeback, ongelofelijk…',
    name: 'Levi',
    badge:
      'https://www.pinclipart.com/picdir/big/177-1773898_logo-rode-duivels-belgian-red-devils-logo-clipart.png',
    color: 'hotpink',
    timeout: 600,
  },
  {
    message: 'Goed gedaan van lukaku, amai',
    name: 'Laurens',
    color: 'lime',
    timeout: 500,
  },
  {
    message:
      'We zitten in de kwartfinale nu tegen Brazilië, zal niet simpel zijn',
    name: 'Karel_666',
    color: 'red',
    timeout: 500,
  },
  {
    message: 'Wat een wissels van Martinez, respect',
    name: 'Levi',
    badge:
      'https://www.pinclipart.com/picdir/big/177-1773898_logo-rode-duivels-belgian-red-devils-logo-clipart.png',
    color: 'hotpink',
    timeout: 800,
  },
  {
    message: '1 jaar van mijn leven kwijt',
    name: 'Laurens',
    color: 'lime',
    timeout: 400,
  },
]
play(scenario)
