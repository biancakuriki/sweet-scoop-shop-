const STORAGE_KEY = "sweet-scoop-shop-save-v1"
const LEADERBOARD_LIMIT = 5
const BASE_SHOP_PAGE_SIZE = 3
const LEVEL_2_SHOP_PAGE_SIZE = 5
const SHOP_ROTATE_EVERY_ROUNDS = 2
const MAX_SHOP_LEVEL = 8
const PHOENIX_FIRST_ROUND = 5
const PHOENIX_RETURN_GAP = 10
const GOLDEN_FOX_ROUND = 15
const GOLDEN_FOX_MIN_DOLLARS = 100
const GOLDEN_FOX_REWARD_DOLLARS = 500
const SPECIAL_LEVEL_TIME = 45
const FREEZE_DURATION = 5

const phoenixUpgradeCosts = {
  1: 150,
  2: 220,
  3: 300,
  4: 390,
  5: 490,
  6: 600,
  7: 720,
}

const shopConfigs = {
  1: { name: "Shop 1", difficulty: "Sweet Start", timeLimit: 60 },
  2: { name: "Shop 2", difficulty: "A Little Busier", timeLimit: 58 },
  3: { name: "Shop 3", difficulty: "Busy Crowd", timeLimit: 56 },
  4: { name: "Shop 4", difficulty: "Rush Time", timeLimit: 54 },
  5: { name: "Shop 5", difficulty: "Fast Orders", timeLimit: 52 },
  6: { name: "Shop 6", difficulty: "Tricky Shift", timeLimit: 50 },
  7: { name: "Shop 7", difficulty: "Super Busy", timeLimit: 48 },
  8: { name: "Shop 8", difficulty: "Master Shop", timeLimit: 45 },
}

const customerUnlocksByShop = {
  1: [
    { name: "Mimi", emoji: "🐱", subtitle: "Kitten who loves sweet treats" },
    { name: "Pip", emoji: "🐶", subtitle: "Puppy waiting for a perfect scoop" },
    { name: "Luna", emoji: "🐰", subtitle: "Bunny who always orders neatly" },
    { name: "Sunny", emoji: "🐻", subtitle: "Bear cub with a big dessert smile" },
    { name: "Coco", emoji: "🦊", subtitle: "Fox friend who adores sprinkles" },
  ],
  2: [
    { name: "Nori", emoji: "🦝", subtitle: "Raccoon who likes packed shops" },
    { name: "Tiki", emoji: "🐼", subtitle: "Panda with careful topping choices" },
  ],
  3: [
    { name: "Skye", emoji: "🦄", subtitle: "Unicorn who loves magical scoops" },
    { name: "Bean", emoji: "🐹", subtitle: "Hamster who rushes to the counter" },
  ],
  4: [
    { name: "Marlow", emoji: "🦁", subtitle: "Little lion with a loud ice cream order" },
    { name: "Puddle", emoji: "🐸", subtitle: "Frog who hops in during the lunch rush" },
  ],
  5: [
    { name: "Zuzu", emoji: "🐨", subtitle: "Koala who checks every flavor name" },
    { name: "Flash", emoji: "🐆", subtitle: "Cheetah who wants dessert fast" },
  ],
  6: [
    { name: "Nova", emoji: "🐺", subtitle: "Wolf who comes by after sunset" },
    { name: "Peaches", emoji: "🦌", subtitle: "Deer who loves fancy shop upgrades" },
  ],
  7: [
    { name: "Bubbles", emoji: "🐬", subtitle: "Dolphin who brings the whole crowd" },
    { name: "Maple", emoji: "🦉", subtitle: "Owl who notices every little detail" },
  ],
  8: [
    { name: "Sol", emoji: "🐲", subtitle: "Dragon who visits the legendary final shop" },
    { name: "Glint", emoji: "🪽", subtitle: "Sky spirit who only visits master shops" },
  ],
}

const bunnyBonusCustomer = {
  name: "Poppy",
  emoji: "🐰",
  subtitle: "Special bunny guest with a bonus stack order",
}

const labels = {
  cup: "Cup",
  cone: "Cone",
  heartCup: "Heart Cup",
  starCup: "Star Cup",
  vanilla: "Vanilla",
  chocolate: "Chocolate",
  strawberry: "Strawberry",
  mint: "Mint",
  blueberry: "Blueberry",
  mango: "Mango",
  lavender: "Lavender",
  none: "No topping",
  sprinkles: "Sprinkles",
  cherry: "Cherry",
}

const powerUpConfig = {
  freeze: {
    label: "Freeze Time",
    description: "Stops the timer and patience drain for 5 seconds.",
  },
  hint: {
    label: "Magic Hint",
    description: "Highlights the right order buttons for this customer.",
  },
  bonus: {
    label: "Double Dollars",
    description: "The next correct order gives bonus dollars.",
  },
}

const dailyChallengeTemplates = [
  {
    id: "perfect_orders",
    title: "Perfect Orders",
    description: "Serve 6 correct orders.",
    target: 6,
    reward: 8,
  },
  {
    id: "cone_serves",
    title: "Cone Day",
    description: "Serve 4 orders using a cone.",
    target: 4,
    reward: 6,
  },
  {
    id: "score",
    title: "Busy Shift",
    description: "Reach 80 score in one round.",
    target: 80,
    reward: 10,
  },
  {
    id: "streak",
    title: "Keep It Rolling",
    description: "Reach a streak of 5.",
    target: 5,
    reward: 10,
  },
  {
    id: "special_orders",
    title: "VIP Service",
    description: "Finish 3 special orders.",
    target: 3,
    reward: 9,
  },
]

const baseContainers = ["cup", "cone"]
const baseFlavors = ["vanilla", "chocolate", "strawberry"]
const toppings = ["none", "sprinkles", "cherry"]

const shopCatalog = [
  {
    id: "mint",
    group: "flavor",
    value: "mint",
    name: "Mint Flavor",
    description: "A cool green scoop for extra variety.",
    cost: 3,
  },
  {
    id: "blueberry",
    group: "flavor",
    value: "blueberry",
    name: "Blueberry Flavor",
    description: "A dreamy blue scoop for berry fans.",
    cost: 4,
  },
  {
    id: "mango",
    group: "flavor",
    value: "mango",
    name: "Mango Flavor",
    description: "A sunny golden scoop that feels tropical.",
    cost: 5,
  },
  {
    id: "lavender",
    group: "flavor",
    value: "lavender",
    name: "Lavender Flavor",
    description: "A soft purple scoop with fairy-garden vibes.",
    cost: 6,
  },
  {
    id: "heartCup",
    group: "container",
    value: "heartCup",
    name: "Heart Cup",
    description: "A kawaii pink heart-shaped cup.",
    cost: 5,
  },
  {
    id: "starCup",
    group: "container",
    value: "starCup",
    name: "Star Cup",
    description: "A golden star cup for superstar scoops.",
    cost: 7,
  },
]

