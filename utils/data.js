const usernames = [
    'SapphireGlider92',
    'ThunderPanda7',
    'NeonJazz123',
    'LunarWhisperer',
    'MysticPhoenix45',
    'VelvetVortex88',
    'CosmicExplorer',
    'EpicNebula21',
    'GalacticPenguin',
    'AstralHarmony',
    'ShadowSerenade',
    'InfiniteDreamer',
    'EnigmaSphinx',
    'CelestialNomad',
    'QuantumQuasar',
    'SolarFlareDragon',
    'StellarAdventurer',
    'NebulaJester',
    'CrypticVoyager',
]

const thoughts = [
    'Embrace the uncertainty of tomorrow.',
    'Find joy in the little things.',
    'Life is a journey, not a destination.',
    'Create your own sunshine on a cloudy day.',
    'Kindness is a language that the deaf can hear and the blind can see.',
    'Chase your dreams, but don’t forget to enjoy the scenery along the way.',
    'Sometimes the best therapy is a long drive and good music.',
    'In the dance of life, your heart is the rhythm, and your soul is the melody.',
    'Don’t count the days; make the days count.',
    'The more you give, the more you receive.',
    'Let go of what you can’t control.',
    'Your vibe attracts your tribe.',
    'Believe you can, and you’re halfway there.',
    'Life is short, smile while you still have teeth.',
    'Take a moment to appreciate how far you’ve come.',
    'Every sunrise is an invitation to brighten someone’s day.',
    'Love without limits, forgive without regrets.',
    'Happiness is not a destination; it is a way of life.',
    'The best is yet to come.',
    'Do more things that make you forget to check your phone.',
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length )];

const getRandomUser = () => `${getRandomArrItem(usernames)}`;

const getRandomThought = () => `${getRandomArrItem(thoughts)}`;

module.exports = { getRandomUser, getRandomThought };