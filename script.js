const STORAGE_KEY = "sweet-scoop-shop-save-v1";
const LEADERBOARD_LIMIT = 5;
const BASE_SHOP_PAGE_SIZE = 3;
const LEVEL_2_SHOP_PAGE_SIZE = 5;
const SHOP_ROTATE_EVERY_ROUNDS = 2;
const PHOENIX_FIRST_ROUND = 15;
const PHOENIX_RETURN_GAP = 10;
const PHOENIX_SHOP_COST = 150;
const SPECIAL_LEVEL_TIME = 45;

const customers = [
  { name: "Mimi", emoji: "🐱", subtitle: "Kitten who loves sweet treats" },
  { name: "Pip", emoji: "🐶", subtitle: "Puppy waiting for a perfect scoop" },
  { name: "Luna", emoji: "🐰", subtitle: "Bunny who always orders neatly" },
  { name: "Sunny", emoji: "🐻", subtitle: "Bear cub with a big dessert smile" },
  { name: "Coco", emoji: "🦊", subtitle: "Fox friend who adores sprinkles" },
];

const bunnyBonusCustomer = {
  name: "Poppy",
  emoji: "🐰",
  subtitle: "Special bunny guest with a double order",
};

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
};

const baseContainers = ["cup", "cone"];
const baseFlavors = ["vanilla", "chocolate", "strawberry"];
const toppings = ["none", "sprinkles", "cherry"];

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
];

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const streakEl = document.getElementById("streak");
const gameWalletEl = document.getElementById("game-wallet");
const walletAmountEl = document.getElementById("wallet-amount");
const finalScoreEl = document.getElementById("final-score");
const finalWalletEl = document.getElementById("final-wallet");
const finalMessageEl = document.getElementById("final-message");

const customerNameEl = document.getElementById("customer-name");
const customerEmojiEl = document.getElementById("customer-emoji");
const customerSubtitleEl = document.getElementById("customer-subtitle");
const orderContainerEl = document.getElementById("order-container");
const orderFlavorEl = document.getElementById("order-flavor");
const orderToppingEl = document.getElementById("order-topping");
const orderSpecialEl = document.getElementById("order-special");
const secondOrderEl = document.getElementById("second-order");
const order2ContainerEl = document.getElementById("order2-container");
const order2FlavorEl = document.getElementById("order2-flavor");
const order2ToppingEl = document.getElementById("order2-topping");
const reactionMessageEl = document.getElementById("reaction-message");

const previewEl = document.getElementById("icecream-preview");
const sparkleLayerEl = document.getElementById("sparkle-layer");
const containerOptionsEl = document.getElementById("container-options");
const flavorOptionsEl = document.getElementById("flavor-options");
const toppingOptionsEl = document.getElementById("topping-options");
const shopItemsEl = document.getElementById("shop-items");
const sellFlavorOptionsEl = document.getElementById("sell-flavor-options");
const sellContainerOptionsEl = document.getElementById("sell-container-options");
const leaderboardListEl = document.getElementById("leaderboard-list");

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const serveButton = document.getElementById("serve-button");
const resetButton = document.getElementById("reset-button");
const playAgainButton = document.getElementById("play-again-button");
const phoenixModalEl = document.getElementById("phoenix-modal");
const phoenixTitleEl = document.getElementById("phoenix-title");
const phoenixMessageEl = document.getElementById("phoenix-message");
const phoenixAcceptButton = document.getElementById("phoenix-accept-button");
const phoenixCloseButton = document.getElementById("phoenix-close-button");

let score = 0;
let streak = 0;
let timeLeft = 60;
let dollars = 0;
let scoreDollarStepsAwarded = 0;
let timerId = null;
let currentOrder = null;
let currentSelection = createEmptySelection();
let bunnyBonusShown = false;
let bunnyOrderProgress = 0;
let unlockedContainers = [...baseContainers];
let unlockedFlavors = [...baseFlavors];
let activeContainers = [...baseContainers];
let activeFlavors = [...baseFlavors];
let roundsPlayed = 0;
let shopRotationIndex = 0;
let shopLevel = 1;
let nextPhoenixRound = PHOENIX_FIRST_ROUND;
let phoenixOfferPending = false;
let pendingSpecialLevel = false;
let specialLevelPlayed = false;
let isSpecialLevelActive = false;
let leaderboard = [];
let audioContext = null;