const allCustomers = [...Object.values(customerUnlocksByShop).flat(), bunnyBonusCustomer]
const stickerAlbumCustomers = [
  customerUnlocksByShop[1][0],
  customerUnlocksByShop[2][0],
  customerUnlocksByShop[3][0],
  customerUnlocksByShop[4][0],
  customerUnlocksByShop[5][0],
  customerUnlocksByShop[6][0],
  customerUnlocksByShop[7][0],
  customerUnlocksByShop[8][0],
  bunnyBonusCustomer,
]

const scoreEl = document.getElementById("score")
const timerEl = document.getElementById("timer")
const streakEl = document.getElementById("streak")
const gameWalletEl = document.getElementById("game-wallet")
const walletAmountEl = document.getElementById("wallet-amount")
const finalScoreEl = document.getElementById("final-score")
const finalWalletEl = document.getElementById("final-wallet")
const finalDailyRewardEl = document.getElementById("final-daily-reward")
const finalMessageEl = document.getElementById("final-message")
const customerMoodEl = document.getElementById("customer-mood")

const customerNameEl = document.getElementById("customer-name")
const customerEmojiEl = document.getElementById("customer-emoji")
const customerSubtitleEl = document.getElementById("customer-subtitle")
const orderContainerEl = document.getElementById("order-container")
const orderFlavorEl = document.getElementById("order-flavor")
const orderToppingEl = document.getElementById("order-topping")
const orderSpecialEl = document.getElementById("order-special")
const secondOrderEl = document.getElementById("second-order")
const order2ContainerEl = document.getElementById("order2-container")
const order2FlavorEl = document.getElementById("order2-flavor")
const order2ToppingEl = document.getElementById("order2-topping")
const reactionMessageEl = document.getElementById("reaction-message")
const patienceFillEl = document.getElementById("patience-fill")
const patienceLabelEl = document.getElementById("patience-label")

const previewEl = document.getElementById("icecream-preview")
const sparkleLayerEl = document.getElementById("sparkle-layer")
const containerOptionsEl = document.getElementById("container-options")
const flavorOptionsEl = document.getElementById("flavor-options")
const toppingOptionsEl = document.getElementById("topping-options")
const shopItemsEl = document.getElementById("shop-items")
const sellFlavorOptionsEl = document.getElementById("sell-flavor-options")
const sellContainerOptionsEl = document.getElementById("sell-container-options")
const leaderboardListEl = document.getElementById("leaderboard-list")
const unlockedShopLevelEl = document.getElementById("unlocked-shop-level")
const selectedShopLevelEl = document.getElementById("selected-shop-level")
const shopDifficultyEl = document.getElementById("shop-difficulty")
const shopSelectorWrapEl = document.getElementById("shop-selector-wrap")
const shopSelectorEl = document.getElementById("shop-selector")
const dailyChallengeListEl = document.getElementById("daily-challenge-list")
const customerCollectionEl = document.getElementById("customer-collection")
const collectionSummaryEl = document.getElementById("collection-summary")
const powerButtonsEl = document.getElementById("power-buttons")

const startScreen = document.getElementById("start-screen")
const gameScreen = document.getElementById("game-screen")
const resultScreen = document.getElementById("result-screen")

const startButton = document.getElementById("start-button")
const serveButton = document.getElementById("serve-button")
const resetButton = document.getElementById("reset-button")
const pauseButton = document.getElementById("pause-button")
const playAgainButton = document.getElementById("play-again-button")
const phoenixModalEl = document.getElementById("phoenix-modal")
const phoenixTitleEl = document.getElementById("phoenix-title")
const phoenixMessageEl = document.getElementById("phoenix-message")
const phoenixAcceptButton = document.getElementById("phoenix-accept-button")
const phoenixCloseButton = document.getElementById("phoenix-close-button")
const goldenFoxModalEl = document.getElementById("golden-fox-modal")
const goldenFoxTitleEl = document.getElementById("golden-fox-title")
const goldenFoxMessageEl = document.getElementById("golden-fox-message")
const goldenFoxAcceptButton = document.getElementById("golden-fox-accept-button")
const goldenFoxCloseButton = document.getElementById("golden-fox-close-button")

let score = 0
let streak = 0
let timeLeft = 60
let dollars = 0
let scoreDollarStepsAwarded = 0
let timerId = null
let currentOrder = null
let currentSelection = createEmptySelection()
let bunnyBonusShown = false
let bunnyOrderProgress = 0
let unlockedContainers = [...baseContainers]
let unlockedFlavors = [...baseFlavors]
let activeContainers = [...baseContainers]
let activeFlavors = [...baseFlavors]
let roundsPlayed = 0
let shopRotationIndex = 0
let shopLevel = 1
let selectedShopLevel = 1
let nextPhoenixRound = PHOENIX_FIRST_ROUND
let phoenixOfferPending = false
let goldenFoxVisited = false
let goldenFoxOfferPending = false
let pendingSpecialLevel = false
let specialLevelPlayed = false
let isSpecialLevelActive = false
let leaderboard = []
let audioContext = null

let patienceCurrent = 10
let patienceMax = 10
let freezeTicks = 0
let bonusNextOrder = false
let hintActive = false
let isPaused = false
let powerUps = createDefaultPowerUps()
let seenCustomers = []
let dailyChallengeDate = ""
let dailyChallenges = []
let dailyRewardEarnedThisRound = 0

let roundCorrectOrders = 0
let roundPerfectOrders = 0
let roundConeServes = 0
let roundSpecialOrders = 0
let mistakesThisRound = 0
let fastestServeCount = 0

function createEmptySelection() {
  return {
    container: null,
    flavor: null,
    topping: "none",
  }
}

function createDefaultPowerUps() {
  return {
    freeze: 0,
    hint: 0,
    bonus: 0,
  }
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function formatLabel(value) {
  return labels[value] || value
}

function getShopConfig(level) {
  return shopConfigs[Math.min(Math.max(level, 1), MAX_SHOP_LEVEL)]
}

function getCurrentShopConfig() {
  return getShopConfig(selectedShopLevel)
}

function getPhoenixUpgradeCost(level) {
  return phoenixUpgradeCosts[level] ?? Number.MAX_SAFE_INTEGER
}

function getUnlockedCustomersForShop(level) {
  const customers = []

  for (let shopIndex = 1; shopIndex <= Math.min(level, MAX_SHOP_LEVEL); shopIndex += 1) {
    customers.push(...(customerUnlocksByShop[shopIndex] || []))
  }

  return customers
}

function getTodayKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function buildDailyChallenges(dateKey) {
  const seed = Array.from(dateKey).reduce((total, char) => total + char.charCodeAt(0), 0)
  const order = dailyChallengeTemplates.map((_, index) => index)

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = (seed + index * 7) % (index + 1)
    const current = order[index]
    order[index] = order[swapIndex]
    order[swapIndex] = current
  }

  return order.slice(0, 3).map((index) => {
    const template = dailyChallengeTemplates[index]
    return {
      ...template,
      progress: 0,
      completed: false,
      rewarded: false,
    }
  })
}

function ensureDailyChallengesCurrent() {
  const todayKey = getTodayKey()

  if (dailyChallengeDate === todayKey && dailyChallenges.length) {
    return
  }

  dailyChallengeDate = todayKey
  dailyChallenges = buildDailyChallenges(todayKey)
  saveProgress()
}

