"use client";

import { useEffect, useRef } from "react";

/**
 * Το ψηφιδωτό του hero: εκατοντάδες ψηφίδες που «προσγειώνονται» στη θέση τους
 * και αντιδρούν στον κέρσορα. Φορτώνει το three.js μόνο στον browser, μόνο όταν
 * το hero είναι ορατό, και σέβεται το prefers-reduced-motion.
 */
export default function Mosaic({ heroId }: { heroId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = document.getElementById(heroId);
    if (!canvas || !hero) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      /**
       * Το ψηφιδωτό σχεδιάστηκε σε three r128, πριν το αυτόματο color management.
       * Το κρατάμε απενεργοποιημένο ώστε οι ψηφίδες να έχουν ακριβώς τον ίδιο
       * απαλό τόνο με το αρχικό σχέδιο — αλλιώς βγαίνουν αισθητά πιο σκούρες.
       */
      THREE.ColorManagement.enabled = false;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: import("three").WebGLRenderer | undefined;
      let scene: import("three").Scene;
      let camera: import("three").PerspectiveCamera;
      let mesh: import("three").InstancedMesh | undefined;
      let dummy: import("three").Object3D;
      let count = 0;

      type Vec = { x: number; y: number; z: number };
      type Start = Vec & { rx: number; ry: number; rz: number };

      let targets: Vec[] = [];
      let starts: Start[] = [];
      let delays: number[] = [];
      let phases: number[] = [];

      let halfW = 0;
      let halfH = 0;
      let startTime = 0;
      let running = false;
      let built = false;
      let scrollP = 0;
      const ptr = { x: 999, y: 999, tx: 999, ty: 999 };

      function roundedTile() {
        const s = 0.5;
        const r = 0.23;
        const shape = new THREE.Shape();
        shape.moveTo(-s + r, -s);
        shape.lineTo(s - r, -s);
        shape.quadraticCurveTo(s, -s, s, -s + r);
        shape.lineTo(s, s - r);
        shape.quadraticCurveTo(s, s, s - r, s);
        shape.lineTo(-s + r, s);
        shape.quadraticCurveTo(-s, s, -s, s - r);
        shape.lineTo(-s, -s + r);
        shape.quadraticCurveTo(-s, -s, -s + r, -s);
        const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: false });
        geo.center();
        return geo;
      }

      function build() {
        const w = hero!.clientWidth;
        const h = hero!.clientHeight;
        if (!w || !h) return;

        if (mesh) {
          mesh.geometry.dispose();
          (mesh.material as import("three").Material).dispose();
          scene?.remove(mesh);
        }

        if (!renderer) {
          try {
            renderer = new THREE.WebGLRenderer({ canvas: canvas!, antialias: true, alpha: true });
          } catch {
            return; // χωρίς WebGL μένει το διακριτικό μοτίβο του CSS
          }
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setSize(w, h, false);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xf5efe6, 20, 34);
        camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 60);
        camera.position.set(0, 0.7, 17);
        camera.lookAt(0, 0.2, 0);

        scene.add(new THREE.HemisphereLight(0xffffff, 0xcdbfa9, 0.95));
        const dir = new THREE.DirectionalLight(0xffffff, 0.65);
        dir.position.set(5, 7, 9);
        scene.add(dir);

        halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        halfW = halfH * camera.aspect;

        let pitch = w < 640 ? 1.55 : 1.2;
        let cols = Math.ceil((2 * halfW) / pitch) + 2;
        let rows = Math.ceil((2 * halfH) / pitch) + 2;
        count = cols * rows;
        if (count > 820) {
          pitch *= Math.sqrt(count / 820);
          cols = Math.ceil((2 * halfW) / pitch) + 2;
          rows = Math.ceil((2 * halfH) / pitch) + 2;
          count = cols * rows;
        }

        mesh = new THREE.InstancedMesh(
          roundedTile(),
          new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.06, transparent: true }),
          count,
        );
        dummy = new THREE.Object3D();
        targets = [];
        starts = [];
        delays = [];
        phases = [];

        const petrol = new THREE.Color("#1E4E5A");
        const terra = new THREE.Color("#D96C4F");
        const c = new THREE.Color();
        let i = 0;

        for (let r0 = 0; r0 < rows; r0++) {
          for (let c0 = 0; c0 < cols; c0++) {
            const x = (c0 - (cols - 1) / 2) * pitch;
            const y = (r0 - (rows - 1) / 2) * pitch;
            targets.push({ x, y, z: (Math.random() - 0.5) * 0.4 });

            const a = Math.random() * Math.PI * 2;
            const b = Math.acos(2 * Math.random() - 1);
            const rad = 22 + Math.random() * 10;
            starts.push({
              x: Math.sin(b) * Math.cos(a) * rad,
              y: Math.sin(b) * Math.sin(a) * rad,
              z: Math.cos(b) * rad * 0.6 - 6,
              rx: (Math.random() - 0.5) * 3,
              ry: (Math.random() - 0.5) * 3,
              rz: (Math.random() - 0.5) * 3,
            });

            delays.push(Math.hypot(x, y) * 0.055 + Math.random() * 0.35);
            phases.push(Math.random() * Math.PI * 2);

            if (Math.random() < 0.055) {
              c.copy(terra).offsetHSL(0, 0, (Math.random() - 0.5) * 0.05);
            } else {
              c.copy(petrol).offsetHSL(0, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.11);
            }
            mesh.setColorAt(i, c);
            i++;
          }
        }

        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        scene.add(mesh);
        built = true;
        canvas!.classList.add("opacity-100");
        startTime = performance.now();

        if (reduced) {
          setFrame(startTime + 1e9);
          renderer.render(scene, camera);
          return;
        }
        running = true;
        requestAnimationFrame(loop);
      }

      const easeOut = (e: number) => 1 - Math.pow(1 - e, 3);

      function setFrame(now: number) {
        if (!mesh) return;
        const t = (now - startTime) / 1000;
        ptr.x += (ptr.tx - ptr.x) * 0.12;
        ptr.y += (ptr.ty - ptr.y) * 0.12;
        const spread = 1 + scrollP * 0.55;

        for (let i = 0; i < count; i++) {
          const e = Math.min(Math.max((t - delays[i]) / 1.5, 0), 1);
          const k = easeOut(e);
          const tg = targets[i];
          const st = starts[i];

          const x = st.x + (tg.x - st.x) * k;
          const y = st.y + (tg.y - st.y) * k;
          let z = st.z + (tg.z - st.z) * k;

          z += Math.sin(t * 0.9 + phases[i]) * 0.09 * k; /* ανάσα */
          let rz = st.rz + (0.1745 - st.rz) * k + Math.sin(t * 0.7 + phases[i]) * 0.03 * k;
          const rx = st.rx * (1 - k);
          const ry = st.ry * (1 - k);

          /* απώθηση από τον κέρσορα */
          const dx = tg.x - ptr.x;
          const dy = tg.y - ptr.y;
          const d = Math.hypot(dx, dy);
          let f = Math.max(0, 1 - d / 3.2);
          f *= f * k;
          z += f * 1.15;
          rz += f * 0.5;

          dummy.position.set(x * spread, y * spread, z);
          dummy.rotation.set(rx, ry, rz);
          dummy.scale.setScalar(1 + f * 0.13);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        (mesh.material as import("three").MeshStandardMaterial).opacity = Math.max(
          0,
          1 - scrollP * 1.15,
        );
        camera.position.z = 17 + scrollP * 5;
      }

      function loop(now: number) {
        if (!running) return;
        if (scrollP < 1 && !document.hidden && renderer) {
          setFrame(now);
          renderer.render(scene, camera);
        }
        requestAnimationFrame(loop);
      }

      const onPointerMove = (e: PointerEvent) => {
        const r = hero!.getBoundingClientRect();
        ptr.tx = (((e.clientX - r.left) / r.width) * 2 - 1) * halfW;
        ptr.ty = -(((e.clientY - r.top) / r.height) * 2 - 1) * halfH;
      };
      const onPointerLeave = () => {
        ptr.tx = 999;
        ptr.ty = 999;
      };
      const onScroll = () => {
        scrollP = Math.min(window.scrollY / (hero!.offsetHeight * 0.9), 1);
      };

      let rto: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(rto);
        rto = setTimeout(() => {
          if (built) {
            running = false;
            build();
          }
        }, 300);
      };

      hero!.addEventListener("pointermove", onPointerMove);
      hero!.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      const heroIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (built && !reduced && !running) {
              running = true;
              requestAnimationFrame(loop);
            }
          } else {
            running = false;
          }
        });
      });
      heroIO.observe(hero!);

      build();

      cleanup = () => {
        running = false;
        clearTimeout(rto);
        heroIO.disconnect();
        hero!.removeEventListener("pointermove", onPointerMove);
        hero!.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        if (mesh) {
          mesh.geometry.dispose();
          (mesh.material as import("three").Material).dispose();
        }
        renderer?.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [heroId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[900ms] ease-out"
    />
  );
}