function createEmptySelection() {
  return {
    container: null,
    flavor: null,
    topping: "none",
  };
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function formatLabel(value) {
  return labels[value] || value;
}

function showScreen(screen) {
  [startScreen, gameScreen, resultScreen].forEach((item) => {
    item.classList.remove("screen-active");
  });
  screen.classList.add("screen-active");
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
    nextPhoenixRound,
    pendingSpecialLevel,
    specialLevelPlayed,
    leaderboard,
  };
}

function saveProgress() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(getSaveState()));
  } catch (error) {
    console.warn("Could not save progress.", error);
  }
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return;
    }

    const saved = JSON.parse(raw);
    dollars = Number.isFinite(saved.dollars) ? saved.dollars : 0;
    unlockedContainers = Array.isArray(saved.unlockedContainers)
      ? [...new Set([...baseContainers, ...saved.unlockedContainers.filter((value) => shopCatalog.some((item) => item.value === value && item.group === "container"))])]
      : [...baseContainers];
    unlockedFlavors = Array.isArray(saved.unlockedFlavors)
      ? [...new Set([...baseFlavors, ...saved.unlockedFlavors.filter((value) => shopCatalog.some((item) => item.value === value && item.group === "flavor"))])]
      : [...baseFlavors];
    activeContainers = Array.isArray(saved.activeContainers)
      ? saved.activeContainers.filter((value) => unlockedContainers.includes(value))
      : [...unlockedContainers];
    activeFlavors = Array.isArray(saved.activeFlavors)
      ? saved.activeFlavors.filter((value) => unlockedFlavors.includes(value))
      : [...unlockedFlavors];
    roundsPlayed = Number.isFinite(saved.roundsPlayed) ? saved.roundsPlayed : 0;
    shopRotationIndex = Number.isFinite(saved.shopRotationIndex) ? saved.shopRotationIndex % shopCatalog.length : 0;
    shopLevel = Number.isFinite(saved.shopLevel) ? saved.shopLevel : 1;
    nextPhoenixRound = Number.isFinite(saved.nextPhoenixRound) ? saved.nextPhoenixRound : PHOENIX_FIRST_ROUND;
    pendingSpecialLevel = Boolean(saved.pendingSpecialLevel);
    specialLevelPlayed = Boolean(saved.specialLevelPlayed);
    leaderboard = Array.isArray(saved.leaderboard) ? saved.leaderboard.slice(0, LEADERBOARD_LIMIT) : [];

    if (!activeContainers.length) {
      activeContainers = [...unlockedContainers];
    }

    if (!activeFlavors.length) {
      activeFlavors = [...unlockedFlavors];
    }
  } catch (error) {
    console.warn("Could not load progress.", error);
  }
}

function renderLeaderboard() {
  leaderboardListEl.innerHTML = "";

  if (!leaderboard.length) {
    const empty = document.createElement("div");
    empty.className = "leaderboard-empty";
    empty.textContent = "No scores yet. Play a round and become the first ice cream star.";
    leaderboardListEl.appendChild(empty);
    return;
  }

  leaderboard.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";

    const rank = document.createElement("div");
    rank.className = "leaderboard-rank";
    rank.textContent = `#${index + 1}`;

    const name = document.createElement("div");
    name.className = "leaderboard-name";
    name.textContent = entry.title;

    const scoreStat = document.createElement("div");
    scoreStat.className = "leaderboard-stat";
    scoreStat.textContent = `Score ${entry.score}`;

    const dollarStat = document.createElement("div");
    dollarStat.className = "leaderboard-stat";
    dollarStat.textContent = `$${entry.dollars}`;

    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(scoreStat);
    row.appendChild(dollarStat);
    leaderboardListEl.appendChild(row);
  });
}

function updateLeaderboard() {
  const entry = {
    title: `Round ${roundsPlayed}`,
    score,
    dollars,
  };

  leaderboard = [...leaderboard, entry]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return right.dollars - left.dollars;
    })
    .slice(0, LEADERBOARD_LIMIT);
}

function updateStats() {
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  streakEl.textContent = streak;
  gameWalletEl.textContent = dollars;
  walletAmountEl.textContent = dollars;
}

function setReaction(message) {
  reactionMessageEl.textContent = message;
}

