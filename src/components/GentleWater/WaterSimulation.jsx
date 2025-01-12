import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import {
  simulationVertexShader,
  simulationFragmentShader,
  renderVertexShader,
  renderFragmentShader,
} from "./shaders";

const WaterSimulation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    let frame = 0;

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(1, 1, options);
    let rtB = new THREE.WebGLRenderTarget(1, 1, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(1, 1) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });

    const resize = () => {
      const width = container.offsetWidth * window.devicePixelRatio;
      const height = container.offsetHeight * window.devicePixelRatio;

      renderer.setSize(container.offsetWidth, container.offsetHeight);
      rtA.setSize(width, height);
      rtB.setSize(width, height);
      simMaterial.uniforms.resolution.value.set(width, height);

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#fb7427";
      ctx.fillRect(0, 0, width, height);

      const isMobile = window.innerWidth < 768;
      const fontMultiplier = isMobile ? 0.15 : 0.25;
      const fontSize = Math.min(width, height) * fontMultiplier;

      ctx.fillStyle = "#fef4b8";
      ctx.font = `bold ${Math.round(fontSize)}px "Test Söhne"`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const centerX = width / 2;
      const centerY = height / 2;
      ctx.fillText("neer&cronin", centerX, centerY);

      const textTexture = new THREE.CanvasTexture(canvas);
      textTexture.minFilter = THREE.LinearFilter;
      textTexture.magFilter = THREE.LinearFilter;
      textTexture.format = THREE.RGBAFormat;
      renderMaterial.uniforms.textureB.value = textTexture;
    };

    const mouseMove = (e) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      mouse.x = (e.clientX - bounds.left) * window.devicePixelRatio;
      mouse.y = (bounds.height - (e.clientY - bounds.top)) * window.devicePixelRatio;
    };

    const mouseLeave = () => {
      mouse.set(0, 0);
    };

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      const temp = rtA;
      rtA = rtB;
      rtB = temp;

      requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    renderer.domElement.addEventListener("mousemove", mouseMove);
    renderer.domElement.addEventListener("mouseleave", mouseLeave);

    return () => {
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      simMaterial.dispose();
      renderMaterial.dispose();
      plane.dispose();
      container.removeChild(renderer.domElement);

      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("mousemove", mouseMove);
      renderer.domElement.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100vh", zIndex: 1 }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "start",
          backgroundColor: "rgba(0, 0, 0, 0)",
          color: "#fef4b8",
          padding: "1rem",
          paddingLeft: "2rem",
          fontFamily: "Test Söhne",
          marginBottom: "3rem",
          zIndex: 2,
        }}
      >
        <p
          style={{
            maxWidth: "40%",
            fontSize: "2.5rem",
            margin: 0,
            lineHeight: 1,
            ...(window.innerWidth <= 768 && {
              maxWidth: "80%",
              fontSize: "1.5rem",
              paddingLeft: "1rem",
            }),
            ...(window.innerWidth <= 480 && {
              maxWidth: "90%",
              fontSize: "1.2rem",
              paddingLeft: "0.5rem",
            }),
          }}
        >
          We build beautiful, functional websites that help businesses grow and
          stand out with the best online.
        </p>
      </div>
    </div>
  );
};

export default WaterSimulation;