function showScreen(screen) {
  ;[startScreen, gameScreen, resultScreen].forEach((item) => {
    item.classList.remove("screen-active")
  })
  screen.classList.add("screen-active")
}

function getSaveState() {
  return {
    dollars,
    unlockedContainers,
    unlockedFlavors,
    activeContainers,
    activeFlavors,
    roundsPlayed,
    shopRotationIndex,
    shopLevel,
    selectedShopLevel,
    nextPhoenixRound,
    goldenFoxVisited,
    pendingSpecialLevel,
    specialLevelPlayed,
    leaderboard,
    powerUps,
    seenCustomers,
    dailyChallengeDate,
    dailyChallenges,
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(getSaveState()))
  } catch (error) {
    console.warn("Could not save progress.", error)
  }
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      ensureDailyChallengesCurrent()
      return
    }

    const saved = JSON.parse(raw)
    dollars = Number.isFinite(saved.dollars) ? saved.dollars : 0
    unlockedContainers = Array.isArray(saved.unlockedContainers)
      ? [...new Set([...baseContainers, ...saved.unlockedContainers.filter((value) => shopCatalog.some((item) => item.value === value && item.group === "container"))])]
      : [...baseContainers]
    unlockedFlavors = Array.isArray(saved.unlockedFlavors)
      ? [...new Set([...baseFlavors, ...saved.unlockedFlavors.filter((value) => shopCatalog.some((item) => item.value === value && item.group === "flavor"))])]
      : [...baseFlavors]
    activeContainers = Array.isArray(saved.activeContainers)
      ? saved.activeContainers.filter((value) => unlockedContainers.includes(value))
      : [...unlockedContainers]
    activeFlavors = Array.isArray(saved.activeFlavors)
      ? saved.activeFlavors.filter((value) => unlockedFlavors.includes(value))
      : [...unlockedFlavors]
    roundsPlayed = Number.isFinite(saved.roundsPlayed) ? saved.roundsPlayed : 0
    shopRotationIndex = Number.isFinite(saved.shopRotationIndex) ? saved.shopRotationIndex % shopCatalog.length : 0
    shopLevel = Number.isFinite(saved.shopLevel) ? Math.min(Math.max(saved.shopLevel, 1), MAX_SHOP_LEVEL) : 1
    selectedShopLevel = Number.isFinite(saved.selectedShopLevel) ? saved.selectedShopLevel : shopLevel
    selectedShopLevel = Math.min(Math.max(selectedShopLevel, 1), Math.max(shopLevel, 1))
    nextPhoenixRound = Number.isFinite(saved.nextPhoenixRound) ? saved.nextPhoenixRound : PHOENIX_FIRST_ROUND
    if (shopLevel < MAX_SHOP_LEVEL) {
      const isLegacyFirstPhoenixRound = nextPhoenixRound === 15
      if (isLegacyFirstPhoenixRound || roundsPlayed < PHOENIX_FIRST_ROUND) {
        nextPhoenixRound = PHOENIX_FIRST_ROUND
      }
    }
    goldenFoxVisited = Boolean(saved.goldenFoxVisited)
    pendingSpecialLevel = Boolean(saved.pendingSpecialLevel)
    specialLevelPlayed = Boolean(saved.specialLevelPlayed)
    leaderboard = Array.isArray(saved.leaderboard) ? saved.leaderboard.slice(0, LEADERBOARD_LIMIT) : []

    powerUps = {
      ...createDefaultPowerUps(),
      ...(saved.powerUps || {}),
    }
    seenCustomers = Array.isArray(saved.seenCustomers) ? saved.seenCustomers.filter((name) => allCustomers.some((customer) => customer.name === name)) : []
    dailyChallengeDate = typeof saved.dailyChallengeDate === "string" ? saved.dailyChallengeDate : ""
    dailyChallenges = Array.isArray(saved.dailyChallenges) ? saved.dailyChallenges : []

    if (!activeContainers.length) {
      activeContainers = [...unlockedContainers]
    }

    if (!activeFlavors.length) {
      activeFlavors = [...unlockedFlavors]
    }

    ensureDailyChallengesCurrent()
  } catch (error) {
    console.warn("Could not load progress.", error)
    ensureDailyChallengesCurrent()
  }
}

function renderLeaderboard() {
  leaderboardListEl.innerHTML = ""

  if (!leaderboard.length) {
    const empty = document.createElement("div")
    empty.className = "leaderboard-empty"
    empty.textContent = "No scores yet. Play a round and become the first ice cream star."
    leaderboardListEl.appendChild(empty)
    return
  }

  leaderboard.forEach((entry, index) => {
    const row = document.createElement("div")
    row.className = "leaderboard-row"

    const rank = document.createElement("div")
    rank.className = "leaderboard-rank"
    rank.textContent = `#${index + 1}`

    const name = document.createElement("div")
    name.className = "leaderboard-name"
    name.textContent = entry.title

    const scoreStat = document.createElement("div")
    scoreStat.className = "leaderboard-stat"
    scoreStat.textContent = `Score ${entry.score}`

    const dollarStat = document.createElement("div")
    dollarStat.className = "leaderboard-stat"
    dollarStat.textContent = `$${entry.dollars}`

    row.appendChild(rank)
    row.appendChild(name)
    row.appendChild(scoreStat)
    row.appendChild(dollarStat)
    leaderboardListEl.appendChild(row)
  })
}

function updateLeaderboard() {
  const entry = {
    title: `${getCurrentShopConfig().name} · Round ${roundsPlayed}`,
    score,
    dollars,
  }

  leaderboard = [...leaderboard, entry]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return right.dollars - left.dollars
    })
    .slice(0, LEADERBOARD_LIMIT)
}

function getPatienceRatio() {
  return patienceMax ? Math.max(0, Math.min(1, patienceCurrent / patienceMax)) : 1
}

function getMoodLabel() {
  if (isPaused) {
    return "Paused"
  }

  if (freezeTicks > 0) {
    return "Frozen"
  }

  const ratio = getPatienceRatio()

  if (ratio > 0.66) {
    return "Happy"
  }

  if (ratio > 0.33) {
    return "Waiting"
  }

  return "Anxious"
}

function updateStats() {
  scoreEl.textContent = score
  timerEl.textContent = timeLeft
  streakEl.textContent = streak
  gameWalletEl.textContent = dollars
  walletAmountEl.textContent = dollars
  customerMoodEl.textContent = getMoodLabel()
}

function renderShopProgress() {
  const unlockedConfig = getShopConfig(shopLevel)
  const selectedConfig = getCurrentShopConfig()

  unlockedShopLevelEl.textContent = `${shopLevel} - ${unlockedConfig.name}`
  selectedShopLevelEl.textContent = `${selectedShopLevel} - ${selectedConfig.name}`
  shopDifficultyEl.textContent = `${selectedConfig.difficulty} · ${selectedConfig.timeLimit}s`

  if (shopLevel >= MAX_SHOP_LEVEL) {
    shopSelectorWrapEl.classList.remove("hidden")
    shopSelectorEl.innerHTML = ""

    for (let level = 1; level <= shopLevel; level += 1) {
      const option = document.createElement("option")
      option.value = String(level)
      option.textContent = `${getShopConfig(level).name}`
      option.selected = level === selectedShopLevel
      shopSelectorEl.appendChild(option)
    }
    return
  }

  shopSelectorWrapEl.classList.add("hidden")
}

