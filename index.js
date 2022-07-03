function createBlock(desc, img) {
  return `

  <div class="block">
    <img src="${img}" alt="SKIN" width="100" heigth="100">
    <div>
      <h2>${desc.market_hash_name}</h2>
      <div class="converter">
        <input class="converter__input" placeholder="Input our price in $">
        <div class="converter__ton">Price in TON</div>
      
      </div>
      
    </div>
  </div>

`
}

function inventory(steamId, appId, contextid = '2') {
  const link = 'https://steamcommunity.com/inventory/76561199023563103/730/2'
  const endPoint = 'https://community.cloudflare.steamstatic.com/economy/image/'

  const root = document.querySelector('.container')

  const xhr = new XMLHttpRequest()

  xhr.open('GET', link)
  xhr.send()
  xhr.onload = async () => {
    getData(JSON.parse(xhr.response))
  }
  xhr.onerror = (e) => {
    console.log(e)
  }

  function getData(data) {
    const { descriptions } = data
    const sortedData = descriptions.filter((el) => el.tradable && el.marketable)

    for (let i = 0; i < sortedData.length; i++) {
      const { icon_url } = sortedData[i]
      const link = endPoint + icon_url
      console.log(link)

      root.insertAdjacentHTML('afterbegin', createBlock(sortedData[i], link))
      console.log(sortedData[i])
    }
  }
}

inventory(76561199023563103, 730) // даннеы берем из запроса на сервер стим через токен