function renderOptions() {
  containerOptionsEl.innerHTML = "";
  flavorOptionsEl.innerHTML = "";
  toppingOptionsEl.innerHTML = "";

  activeContainers.forEach((container) => {
    containerOptionsEl.appendChild(createOptionButton("container", container));
  });

  activeFlavors.forEach((flavor) => {
    flavorOptionsEl.appendChild(createOptionButton("flavor", flavor));
  });

  toppings.forEach((topping) => {
    toppingOptionsEl.appendChild(createOptionButton("topping", topping));
  });

  setSelectedButtons();
}

function createOptionButton(group, value) {
  const button = document.createElement("button");
  button.className = "option-button";
  button.type = "button";
  button.dataset.group = group;
  button.dataset.value = value;
  button.textContent = formatLabel(value);
  return button;
}

function getOptionButtons() {
  return Array.from(document.querySelectorAll(".option-button"));
}

function setSelectedButtons() {
  getOptionButtons().forEach((button) => {
    const { group, value } = button.dataset;
    button.classList.toggle("selected", currentSelection[group] === value);
  });
}

function renderShop() {
  shopItemsEl.innerHTML = "";

  getVisibleShopItems().forEach((item) => {
    const isBought = item.group === "flavor"
      ? unlockedFlavors.includes(item.value)
      : unlockedContainers.includes(item.value);

    const card = document.createElement("article");
    card.className = "shop-item";

    const title = document.createElement("h3");
    title.textContent = item.name;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = `${item.description} Cost: $${item.cost}`;
    card.appendChild(description);

    const button = document.createElement("button");
    button.className = "shop-button";
    button.type = "button";
    button.disabled = isBought || dollars < item.cost;
    button.textContent = isBought ? "Bought" : dollars >= item.cost ? `Buy for $${item.cost}` : `Need $${item.cost}`;
    button.addEventListener("click", () => buyShopItem(item.id));
    card.appendChild(button);

    shopItemsEl.appendChild(card);
  });
}

function getVisibleShopItems() {
  const shopPageSize = shopLevel >= 2 ? LEVEL_2_SHOP_PAGE_SIZE : BASE_SHOP_PAGE_SIZE;

  if (shopCatalog.length <= shopPageSize) {
    return [...shopCatalog];
  }

  return Array.from({ length: shopPageSize }, (_, offset) => {
    const index = (shopRotationIndex + offset) % shopCatalog.length;
    return shopCatalog[index];
  });
}

function rotateShopIfNeeded() {
  if (roundsPlayed > 0 && roundsPlayed % SHOP_ROTATE_EVERY_ROUNDS === 0) {
    shopRotationIndex = (shopRotationIndex + 2) % shopCatalog.length;
  }
}

function shouldShowPhoenix() {
  return shopLevel < 2 && roundsPlayed >= nextPhoenixRound;
}

function openPhoenixModal() {
  phoenixOfferPending = true;
  phoenixModalEl.classList.remove("hidden");

  if (dollars >= PHOENIX_SHOP_COST) {
    phoenixTitleEl.textContent = "The phoenix offers a bigger shop";
    phoenixMessageEl.textContent = `Hey do you whant to have a bigger shop? You have at least $${PHOENIX_SHOP_COST}, so you can buy a new shop and turn it into Level 2.`;
    phoenixAcceptButton.classList.remove("hidden");
    phoenixAcceptButton.disabled = false;
    return;
  }

  phoenixTitleEl.textContent = "The phoenix will come back later";
  phoenixMessageEl.textContent = "Hey do you whant to have a bigger shop? You do not have 500 yet. After you play ten rounds i will come back.";
  phoenixAcceptButton.classList.add("hidden");
  phoenixAcceptButton.disabled = true;
  nextPhoenixRound = roundsPlayed + PHOENIX_RETURN_GAP;
  saveProgress();
}

function closePhoenixModal() {
  phoenixOfferPending = false;
  phoenixModalEl.classList.add("hidden");
}

function upgradeToLevel2Shop() {
  if (dollars < PHOENIX_SHOP_COST || shopLevel >= 2) {
    return;
  }

  dollars -= PHOENIX_SHOP_COST;
  shopLevel = 2;
  phoenixOfferPending = false;
  nextPhoenixRound = Number.MAX_SAFE_INTEGER;
  if (!specialLevelPlayed) {
    pendingSpecialLevel = true;
  }
  saveProgress();
  updateStats();
  renderShop();
  closePhoenixModal();
  playSuccessSound();
  createSparkles(14);
  setReaction("The phoenix made your shop bigger. Welcome to Level 2! A special level is waiting.");
}