function setReaction(message) {
  reactionMessageEl.textContent = message
}

function createOptionButton(group, value) {
  const button = document.createElement("button")
  button.className = "option-button"
  button.type = "button"
  button.dataset.group = group
  button.dataset.value = value
  button.textContent = formatLabel(value)
  return button
}

function renderOptions() {
  containerOptionsEl.innerHTML = ""
  flavorOptionsEl.innerHTML = ""
  toppingOptionsEl.innerHTML = ""

  activeContainers.forEach((container) => {
    containerOptionsEl.appendChild(createOptionButton("container", container))
  })

  activeFlavors.forEach((flavor) => {
    flavorOptionsEl.appendChild(createOptionButton("flavor", flavor))
  })

  toppings.forEach((topping) => {
    toppingOptionsEl.appendChild(createOptionButton("topping", topping))
  })

  setSelectedButtons()
}

function getOptionButtons() {
  return Array.from(document.querySelectorAll(".option-button"))
}

function getExpectedOrder() {
  if (!currentOrder) {
    return null
  }

  if (currentOrder.type === "double") {
    return currentOrder.orders[bunnyOrderProgress]
  }

  return currentOrder
}

function clearHints() {
  getOptionButtons().forEach((button) => {
    button.classList.remove("hint-target")
  })
}

function applyHintTargets() {
  clearHints()

  if (!hintActive) {
    return
  }

  const expected = getExpectedOrder()

  if (!expected) {
    return
  }

  getOptionButtons().forEach((button) => {
    const { group, value } = button.dataset

    if (expected[group] === value) {
      button.classList.add("hint-target")
    }
  })
}

function setSelectedButtons() {
  getOptionButtons().forEach((button) => {
    const { group, value } = button.dataset
    button.classList.toggle("selected", currentSelection[group] === value)
  })
  applyHintTargets()
}

function renderShop() {
  shopItemsEl.innerHTML = ""

  getVisibleShopItems().forEach((item) => {
    const isBought = item.group === "flavor"
      ? unlockedFlavors.includes(item.value)
      : unlockedContainers.includes(item.value)

    const card = document.createElement("article")
    card.className = "shop-item"

    const title = document.createElement("h3")
    title.textContent = item.name
    card.appendChild(title)

    const description = document.createElement("p")
    description.textContent = `${item.description} Cost: $${item.cost}`
    card.appendChild(description)

    const button = document.createElement("button")
    button.className = "shop-button"
    button.type = "button"
    button.disabled = isBought || dollars < item.cost
    button.textContent = isBought ? "Bought" : dollars >= item.cost ? `Buy for $${item.cost}` : `Need $${item.cost}`
    button.addEventListener("click", () => buyShopItem(item.id))
    card.appendChild(button)

    shopItemsEl.appendChild(card)
  })
}

function getVisibleShopItems() {
  const shopPageSize = shopLevel >= 2 ? LEVEL_2_SHOP_PAGE_SIZE : BASE_SHOP_PAGE_SIZE

  if (shopCatalog.length <= shopPageSize) {
    return [...shopCatalog]
  }

  return Array.from({ length: shopPageSize }, (_, offset) => {
    const index = (shopRotationIndex + offset) % shopCatalog.length
    return shopCatalog[index]
  })
}

function rotateShopIfNeeded() {
  if (roundsPlayed > 0 && roundsPlayed % SHOP_ROTATE_EVERY_ROUNDS === 0) {
    shopRotationIndex = (shopRotationIndex + 2) % shopCatalog.length
  }
}

function shouldShowPhoenix() {
  return shopLevel < MAX_SHOP_LEVEL && roundsPlayed >= nextPhoenixRound
}

function shouldShowGoldenFox() {
  return !goldenFoxVisited && roundsPlayed >= GOLDEN_FOX_ROUND
}

function openPhoenixModal() {
  const nextShopLevel = Math.min(shopLevel + 1, MAX_SHOP_LEVEL)
  const upgradeCost = getPhoenixUpgradeCost(shopLevel)

  phoenixOfferPending = true
  phoenixModalEl.classList.remove("hidden")

  if (dollars >= upgradeCost) {
    phoenixTitleEl.textContent = "The phoenix offers a bigger shop"
    phoenixMessageEl.textContent = `Hey do you want to have a bigger shop? You have at least $${upgradeCost}, so you can upgrade to Shop ${nextShopLevel}.`
    phoenixAcceptButton.textContent = `Upgrade To Shop ${nextShopLevel}`
    phoenixAcceptButton.classList.remove("hidden")
    phoenixAcceptButton.disabled = false
    return
  }

  phoenixTitleEl.textContent = "The phoenix will come back later"
  phoenixMessageEl.textContent = `Hey do you want to have a bigger shop? You do not have $${upgradeCost} yet for Shop ${nextShopLevel}. After you play ten rounds I will come back.`
  phoenixAcceptButton.classList.add("hidden")
  phoenixAcceptButton.disabled = true
  nextPhoenixRound = roundsPlayed + PHOENIX_RETURN_GAP
  saveProgress()
}

function closePhoenixModal() {
  phoenixOfferPending = false
  phoenixModalEl.classList.add("hidden")
}

function openGoldenFoxModal() {
  goldenFoxVisited = true
  goldenFoxOfferPending = true
  goldenFoxModalEl.classList.remove("hidden")

  if (dollars >= GOLDEN_FOX_MIN_DOLLARS) {
    goldenFoxTitleEl.textContent = "The golden fox found your rich shop"
    goldenFoxMessageEl.textContent = `Hello! You reached at least $${GOLDEN_FOX_MIN_DOLLARS}. I can upgrade your dollars to $${GOLDEN_FOX_REWARD_DOLLARS}.`
    goldenFoxAcceptButton.classList.remove("hidden")
    goldenFoxAcceptButton.disabled = false
    saveProgress()
    return
  }

  goldenFoxTitleEl.textContent = "The golden fox says hello"
  goldenFoxMessageEl.textContent = `Hello! Come back when you have at least $${GOLDEN_FOX_MIN_DOLLARS}, and I will upgrade your dollars to $${GOLDEN_FOX_REWARD_DOLLARS}.`
  goldenFoxAcceptButton.classList.add("hidden")
  goldenFoxAcceptButton.disabled = true
  saveProgress()
}

function closeGoldenFoxModal() {
  goldenFoxOfferPending = false
  goldenFoxModalEl.classList.add("hidden")
}

function claimGoldenFoxReward() {
  if (dollars < GOLDEN_FOX_MIN_DOLLARS) {
    return
  }

  dollars = GOLDEN_FOX_REWARD_DOLLARS
  goldenFoxOfferPending = false
  saveProgress()
  updateStats()
  closeGoldenFoxModal()
  showScreen(startScreen)
  playSuccessSound()
  createSparkles(16)
  setReaction("The golden fox upgraded your dollars to $500.")
}

