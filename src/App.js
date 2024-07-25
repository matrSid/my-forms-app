// src/App.js
import React, { useEffect } from 'react';
import Form from './form';
import './App.css'; // Import CSS for overall app styling

function App() {
  useEffect(() => {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const numParticles = 100;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Initialize canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(0, 0, 0, 0.5)';
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    function init() {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvasWidth, Math.random() * canvasHeight));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    function handleMouseMove(event) {
      const x = event.x;
      const y = event.y;
      particles.push(new Particle(x, y));
    }

    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <canvas id="backgroundCanvas" className="canvas-container"></canvas>
      <h1 className="main-heading">Welcome to Annual Exhibition</h1>
      <h1 className="sub-heading">Knowledge Kaleidoscope.</h1>
      <Form />
    </div>
  );
}

export default App;
