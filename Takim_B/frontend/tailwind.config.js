module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      borderRadius: {
        'full': '50%', // Yuvarlak bir daire için %50
        'egik': '10%',
      },
      colors: {
        darkBackground: '#1E1E2E',
        primary: '#4A4A6A',
        secondary: '#ACACBA',
        lightBackground: '#FFFFFF',
        button: '#37A849',
        buttonHover: '#267533',
        darkText: '000000',
        dark_Background_ctgry: '#002D4ECC',
        light_Background_ctgr: '#4A4A6A',
        light_Background: 'background: #474766',
        light_div: '#335771',
        log_out: '#8B8484',
        text_lgn: '#4A4A6A',
        lgn_kyt: '#294DCA',
        'green_a': '#009f59',
        'cinder': '#222D32',
        'blue': '#00C0FF',
        'pink': '#FF1493',
        'yellow': '#FFA500',
      },
    },
  },
  plugins: [],
};