function upgradeToLevel2Shop() {
  const upgradeCost = getPhoenixUpgradeCost(shopLevel)

  if (dollars < upgradeCost || shopLevel >= MAX_SHOP_LEVEL) {
    return
  }

  dollars -= upgradeCost
  shopLevel += 1
  selectedShopLevel = shopLevel
  phoenixOfferPending = false
  nextPhoenixRound = shopLevel >= MAX_SHOP_LEVEL ? Number.MAX_SAFE_INTEGER : roundsPlayed + PHOENIX_RETURN_GAP

  if (shopLevel === 2 && !specialLevelPlayed) {
    pendingSpecialLevel = true
  }

  saveProgress()
  updateStats()
  renderShopProgress()
  renderOptions()
  renderShop()
  renderSellMenu()
  renderLeaderboard()
  closePhoenixModal()
  showScreen(startScreen)
  playSuccessSound()
  createSparkles(14)
  setReaction(
    shopLevel === 2
      ? "The phoenix made your shop bigger. Welcome to Shop 2! A special level is waiting."
      : `The phoenix upgraded you to Shop ${shopLevel}. New customers will start coming in now.`
  )
}

function renderSellMenu() {
  sellFlavorOptionsEl.innerHTML = ""
  sellContainerOptionsEl.innerHTML = ""

  unlockedFlavors.forEach((flavor) => {
    sellFlavorOptionsEl.appendChild(createMenuToggle("flavor", flavor, activeFlavors.includes(flavor)))
  })

  unlockedContainers.forEach((container) => {
    sellContainerOptionsEl.appendChild(createMenuToggle("container", container, activeContainers.includes(container)))
  })
}

function createMenuToggle(group, value, isActive) {
  const button = document.createElement("button")
  button.className = `menu-toggle${isActive ? " active" : ""}`
  button.type = "button"
  button.dataset.menuGroup = group
  button.dataset.value = value
  button.textContent = isActive ? `${formatLabel(value)} On` : `${formatLabel(value)} Off`
  return button
}

function toggleSellItem(group, value) {
  const list = group === "flavor" ? activeFlavors : activeContainers
  const unlockedList = group === "flavor" ? unlockedFlavors : unlockedContainers

  if (list.includes(value)) {
    if (list.length === 1) {
      setReaction(`Keep at least one ${group} on the menu.`)
      playOopsSound()
      return
    }

    if (group === "flavor") {
      activeFlavors = activeFlavors.filter((item) => item !== value)
    } else {
      activeContainers = activeContainers.filter((item) => item !== value)
    }
  } else if (unlockedList.includes(value)) {
    if (group === "flavor") {
      activeFlavors = [...activeFlavors, value]
    } else {
      activeContainers = [...activeContainers, value]
    }
  }

  currentSelection = {
    container: activeContainers.includes(currentSelection.container) ? currentSelection.container : null,
    flavor: activeFlavors.includes(currentSelection.flavor) ? currentSelection.flavor : null,
    topping: currentSelection.topping,
  }
  setSelectedButtons()
  renderPreview()
  saveProgress()
  renderSellMenu()
}

function buyShopItem(itemId) {
  const item = shopCatalog.find((entry) => entry.id === itemId)

  if (!item || dollars < item.cost) {
    return
  }

  dollars -= item.cost

  if (item.group === "flavor" && !unlockedFlavors.includes(item.value)) {
    unlockedFlavors.push(item.value)
    if (!activeFlavors.includes(item.value)) {
      activeFlavors.push(item.value)
    }
  }

  if (item.group === "container" && !unlockedContainers.includes(item.value)) {
    unlockedContainers.push(item.value)
    if (!activeContainers.includes(item.value)) {
      activeContainers.push(item.value)
    }
  }

  saveProgress()
  playChime(720, 0.09, "triangle", 0)
  playChime(920, 0.12, "triangle", 0.08)
  updateStats()
  renderOptions()
  renderShop()
  renderSellMenu()
}

function renderPreview() {
  previewEl.innerHTML = ""

  if (!currentSelection.container) {
    const empty = document.createElement("div")
    empty.className = "preview-empty"
    empty.textContent = "Choose a cup or cone to begin"
    previewEl.appendChild(empty)
    return
  }

  if (currentSelection.topping === "cherry") {
    const cherry = document.createElement("div")
    cherry.className = "topping-cherry"
    previewEl.appendChild(cherry)
  }

  if (currentSelection.topping === "sprinkles") {
    const sprinkles = document.createElement("div")
    sprinkles.className = "topping-sprinkles"
    previewEl.appendChild(sprinkles)
  }

  if (currentSelection.flavor) {
    const scoop = document.createElement("div")
    scoop.className = `icecream-scoop flavor-${currentSelection.flavor}`
    previewEl.appendChild(scoop)
  }

  const base = document.createElement("div")

  if (currentSelection.container === "heartCup") {
    base.className = "heart-cup"
  } else if (currentSelection.container === "starCup") {
    base.className = "star-cup"
  } else {
    base.className = currentSelection.container === "cup" ? "cup" : "cone"
  }

  previewEl.appendChild(base)
}

function pickSpecialOrderType() {
  const roll = Math.random()

  if (selectedShopLevel >= 4 && roll < 0.2) {
    return "vip"
  }

  if (selectedShopLevel >= 2 && roll < 0.45) {
    return "rush"
  }

  if (roll < 0.7) {
    return "picky"
  }

  return "standard"
}

function createSingleOrder(customer) {
  const order = {
    type: "single",
    specialType: pickSpecialOrderType(),
    customer,
    container: randomFrom(activeContainers),
    flavor: randomFrom(activeFlavors),
    topping: randomFrom(toppings),
    note: "",
    patienceMultiplier: 1,
    scoreBonus: 0,
    dollarBonus: 0,
    speedGoalRatio: 0.55,
  }

  if (order.specialType === "picky") {
    order.topping = "none"
    order.note = "Picky order: no topping please."
    order.scoreBonus = 2
    order.dollarBonus = 1
  } else if (order.specialType === "rush") {
    order.note = "Rush order: serve quickly for extra rewards."
    order.patienceMultiplier = 0.72
    order.scoreBonus = 3
    order.dollarBonus = 1
    order.speedGoalRatio = 0.65
  } else if (order.specialType === "vip") {
    order.note = "VIP order: perfect service earns a deluxe bonus."
    order.patienceMultiplier = 0.82
    order.scoreBonus = 6
    order.dollarBonus = 2
    order.speedGoalRatio = 0.7
  }

  return order
}

function createBunnyBonusOrder() {
  const orderCount = selectedShopLevel >= 5 && Math.random() < 0.45 ? 3 : 2

  return {
    type: "double",
    specialType: "bunny",
    customer: bunnyBonusCustomer,
    orders: Array.from({ length: orderCount }, () => ({
      container: randomFrom(activeContainers),
      flavor: randomFrom(activeFlavors),
      topping: randomFrom(toppings),
    })),
    note: orderCount === 3 ? "Bunny bonus: triple stack order today!" : "Bunny bonus: two ice creams please!",
    patienceMultiplier: orderCount === 3 ? 1.2 : 1.05,
  }
}

