import type { Tweet } from './sampleData';

// Comment templates ported from ai/comment_generator.py
const toxicComments = {
  threat: [
    'KYS nobody wants you here',
    'I will find where you live',
    'You should just die already',
    'Watch your back, I know your address',
    '去死吧你，恶心东西',
    '我知道你住哪，小心点',
    '把你地址人肉出来，等着',
    '有种别删评论，等我找到你',
  ],
  hate_appearance: [
    'You look like a plastic surgery disaster',
    'That face is so ugly even filters cant help',
    'Imagine being that fat and still posting',
    'Your face is so botched its scary',
    '这身材也好意思发出来？猪都比你瘦',
    '整容脸还出来丢人，脸僵得像假人',
    '太丑了吧，滤镜开满都救不了',
  ],
  hate_identity: [
    'Go back to your country',
    'Your kind shouldnt be on this platform',
    'Typical behavior from your people',
    'Women shouldnt have opinions on this',
    '又是你们这种人在带节奏',
    '滚回你的国家去',
    '女的就别出来丢人了',
  ],
  harassment: [
    'Nobody asked for your opinion, delete your account',
    'What an absolute waste of space you are',
    'This level of content? Just quit already',
    'Garbage content, complete waste of time',
    '这水平也好意思发？建议退网',
    '垃圾内容，浪费时间',
    '傻X一个，说的什么东西',
    '活该翻车，早该凉了',
    'L + ratio + unfollowed',
    'Flop era, you deserve to fail',
  ],
  spam: [
    'CHECK OUT MY CHANNEL FOR FREE IPHONE GIVEAWAY!!!',
    'I made $5000 a day working from home, ask me how',
    'Crypto investment opportunity, guaranteed returns 🚀',
    'DM for collab opportunity 💼',
    'Ambassador needed! DM for details 💕',
    '兼职日结500+，有兴趣私我',
    '投资比特币，稳赚不赔，加我了解',
    '恭喜中奖！点击领取',
  ],
  distortion: [
    'Your whole persona is fake news',
    'Stop pretending, we know the truth about you',
    'Someone told me you used to do XXX',
    '别装了，你的人设都是假的',
    '有人爆料你以前干过XXX',
    '听说你被某某包养？难怪这么有钱',
  ],
  ratio: [
    'ratio',
    'L',
    'flop',
    'nobody asked',
    "didn't ask + don't care",
    '没人问你',
    'nobody asked + ratio + you fell off',
    'imagine posting this and thinking its good',
  ],
};

const safeComments = [
  'Just watched your latest video, absolutely loved it! 🎬',
  'Interesting perspective, thanks for sharing!',
  'Great tutorial! This helped me fix my project 🙏',
  'Following your channel for 2 years now, love the growth!',
  'Really appreciate you covering this topic ❤️',
  'This is so well explained, bookmarked!',
  'Keep up the great work, you inspire me!',
  'Finally someone talking about this, thank you!',
  'Your content always makes my day better 😊',
  'Learned so much from this, subscribed!',
  '太美了吧！太绝了',
  '笑死我了哈哈哈哈哈',
  '好有道理，学到了',
  '支持！加油！❤️',
  '内容很棒，关注了',
  'OMG this is amazing, love your work!',
  'This is exactly what I needed today',
  'Wow, didnt know that, thanks for the info!',
  'Love the vibe of your content 🔥',
  'Shared this with all my friends!',
];

// Random usernames for generated comments
const trollNames = [
  { author: 'DarkShadow99', handle: '@darkshadow99' },
  { author: 'ToxicAvenger', handle: '@toxic_avenger' },
  { author: 'RageBot', handle: '@ragebot_x' },
  { author: 'HateWatcher', handle: '@hatewatcher' },
  { author: 'TrollKing', handle: '@trollking420' },
  { author: 'AngryCritic', handle: '@angrycritic' },
  { author: 'BullyMaster', handle: '@bullymaster' },
  { author: 'VenomUser', handle: '@venomuser_' },
  { author: 'NightmareX', handle: '@nightmare_x' },
  { author: '黑粉001', handle: '@heifen001' },
  { author: '键盘侠', handle: '@keyboard_warrior' },
  { author: 'SpamLord', handle: '@spamlord9000' },
  { author: 'FakeNews24', handle: '@fakenews24' },
  { author: 'CancelCulture', handle: '@cancel_them' },
  { author: 'RatioKing', handle: '@ratio_king' },
];

const normalNames = [
  { author: 'Luna Park', handle: '@lunapark' },
  { author: 'Sam Carter', handle: '@samcarter_' },
  { author: 'Mia Zhang', handle: '@miazhang' },
  { author: 'Chris Dev', handle: '@chrisdev' },
  { author: 'Taylor Kim', handle: '@taylorkim' },
  { author: 'Jordan Lee', handle: '@jordanlee' },
  { author: 'Riley Cooper', handle: '@rileycooper' },
  { author: 'Morgan Fisher', handle: '@morganfisher' },
  { author: '小明同学', handle: '@xiaoming_' },
  { author: '快乐星球', handle: '@happystar' },
  { author: 'Avery James', handle: '@averyjames' },
  { author: 'Quinn Harper', handle: '@quinnharper' },
];

const timeLabels = [
  'just now',
  '1s ago',
  '2s ago',
  '5s ago',
  '10s ago',
  '15s ago',
  '30s ago',
  '1m ago',
];

let nextId = 1000;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a random tweet from the comment pool.
 * @param toxicRatio - probability [0,1] that the comment is toxic. Default 0.4
 */
export function generateRandomTweet(toxicRatio = 0.4): Tweet {
  const isToxic = Math.random() < toxicRatio;
  const id = `gen_${nextId++}`;

  if (isToxic) {
    const categories = Object.keys(toxicComments) as (keyof typeof toxicComments)[];
    const category = pick(categories);
    const text = pick(toxicComments[category]);
    const user = pick(trollNames);

    return {
      id,
      author: user.author,
      handle: user.handle,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.handle}`,
      text,
      timestamp: pick(timeLabels),
      likes: Math.floor(Math.random() * 5),
      retweets: Math.floor(Math.random() * 2),
      replies: Math.floor(Math.random() * 10),
    };
  }

  const text = pick(safeComments);
  const user = pick(normalNames);

  return {
    id,
    author: user.author,
    handle: user.handle,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.handle}`,
    text,
    timestamp: pick(timeLabels),
    likes: Math.floor(Math.random() * 100) + 5,
    retweets: Math.floor(Math.random() * 30),
    replies: Math.floor(Math.random() * 15),
  };
}

/**
 * Generate a burst of tweets (for crisis / defense mode).
 * Higher toxic ratio to simulate an attack wave.
 */
export function generateAttackBurst(count = 3): Tweet[] {
  return Array.from({ length: count }, () => generateRandomTweet(0.75));
}
