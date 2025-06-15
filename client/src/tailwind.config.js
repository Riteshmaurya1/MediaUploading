module.exports = {
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
};