function getBasePatienceForLevel() {
  return Math.max(7, 12 - Math.floor((selectedShopLevel - 1) / 2))
}

function setPatienceForOrder(order) {
  const basePatience = getBasePatienceForLevel()
  const multiplier = order.patienceMultiplier || 1
  const orderSizeBonus = order.type === "double" ? order.orders.length - 1 : 0

  patienceMax = Math.max(5, Math.round((basePatience + orderSizeBonus) * multiplier))
  patienceCurrent = patienceMax
  updatePatienceUI()
}

function updatePatienceUI() {
  const ratio = getPatienceRatio()
  patienceFillEl.style.width = `${ratio * 100}%`

  if (ratio > 0.66) {
    patienceFillEl.style.background = "linear-gradient(180deg, #9ce6b0, #69cf86)"
    patienceLabelEl.textContent = "Relaxed"
  } else if (ratio > 0.33) {
    patienceFillEl.style.background = "linear-gradient(180deg, #ffe58d, #ffb655)"
    patienceLabelEl.textContent = "Waiting"
  } else {
    patienceFillEl.style.background = "linear-gradient(180deg, #ff9ab4, #f46088)"
    patienceLabelEl.textContent = "About To Leave"
  }

  if (freezeTicks > 0) {
    patienceLabelEl.textContent = `Frozen ${freezeTicks}s`
  } else if (isPaused) {
    patienceLabelEl.textContent = "Paused"
  }
}

function trackSeenCustomer(customer) {
    if (!seenCustomers.includes(customer.name)) {
    seenCustomers.push(customer.name)
    saveProgress()
  }
}

function renderOrder(order) {
  customerNameEl.textContent = order.customer.name
  customerEmojiEl.textContent = order.customer.emoji
  customerSubtitleEl.textContent = order.customer.subtitle

  trackSeenCustomer(order.customer)

  if (order.type === "double") {
    const activeOrder = order.orders[bunnyOrderProgress]
    const upcomingOrder = order.orders[Math.min(bunnyOrderProgress + 1, order.orders.length - 1)]

    orderSpecialEl.style.display = "inline-block"
    orderSpecialEl.textContent = `${order.note} ${bunnyOrderProgress}/${order.orders.length} done`
    secondOrderEl.style.display = bunnyOrderProgress + 1 < order.orders.length ? "block" : "none"

    orderContainerEl.textContent = formatLabel(activeOrder.container)
    orderFlavorEl.textContent = formatLabel(activeOrder.flavor)
    orderToppingEl.textContent = formatLabel(activeOrder.topping)

    order2ContainerEl.textContent = formatLabel(upcomingOrder.container)
    order2FlavorEl.textContent = formatLabel(upcomingOrder.flavor)
    order2ToppingEl.textContent = formatLabel(upcomingOrder.topping)
  } else {
    orderSpecialEl.style.display = order.note ? "inline-block" : "none"
    orderSpecialEl.textContent = order.note
    secondOrderEl.style.display = "none"
    orderContainerEl.textContent = formatLabel(order.container)
    orderFlavorEl.textContent = formatLabel(order.flavor)
    orderToppingEl.textContent = formatLabel(order.topping)
  }

  setPatienceForOrder(order)
  renderCollection()
}

function generateOrder() {
  clearHints()
  hintActive = false

  const shouldShowBunnyBonus = !bunnyBonusShown && timeLeft <= 35 && timeLeft >= 18
  const customerPool = getUnlockedCustomersForShop(selectedShopLevel)

  if (shouldShowBunnyBonus) {
    currentOrder = createBunnyBonusOrder()
    bunnyBonusShown = true
    bunnyOrderProgress = 0
  } else {
    currentOrder = createSingleOrder(randomFrom(customerPool))
  }

  renderOrder(currentOrder)
  renderPowerUps()
}

function resetBuilder() {
  currentSelection = createEmptySelection()
  setSelectedButtons()
  renderPreview()
}

function awardDollarsFromScore() {
  const newSteps = Math.floor(score / 5)

  if (newSteps > scoreDollarStepsAwarded) {
    dollars += newSteps - scoreDollarStepsAwarded
    scoreDollarStepsAwarded = newSteps
    saveProgress()
  }
}

function createSparkles(count) {
  const icons = ["✨", "⭐", "💖"]

  for (let index = 0; index < count; index += 1) {
    const sparkle = document.createElement("span")
    sparkle.className = "sparkle"
    sparkle.textContent = icons[Math.floor(Math.random() * icons.length)]
    sparkle.style.left = `${15 + Math.random() * 70}%`
    sparkle.style.top = `${25 + Math.random() * 45}%`
    sparkle.style.animationDelay = `${index * 60}ms`
    sparkleLayerEl.appendChild(sparkle)
    window.setTimeout(() => sparkle.remove(), 1000)
  }
}

function ensureAudio() {
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext

    if (AudioCtor) {
      audioContext = new AudioCtor()
    }
  }

  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume().catch(() => {})
  }
}

function playChime(frequency, duration, type, delay) {
  ensureAudio()

  if (!audioContext) {
    return
  }

  const startAt = audioContext.currentTime + delay
  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(0.0001, startAt)
  gain.gain.linearRampToValueAtTime(0.08, startAt + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration)

  oscillator.connect(gain)
  gain.connect(audioContext.destination)
  oscillator.start(startAt)
  oscillator.stop(startAt + duration)
}

function playSuccessSound() {
  playChime(660, 0.11, "triangle", 0)
  playChime(880, 0.13, "triangle", 0.08)
  playChime(1040, 0.16, "sine", 0.16)
}

function playOopsSound() {
  playChime(320, 0.12, "square", 0)
  playChime(240, 0.18, "square", 0.08)
}

function renderCollection() {
  customerCollectionEl.innerHTML = ""
  const seenStickerCustomers = stickerAlbumCustomers.filter((customer) => seenCustomers.includes(customer.name))
  collectionSummaryEl.textContent = `Sticker book progress: ${seenStickerCustomers.length}/${stickerAlbumCustomers.length} customers met.`

  stickerAlbumCustomers.forEach((customer) => {
    const card = document.createElement("div")
    const isSeen = seenCustomers.includes(customer.name)
    card.className = `collection-card${isSeen ? "" : " locked"}`

    const emoji = document.createElement("span")
    emoji.className = "collection-emoji"
    emoji.textContent = isSeen ? customer.emoji : "❔"

    const name = document.createElement("div")
    name.className = "collection-name"
    name.textContent = isSeen ? customer.name : "Mystery Friend"

    const meta = document.createElement("div")
    meta.className = "collection-meta"
    meta.textContent = isSeen ? customer.subtitle : "Meet this customer in a round."

    card.appendChild(emoji)
    card.appendChild(name)
    card.appendChild(meta)
    customerCollectionEl.appendChild(card)
  })
}

function getChallengeMetric(challengeId) {
  if (challengeId === "perfect_orders") {
    return roundPerfectOrders
  }

  if (challengeId === "cone_serves") {
    return roundConeServes
  }

  if (challengeId === "score") {
    return score
  }

  if (challengeId === "streak") {
    return streak
  }

  if (challengeId === "special_orders") {
    return roundSpecialOrders
  }

  return 0
}