function renderSellMenu() {
  sellFlavorOptionsEl.innerHTML = "";
  sellContainerOptionsEl.innerHTML = "";

  unlockedFlavors.forEach((flavor) => {
    sellFlavorOptionsEl.appendChild(createMenuToggle("flavor", flavor, activeFlavors.includes(flavor)));
  });

  unlockedContainers.forEach((container) => {
    sellContainerOptionsEl.appendChild(createMenuToggle("container", container, activeContainers.includes(container)));
  });
}

function createMenuToggle(group, value, isActive) {
  const button = document.createElement("button");
  button.className = `menu-toggle${isActive ? " active" : ""}`;
  button.type = "button";
  button.dataset.menuGroup = group;
  button.dataset.value = value;
  button.textContent = isActive ? `${formatLabel(value)} On` : `${formatLabel(value)} Off`;
  return button;
}

function toggleSellItem(group, value) {
  const list = group === "flavor" ? activeFlavors : activeContainers;
  const unlockedList = group === "flavor" ? unlockedFlavors : unlockedContainers;

  if (list.includes(value)) {
    if (list.length === 1) {
      setReaction(`Keep at least one ${group} on the menu.`);
      playOopsSound();
      return;
    }

    if (group === "flavor") {
      activeFlavors = activeFlavors.filter((item) => item !== value);
    } else {
      activeContainers = activeContainers.filter((item) => item !== value);
    }
  } else if (unlockedList.includes(value)) {
    if (group === "flavor") {
      activeFlavors = [...activeFlavors, value];
    } else {
      activeContainers = [...activeContainers, value];
    }
  }

  currentSelection = {
    container: activeContainers.includes(currentSelection.container) ? currentSelection.container : null,
    flavor: activeFlavors.includes(currentSelection.flavor) ? currentSelection.flavor : null,
    topping: currentSelection.topping,
  };
  setSelectedButtons();
  renderPreview();
  saveProgress();
  renderSellMenu();
}

function buyShopItem(itemId) {
  const item = shopCatalog.find((entry) => entry.id === itemId);

  if (!item || dollars < item.cost) {
    return;
  }

  dollars -= item.cost;

  if (item.group === "flavor" && !unlockedFlavors.includes(item.value)) {
    unlockedFlavors.push(item.value);
    if (!activeFlavors.includes(item.value)) {
      activeFlavors.push(item.value);
    }
  }

  if (item.group === "container" && !unlockedContainers.includes(item.value)) {
    unlockedContainers.push(item.value);
    if (!activeContainers.includes(item.value)) {
      activeContainers.push(item.value);
    }
  }

  saveProgress();
  playChime(720, 0.09, "triangle", 0);
  playChime(920, 0.12, "triangle", 0.08);
  updateStats();
  renderOptions();
  renderShop();
  renderSellMenu();
}

function renderPreview() {
  previewEl.innerHTML = "";

  if (!currentSelection.container) {
    const empty = document.createElement("div");
    empty.className = "preview-empty";
    empty.textContent = "Choose a cup or cone to begin";
    previewEl.appendChild(empty);
    return;
  }

  if (currentSelection.topping === "cherry") {
    const cherry = document.createElement("div");
    cherry.className = "topping-cherry";
    previewEl.appendChild(cherry);
  }

  if (currentSelection.topping === "sprinkles") {
    const sprinkles = document.createElement("div");
    sprinkles.className = "topping-sprinkles";
    previewEl.appendChild(sprinkles);
  }

  if (currentSelection.flavor) {
    const scoop = document.createElement("div");
    scoop.className = `icecream-scoop flavor-${currentSelection.flavor}`;
    previewEl.appendChild(scoop);
  }

  const base = document.createElement("div");
  if (currentSelection.container === "heartCup") {
    base.className = "heart-cup";
  } else if (currentSelection.container === "starCup") {
    base.className = "star-cup";
  } else {
    base.className = currentSelection.container === "cup" ? "cup" : "cone";
  }
  previewEl.appendChild(base);
}

function createSingleOrder(customer) {
  return {
    type: "single",
    customer,
    container: randomFrom(activeContainers),
    flavor: randomFrom(activeFlavors),
    topping: randomFrom(toppings),
  };
}

function createBunnyBonusOrder() {
  return {
    type: "double",
    customer: bunnyBonusCustomer,
    orders: [
      {
        container: randomFrom(activeContainers),
        flavor: randomFrom(activeFlavors),
        topping: randomFrom(toppings),
      },
      {
        container: randomFrom(activeContainers),
        flavor: randomFrom(activeFlavors),
        topping: randomFrom(toppings),
      },
    ],
  };
}

