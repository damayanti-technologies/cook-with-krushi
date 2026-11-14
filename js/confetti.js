/**
 * Cook With Krushi - Procedural Confetti Celebration
 * Pure HTML5 Canvas confetti animation for recipe completion.
 * Zero external libraries.
 */

const Confetti = (() => {
  let canvas = null;
  let ctx = null;
  let particles = [];
  let animationId = null;

  const COLORS = ['#55765C', '#294B35', '#F3D9C8', '#BD765B', '#F59E0B', '#E7EFE5', '#FFFFFF'];

  function initCanvas() {
    canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  function createParticles(count = 120) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 40,
        w: 8 + Math.random() * 6,
        h: 12 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vy: 2.5 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 2,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeCount = 0;
    particles.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.rotSpeed;

      if (p.y < canvas.height + 20) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      animationId = requestAnimationFrame(render);
    } else {
      stop();
    }
  }

  function start(count = 150) {
    if (!canvas) initCanvas();
    if (animationId) cancelAnimationFrame(animationId);
    createParticles(count);
    render();
  }

  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return {
    start,
    stop
  };
})();

window.Confetti = Confetti;