function refreshDailyChallenges() {
  ensureDailyChallengesCurrent()

  dailyChallenges = dailyChallenges.map((challenge) => {
    const progress = Math.min(challenge.target, getChallengeMetric(challenge.id))
    const completed = progress >= challenge.target
    const updated = {
      ...challenge,
      progress,
      completed,
    }

    if (completed && !challenge.rewarded) {
      dollars += challenge.reward
      dailyRewardEarnedThisRound += challenge.reward
      updated.rewarded = true
      createSparkles(12)
      playChime(780, 0.08, "triangle", 0)
      playChime(980, 0.1, "triangle", 0.08)
      setReaction(`Daily challenge complete: ${challenge.title}! You earned $${challenge.reward}.`)
    }

    return updated
  })

  saveProgress()
  updateStats()
  renderDailyChallenges()
}

function renderDailyChallenges() {
  dailyChallengeListEl.innerHTML = ""

  dailyChallenges.forEach((challenge) => {
    const card = document.createElement("div")
    card.className = "daily-challenge"

    const top = document.createElement("div")
    top.className = "challenge-topline"

    const title = document.createElement("strong")
    title.textContent = challenge.title

    const reward = document.createElement("span")
    reward.className = "challenge-status"
    reward.textContent = challenge.completed ? `Earned $${challenge.reward}` : `Reward $${challenge.reward}`

    top.appendChild(title)
    top.appendChild(reward)

    const description = document.createElement("p")
    description.className = "collection-meta"
    description.textContent = challenge.description

    const progressWrap = document.createElement("div")
    progressWrap.className = "challenge-progress"

    const progressFill = document.createElement("div")
    progressFill.className = "challenge-progress-fill"
    progressFill.style.width = `${(challenge.progress / challenge.target) * 100}%`

    const status = document.createElement("div")
    status.className = "challenge-status"
    status.textContent = `${challenge.progress}/${challenge.target}`

    progressWrap.appendChild(progressFill)
    card.appendChild(top)
    card.appendChild(description)
    card.appendChild(progressWrap)
    card.appendChild(status)
    dailyChallengeListEl.appendChild(card)
  })
}

function grantRandomPowerUp(count = 1) {
  const types = Object.keys(powerUps)

  for (let index = 0; index < count; index += 1) {
    const type = randomFrom(types)
    powerUps[type] += 1
  }

  saveProgress()
  renderPowerUps()
}

function renderPowerUps() {
  powerButtonsEl.innerHTML = ""

  Object.entries(powerUpConfig).forEach(([type, config]) => {
    const button = document.createElement("button")
    button.className = "power-button"
    button.type = "button"
    button.dataset.powerType = type
    button.disabled = !currentOrder || powerUps[type] <= 0 || isPaused

    let statusText = `${powerUps[type]} ready`

    if (type === "freeze" && freezeTicks > 0) {
      statusText = `Active ${freezeTicks}s`
    } else if (type === "bonus" && bonusNextOrder) {
      statusText = "Boost ready"
    } else if (type === "hint" && hintActive) {
      statusText = "Shown now"
    }

    button.innerHTML = `${config.label} (${powerUps[type]})<small>${config.description} ${statusText}</small>`
    powerButtonsEl.appendChild(button)
  })

  pauseButton.textContent = isPaused ? "Resume" : "Pause"
}

function usePowerUp(type) {
  if (!currentOrder || powerUps[type] <= 0 || isPaused) {
    return
  }

  powerUps[type] -= 1

  if (type === "freeze") {
    freezeTicks = Math.max(freezeTicks, FREEZE_DURATION)
    setReaction("Freeze Time activated! The clock and patience meter are resting.")
  } else if (type === "hint") {
    hintActive = true
    applyHintTargets()
    setReaction("Magic Hint activated! The correct buttons are glowing.")
  } else if (type === "bonus") {
    bonusNextOrder = true
    setReaction("Double Dollars activated! The next correct order pays extra.")
  }

  playChime(840, 0.09, "triangle", 0)
  saveProgress()
  renderPowerUps()
  updatePatienceUI()
  updateStats()
}

function isSelectionComplete() {
  return Boolean(currentSelection.container && currentSelection.flavor && currentSelection.topping)
}

function isCurrentSelectionCorrect(expectedOrder) {
  return currentSelection.container === expectedOrder.container &&
    currentSelection.flavor === expectedOrder.flavor &&
    currentSelection.topping === expectedOrder.topping
}

function completeSingleOrder(order) {
  const patienceRatio = getPatienceRatio()
  let scoreGain = 10 + (streak >= 3 ? 5 : 0) + (order.scoreBonus || 0)
  let dollarGain = order.dollarBonus || 0

  if (order.specialType === "rush" && patienceRatio >= order.speedGoalRatio) {
    scoreGain += 4
    dollarGain += 2
    fastestServeCount += 1
  }

  if (order.specialType === "vip") {
    scoreGain += Math.ceil(patienceRatio * 4)
    dollarGain += 2
  }

  if (bonusNextOrder) {
    dollarGain += 4
    bonusNextOrder = false
  }

  streak += 1
  score += scoreGain
  dollars += dollarGain
  roundCorrectOrders += 1
  roundPerfectOrders += 1
  roundConeServes += currentSelection.container === "cone" ? 1 : 0
  roundSpecialOrders += order.specialType !== "standard" ? 1 : 0

  awardDollarsFromScore()

  if (isSpecialLevelActive) {
    dollars += 1
    saveProgress()
  }

  createSparkles(streak >= 3 ? 10 : 6)
  playSuccessSound()
  refreshDailyChallenges()

  setReaction(
    isSpecialLevelActive
      ? "Special Level reward! Magical orders give extra goodies."
      : order.specialType === "vip"
        ? "VIP delight! That deluxe order was perfect."
        : order.specialType === "rush" && patienceRatio >= order.speedGoalRatio
          ? "Speed bonus! That order flew out of the shop."
          : streak >= 3
            ? "Perfect order! Bonus points for your streak!"
            : "Yummy! That's exactly right."
  )

  if (roundCorrectOrders > 0 && roundCorrectOrders % 5 === 0) {
    grantRandomPowerUp(1)
  } else {
    renderPowerUps()
  }
}

function finishOrderCycle() {
  updateStats()
  resetBuilder()
  generateOrder()
}

