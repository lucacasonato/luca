module.exports = {
  theme: 'portfolio',

  themeConfig: {
    style: 'dark',
    projects: 'pinned-repos',
    github: 'lucacasonato',
    twitter: 'lcasdev',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'About',
        link: '/about',
      },
    ],
    skills: [
      {
        topic: 'go',
        description: `Go is my goto backend language.`,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Go_Logo_Aqua.svg/1280px-Go_Logo_Aqua.svg.png',
      },
      {
        topic: 'javascript',
        description: `Who can live without JavaScript?`,
      },
      {
        topic: 'react',
        description: `React + Hooks = ❤️`,
      },
      {
        topic: 'flutter',
        description: `Need a mobile app? We'll make one in Flutter!`,
      },
      {
        topic: 'vscode',
        description: `VSCode: the most complete IDE around.`,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/1200px-Visual_Studio_Code_1.18_icon.svg.png',
      },
      {
        topic: 'firebase',
        description: `Firebase helps us realize time sensitve projects.`,
      },
    ],
  },

  permalinks: {
    page: '/:slug',
    post: '/posts/:slug',
  },

  plugins: [
    {
      resolve: 'saber-plugin-query-posts',
    },
  ],
};