function renderOrder(order) {
  customerNameEl.textContent = order.customer.name;
  customerEmojiEl.textContent = order.customer.emoji;
  customerSubtitleEl.textContent = order.customer.subtitle;

  if (order.type === "double") {
    const activeOrder = order.orders[bunnyOrderProgress];
    const upcomingOrder = order.orders[Math.min(1, order.orders.length - 1)];

    orderSpecialEl.style.display = "inline-block";
    orderSpecialEl.textContent = `Bunny bonus: two ice creams please! ${bunnyOrderProgress}/2 done`;
    secondOrderEl.style.display = "block";

    orderContainerEl.textContent = formatLabel(activeOrder.container);
    orderFlavorEl.textContent = formatLabel(activeOrder.flavor);
    orderToppingEl.textContent = formatLabel(activeOrder.topping);

    order2ContainerEl.textContent = formatLabel(upcomingOrder.container);
    order2FlavorEl.textContent = formatLabel(upcomingOrder.flavor);
    order2ToppingEl.textContent = formatLabel(upcomingOrder.topping);
    return;
  }

  orderSpecialEl.style.display = "none";
  secondOrderEl.style.display = "none";
  orderContainerEl.textContent = formatLabel(order.container);
  orderFlavorEl.textContent = formatLabel(order.flavor);
  orderToppingEl.textContent = formatLabel(order.topping);
}

function generateOrder() {
  const shouldShowBunnyBonus = !bunnyBonusShown && timeLeft <= 35 && timeLeft >= 20;

  if (shouldShowBunnyBonus) {
    currentOrder = createBunnyBonusOrder();
    bunnyBonusShown = true;
    bunnyOrderProgress = 0;
  } else {
    currentOrder = createSingleOrder(randomFrom(customers));
  }

  renderOrder(currentOrder);
}

function resetBuilder() {
  currentSelection = createEmptySelection();
  setSelectedButtons();
  renderPreview();
}

function awardDollarsFromScore() {
  const newSteps = Math.floor(score / 5);

  if (newSteps > scoreDollarStepsAwarded) {
    dollars += newSteps - scoreDollarStepsAwarded;
    scoreDollarStepsAwarded = newSteps;
    saveProgress();
  }
}

function createSparkles(count) {
  const icons = ["✨", "⭐", "💖"];

  for (let index = 0; index < count; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = icons[Math.floor(Math.random() * icons.length)];
    sparkle.style.left = `${15 + Math.random() * 70}%`;
    sparkle.style.top = `${25 + Math.random() * 45}%`;
    sparkle.style.animationDelay = `${index * 60}ms`;
    sparkleLayerEl.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 1000);
  }
}

function ensureAudio() {
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioCtor) {
      audioContext = new AudioCtor();
    }
  }

  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
}