function handleBunnyServe() {
  const currentBunnyOrder = currentOrder.orders[bunnyOrderProgress]

  if (!isCurrentSelectionCorrect(currentBunnyOrder)) {
    streak = 0
    score = Math.max(0, score - 5)
    mistakesThisRound += 1
    bunnyOrderProgress = 0
    bonusNextOrder = false
    playOopsSound()
    setReaction("Oops, the bunny wanted those exact ice creams in order.")
    finishOrderCycle()
    return
  }

  bunnyOrderProgress += 1
  score += 10
  roundConeServes += currentSelection.container === "cone" ? 1 : 0
  awardDollarsFromScore()
  createSparkles(8)
  playSuccessSound()

  if (bunnyOrderProgress >= currentOrder.orders.length) {
    streak = 0
    score += 10
    dollars += 10
    roundCorrectOrders += currentOrder.orders.length
    roundPerfectOrders += currentOrder.orders.length
    roundSpecialOrders += 1
    awardDollarsFromScore()
    bunnyOrderProgress = 0
    createSparkles(12)
    refreshDailyChallenges()
    setReaction(
      isSpecialLevelActive
        ? "Special bunny bonus complete! You earned extra rewards."
        : "Bunny bonus complete! She happily takes the whole order."
    )
    finishOrderCycle()
    return
  }

  updateStats()
  resetBuilder()
  renderOrder(currentOrder)
  refreshDailyChallenges()
  setReaction("Yay! Keep going, the bunny wants the next scoop.")
}

function handleServe() {
  if (isPaused) {
    setReaction("Resume the game before serving.")
    return
  }

  if (!isSelectionComplete()) {
    setReaction("This order needs a container, a flavor, and a topping choice.")
    playOopsSound()
    return
  }

  if (currentOrder.type === "double") {
    handleBunnyServe()
    return
  }

  if (isCurrentSelectionCorrect(currentOrder)) {
    completeSingleOrder(currentOrder)
  } else {
    streak = 0
    score = Math.max(0, score - 3)
    mistakesThisRound += 1
    bonusNextOrder = false
    playOopsSound()
    setReaction("Oops, that wasn't the order. Try the next one!")
  }

  refreshDailyChallenges()
  finishOrderCycle()
}

function handlePatienceTimeout() {
  streak = 0
  score = Math.max(0, score - 4)
  mistakesThisRound += 1
  bonusNextOrder = false
  playOopsSound()
  createSparkles(4)
  setReaction(`${currentOrder.customer.name} ran out of patience and walked away.`)
  updateStats()
  resetBuilder()
  generateOrder()
}

function tickGame() {
  if (isPaused) {
    return
  }

  if (freezeTicks > 0) {
    freezeTicks -= 1
    updatePatienceUI()
    renderPowerUps()
    updateStats()
    return
  }

  timeLeft -= 1
  patienceCurrent -= 1
  updatePatienceUI()
  updateStats()

  if (patienceCurrent <= 0 && currentOrder) {
    handlePatienceTimeout()
  }

  if (timeLeft <= 0) {
    endGame()
  }
}

function startGame() {
  ensureAudio()
  ensureDailyChallengesCurrent()
  score = 0
  streak = 0
  freezeTicks = 0
  bonusNextOrder = false
  hintActive = false
  isPaused = false
  dailyRewardEarnedThisRound = 0
  roundCorrectOrders = 0
  roundPerfectOrders = 0
  roundConeServes = 0
  roundSpecialOrders = 0
  mistakesThisRound = 0
  fastestServeCount = 0
  isSpecialLevelActive = pendingSpecialLevel && !specialLevelPlayed
  timeLeft = isSpecialLevelActive ? SPECIAL_LEVEL_TIME : getCurrentShopConfig().timeLimit
  bunnyBonusShown = false
  bunnyOrderProgress = 0
  scoreDollarStepsAwarded = 0

  if (isSpecialLevelActive) {
    pendingSpecialLevel = false
    specialLevelPlayed = true
    saveProgress()
  }

  grantRandomPowerUp(1)
  updateStats()
  resetBuilder()
  generateOrder()

  if (isSpecialLevelActive) {
    setReaction("Special Level! Magical orders give extra rewards in your new shop.")
  } else {
    setReaction("Pick the ingredients, watch each customer's patience, and press Serve.")
  }

  refreshDailyChallenges()
  showScreen(gameScreen)
  renderPowerUps()

  clearInterval(timerId)
  timerId = window.setInterval(tickGame, 1000)
}

function endGame() {
  clearInterval(timerId)
  timerId = null
  isPaused = false

  roundsPlayed += 1
  rotateShopIfNeeded()
  refreshDailyChallenges()
  updateLeaderboard()

  finalScoreEl.textContent = score
  finalWalletEl.textContent = dollars
  finalDailyRewardEl.textContent = dailyRewardEarnedThisRound
  finalMessageEl.textContent =
    isSpecialLevelActive
      ? "You finished the one-time special level!"
      : score >= 140
        ? `You ran a superstar ${getCurrentShopConfig().name.toLowerCase()}!`
        : score >= 80
          ? `That was a sweet and happy shift in ${getCurrentShopConfig().name}.`
          : `Your ${getCurrentShopConfig().name.toLowerCase()} customers still had lots of fun.`

  saveProgress()
  renderShop()
  renderSellMenu()
  renderLeaderboard()
  renderDailyChallenges()
  renderCollection()
  renderPowerUps()
  showScreen(resultScreen)

  if (shouldShowGoldenFox()) {
    openGoldenFoxModal()
  } else if (shouldShowPhoenix()) {
    openPhoenixModal()
  }
}

function togglePause() {
  if (!timerId) {
    return
  }

  isPaused = !isPaused
  updatePatienceUI()
  updateStats()
  renderPowerUps()
  setReaction(isPaused ? "Shift paused. Press Resume when you're ready." : "Shift resumed. Keep scooping!")
}

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".menu-toggle")

  if (menuButton) {
    ensureAudio()
    playChime(620, 0.05, "sine", 0)
    toggleSellItem(menuButton.dataset.menuGroup, menuButton.dataset.value)
    renderOptions()
    return
  }

  const powerButton = event.target.closest(".power-button")

  if (powerButton) {
    ensureAudio()
    usePowerUp(powerButton.dataset.powerType)
    return
  }

  const button = event.target.closest(".option-button")

  if (!button || isPaused) {
    return
  }

  ensureAudio()
  playChime(520, 0.05, "sine", 0)
  const { group, value } = button.dataset
  currentSelection[group] = value
  setSelectedButtons()
  renderPreview()
})

startButton.addEventListener("click", startGame)
playAgainButton.addEventListener("click", () => {
  renderShopProgress()
  renderShop()
  renderDailyChallenges()
  renderCollection()
  showScreen(startScreen)
})
phoenixAcceptButton.addEventListener("click", upgradeToLevel2Shop)
phoenixCloseButton.addEventListener("click", closePhoenixModal)
goldenFoxAcceptButton.addEventListener("click", claimGoldenFoxReward)
goldenFoxCloseButton.addEventListener("click", closeGoldenFoxModal)
shopSelectorEl.addEventListener("change", (event) => {
  selectedShopLevel = Math.min(Math.max(Number.parseInt(event.target.value, 10) || 1, 1), shopLevel)
  renderShopProgress()
  saveProgress()
})
pauseButton.addEventListener("click", togglePause)
resetButton.addEventListener("click", () => {
  resetBuilder()
  setReaction("Your ice cream was cleared. Build the order again.")
})
serveButton.addEventListener("click", handleServe)

loadProgress()
renderOptions()
renderShopProgress()
renderShop()
renderSellMenu()
renderLeaderboard()
renderDailyChallenges()
renderCollection()
renderPowerUps()
renderPreview()
updateStats()
showScreen(startScreen)
