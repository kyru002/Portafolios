<template>
  <div class="section-divider" aria-hidden="true">
    <div class="divider-wrap">
      <div class="divider-line">
        <span class="divider-dot" />
        <span class="divider-glow" />
      </div>

      <div class="divider-points">
        <span class="point point-a" />
        <span class="point point-b" />
        <span class="point point-c" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-divider {
  position: relative;
  padding: 72px 0;
  overflow: hidden;
}

.divider-wrap {
  width: min(1100px, 100%);
  margin: 0 auto;
}

.divider-line {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.24), transparent);
  overflow: hidden;
}

.divider-dot,
.divider-glow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  animation: travel 2.4s cubic-bezier(.2,.9,.28,1) infinite;
}

.divider-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(99,102,241,0.18);
  transform-origin: center;
}

.divider-glow {
  width: 160px;
  height: 44px;
  border-radius: 999px;
  filter: blur(18px);
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.42), rgba(168,85,247,0.38), rgba(236, 72, 153, 0.38));
  opacity: 0.95;
}

.divider-points {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
}

.point {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  animation: pulse 1.6s ease-in-out infinite;
}

.point-a {
  background: rgba(59, 130, 246, 0.6);
}

.point-b {
  background: rgba(168, 85, 247, 0.6);
  animation-delay: 0.5s;
}

.point-c {
  background: rgba(236, 72, 153, 0.6);
  animation-delay: 1s;
}

@keyframes travel {
  0% { left: -6%; transform: translateY(-50%) scale(0.9); opacity: 0.6; }
  20% { transform: translateY(-52%) scale(1.05); opacity: 1; }
  60% { transform: translateY(-48%) scale(1.02); }
  100% { left: 106%; transform: translateY(-50%) scale(0.9); opacity: 0.55; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.8); opacity: 1; }
}
</style>