function playChime(frequency, duration, type, delay) {
  ensureAudio();

  if (!audioContext) {
    return;
  }

  const startAt = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(0.08, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

function playSuccessSound() {
  playChime(660, 0.11, "triangle", 0);
  playChime(880, 0.13, "triangle", 0.08);
  playChime(1040, 0.16, "sine", 0.16);
}

function playOopsSound() {
  playChime(320, 0.12, "square", 0);
  playChime(240, 0.18, "square", 0.08);
}

function startGame() {
  ensureAudio();
  score = 0;
  streak = 0;
  isSpecialLevelActive = pendingSpecialLevel && !specialLevelPlayed;
  timeLeft = isSpecialLevelActive ? SPECIAL_LEVEL_TIME : 60;
  bunnyBonusShown = false;
  bunnyOrderProgress = 0;
  scoreDollarStepsAwarded = 0;
  if (isSpecialLevelActive) {
    pendingSpecialLevel = false;
    specialLevelPlayed = true;
    saveProgress();
  }
  updateStats();
  resetBuilder();
  generateOrder();
  if (isSpecialLevelActive) {
    setReaction("Special Level! Magical orders give extra rewards in your new shop.");
  } else {
    setReaction("Pick the ingredients and press Serve.");
  }
  showScreen(gameScreen);

  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft -= 1;
    updateStats();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  timerId = null;

  roundsPlayed += 1;
  rotateShopIfNeeded();

  finalScoreEl.textContent = score;
  finalWalletEl.textContent = dollars;
  finalMessageEl.textContent =
    isSpecialLevelActive
      ? "You finished the one-time special level!"
      : score >= 120
        ? "You ran a superstar ice cream shop!"
        : score >= 70
          ? "That was a sweet and happy shift."
          : "Your customers still had lots of fun.";

  saveProgress();
  updateLeaderboard();
  saveProgress();
  renderShop();
  renderSellMenu();
  renderLeaderboard();
  showScreen(resultScreen);

  if (shouldShowPhoenix()) {
    openPhoenixModal();
  }
}

function isSelectionComplete() {
  return Boolean(currentSelection.container && currentSelection.flavor && currentSelection.topping);
}

function handleBunnyServe() {
  const currentBunnyOrder = currentOrder.orders[bunnyOrderProgress];
  const isCorrect =
    currentSelection.container === currentBunnyOrder.container &&
    currentSelection.flavor === currentBunnyOrder.flavor &&
    currentSelection.topping === currentBunnyOrder.topping;

  if (!isCorrect) {
    streak = 0;
    score = Math.max(0, score - 5);
    bunnyOrderProgress = 0;
    playOopsSound();
    setReaction("Oops, the bunny wanted those two exact ice creams.");
    updateStats();
    resetBuilder();
    generateOrder();
    return;
  }

  bunnyOrderProgress += 1;
  score += 10;
  awardDollarsFromScore();
  createSparkles(8);
  playSuccessSound();

  if (bunnyOrderProgress >= currentOrder.orders.length) {
    streak = 0;
    score += 10;
    dollars += isSpecialLevelActive ? 15 : 10;
    awardDollarsFromScore();
    bunnyOrderProgress = 0;
    createSparkles(12);
    setReaction(
      isSpecialLevelActive
        ? "Special bunny bonus complete! You earned extra rewards."
        : "Bunny bonus complete! She happily takes both ice creams."
    );
    saveProgress();
    updateStats();
    resetBuilder();
    generateOrder();
    return;
  }

  setReaction("Yay! One more ice cream for the bunny.");
  updateStats();
  resetBuilder();
  renderOrder(currentOrder);
}

function handleServe() {
  if (!isSelectionComplete()) {
    setReaction("This order needs a container, a flavor, and a topping choice.");
    playOopsSound();
    return;
  }

  if (currentOrder.type === "double") {
    handleBunnyServe();
    return;
  }

  const isCorrect =
    currentSelection.container === currentOrder.container &&
    currentSelection.flavor === currentOrder.flavor &&
    currentSelection.topping === currentOrder.topping;

  if (isCorrect) {
    streak += 1;
    score += 10 + (streak >= 3 ? 5 : 0);
    awardDollarsFromScore();
    if (isSpecialLevelActive) {
      dollars += 1;
      saveProgress();
    }
    createSparkles(streak >= 3 ? 10 : 6);
    playSuccessSound();
    setReaction(
      isSpecialLevelActive
        ? "Special Level reward! Magical orders give extra goodies."
        : streak >= 3
          ? "Perfect order! Bonus points for your streak!"
          : "Yummy! That's exactly right."
    );
  } else {
    streak = 0;
    score = Math.max(0, score - 3);
    playOopsSound();
    setReaction("Oops, that wasn't the order. Try the next one!");
  }

  updateStats();
  resetBuilder();
  generateOrder();
}

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".menu-toggle");

  if (menuButton) {
    ensureAudio();
    playChime(620, 0.05, "sine", 0);
    toggleSellItem(menuButton.dataset.menuGroup, menuButton.dataset.value);
    renderOptions();
    return;
  }

  const button = event.target.closest(".option-button");

  if (!button) {
    return;
  }

  ensureAudio();
  playChime(520, 0.05, "sine", 0);
  const { group, value } = button.dataset;
  currentSelection[group] = value;
  setSelectedButtons();
  renderPreview();
});

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", () => {
  renderShop();
  showScreen(startScreen);
});
phoenixAcceptButton.addEventListener("click", upgradeToLevel2Shop);
phoenixCloseButton.addEventListener("click", closePhoenixModal);
resetButton.addEventListener("click", () => {
  resetBuilder();
  setReaction("Your ice cream was cleared. Build the order again.");
});
serveButton.addEventListener("click", handleServe);

loadProgress();
renderOptions();
renderShop();
renderSellMenu();
renderLeaderboard();
renderPreview();
updateStats();
showScreen(startScreen);
