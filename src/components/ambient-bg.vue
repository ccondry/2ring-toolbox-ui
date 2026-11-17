<template>
  <svg
  class="ambient-bg"
  aria-hidden="true"
  viewBox="0 0 1920 1080"
  preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter
      id="ambient-blur-0"
      x="-386.5"
      y="533.75"
      width="2497"
      height="1393"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur" />
      </filter>
      <filter
      id="ambient-blur-1"
      x="-126.5"
      y="533.75"
      width="2497"
      height="1393"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur" />
      </filter>
      <radialGradient
      id="ambient-gradient-0"
      cx="0"
      cy="0"
      r="1"
      gradientTransform="matrix(851.5 3.61745e-05 22.1574 525.26 565.5 1339.75)"
      gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#30AACC" />
        <stop offset="1" stop-color="#0C1A56" />
      </radialGradient>
      <radialGradient
      id="ambient-gradient-1"
      cx="0"
      cy="0"
      r="1"
      gradientTransform="matrix(851.5 3.61745e-05 22.1574 525.26 825.5 1339.75)"
      gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#2C93E1" />
        <stop offset="1" stop-color="#80148C" />
      </radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="#0B1118" />
    <g opacity="0.5" filter="url(#ambient-blur-0)">
      <ellipse
      cx="862"
      cy="1230.25"
      rx="296.5"
      ry="848.5"
      transform="rotate(-90 862 1230.25)"
      fill="url(#ambient-gradient-0)"
      style="mix-blend-mode: color;"
      />
    </g>
    <g opacity="0.5" filter="url(#ambient-blur-1)">
      <ellipse
      cx="1122"
      cy="1230.25"
      rx="296.5"
      ry="848.5"
      transform="rotate(-90 1122 1230.25)"
      fill="url(#ambient-gradient-1)"
      style="mix-blend-mode: color;"
      />
    </g>
  </svg>
</template>

<style lang="scss">
.ambient-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
