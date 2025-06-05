import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getEarthTextureUrl } from './EarthTexture';

interface GlobeProps {
  className?: string;
}

export const Globe: React.FC<GlobeProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<{
    scene: any;
    renderer: any;
    camera: any;
    globe: any;
    animationId: number | null;
  }>({ scene: null, renderer: null, camera: null, globe: null, animationId: null });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Only import Three.js on the client side
    const initGlobe = async () => {
      if (typeof window !== 'undefined') {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        
        // Setup scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2;

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          alpha: true,
          antialias: true
        });
        renderer.setSize(400, 400);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Add OrbitControls for interactive rotation
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.enableZoom = true;
        controls.minDistance = 1.5;
        controls.maxDistance = 4;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Create globe with reduced segment count for better performance
        const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);
        
        // Create texture with Earth map using our React component
        const textureLoader = new THREE.TextureLoader();
        // Use a grey colored Earth texture
        const earthTextureUrl = '/earth-texture.svg';
        // Apply grey color to the texture
        const material = new THREE.MeshPhongMaterial({
          map: textureLoader.load(earthTextureUrl),
          color: 0x1a1a40,      // Dark blue base color
          emissive: 0x6d28d9,    // Purple emissive glow
          emissiveIntensity: 0.7, // Emissive intensity for better texture visibility
          bumpScale: 0.1,
          specular: new THREE.Color('grey'),
          shininess: 5
        });
        const earthTexture = textureLoader.load(earthTextureUrl);
        
        // Create a base material with a dark blue color
        const material = new THREE.MeshPhongMaterial({
          map: earthTexture,
          color: 0x1a1a40,      // Dark blue base color
          emissive: 0x6d28d9,    // Purple emissive glow
          emissiveIntensity: 0.7, // Further increased emissive intensity for better texture visibility
          shininess: 60, // Increased shininess for better texture reflection
          transparent: true,
          opacity: 0.9 // Increased opacity to make the landmasses more visible
        });
        
        // Make the texture more visible
        earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        earthTexture.needsUpdate = true;
        // Enhance texture visibility
        earthTexture.minFilter = THREE.LinearFilter;
        earthTexture.magFilter = THREE.LinearFilter;
        
        const globe = new THREE.Mesh(sphereGeometry, material);
        scene.add(globe);

        // Add country outlines (wireframe overlay) with reduced segment count
        const wireframeGeometry = new THREE.SphereGeometry(1.001, 36, 36);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x6d28d9, // Purple wireframe to match the image
          wireframe: true,
          transparent: true,
          opacity: 0.2 // Further decreased opacity for less prominent mesh
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        scene.add(wireframe);
        
        // Add a second wireframe for the glowing effect with reduced segment count
        const outerWireframeGeometry = new THREE.SphereGeometry(1.01, 24, 24);
        const outerWireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x22d3ee, // Cyan color for outer wireframe
          wireframe: true,
          transparent: true,
          opacity: 0.15
        });
        const outerWireframe = new THREE.Mesh(outerWireframeGeometry, outerWireframeMaterial);
        scene.add(outerWireframe);

        // Add connection points (random points on the globe)
        const pointsGroup = new THREE.Group();
        scene.add(pointsGroup);

        // Store point positions for connections
        const pointPositions: THREE.Vector3[] = [];

        // Create 25 random points on the globe - increased number of points
        for (let i = 0; i < 25; i++) {
          const phi = Math.acos(-1 + (2 * i) / 20);
          const theta = Math.sqrt(20 * Math.PI) * phi;
          
          const x = Math.sin(phi) * Math.cos(theta) * 1.02;
          const y = Math.sin(phi) * Math.sin(theta) * 1.02;
          const z = Math.cos(phi) * 1.02;
          
          const pointGeometry = new THREE.SphereGeometry(0.015, 8, 8); // Increased size of connection points
          const pointMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x6d28d9 : 0x22d3ee 
          });
          const point = new THREE.Mesh(pointGeometry, pointMaterial);
          
          point.position.set(x, y, z);
          pointsGroup.add(point);
          pointPositions.push(new THREE.Vector3(x, y, z));
        }

        // Create connections between random points
        const connectionsGroup = new THREE.Group();
        scene.add(connectionsGroup);

        // Create connection lines with animation data
        const connectionLines: { line: THREE.Line; initialOpacity: number; animationOffset: number }[] = [];
        
        // Create 20 random connections - increased number of connections
        for (let i = 0; i < 20; i++) {
          const startPointIndex = Math.floor(Math.random() * pointPositions.length);
          let endPointIndex = Math.floor(Math.random() * pointPositions.length);
          
          // Ensure we don't connect a point to itself
          while (endPointIndex === startPointIndex) {
            endPointIndex = Math.floor(Math.random() * pointPositions.length);
          }
          
          const startPoint = pointPositions[startPointIndex];
          const endPoint = pointPositions[endPointIndex];
          
          // Create a curved line between points
          const startVec = new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z);
          const endVec = new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z);
          
          // Calculate a midpoint that's elevated from the surface to create a more dramatic arc
          const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
          midVec.normalize().multiplyScalar(1.8); // Push it further out from the center for even bigger trajectory
          
          // Create a quadratic bezier curve
          const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
          
          // Sample more points along the curve for smoother arcs
          const points = curve.getPoints(25);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          // Create a line with gradient material - enhanced visibility
          const material = new THREE.LineBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x6d28d9 : 0x22d3ee,
            transparent: true,
            opacity: 1.0, // Maximum opacity for very prominent lines
            linewidth: 5.0 // Significantly increased line width for maximum visibility
          });
          
          const line = new THREE.Line(geometry, material);
          connectionsGroup.add(line);
          
          // Store the line with animation data - enhanced animation parameters
          connectionLines.push({
            line,
            initialOpacity: 0.7 + Math.random() * 0.3, // Even higher random base opacity for maximum visibility
            animationOffset: Math.random() * Math.PI * 2 // Random animation phase
          });
        }

        // Add ambient light - darker ambient for more contrast
        const ambientLight = new THREE.AmbientLight(0x101025, 0.5);
        scene.add(ambientLight);

        // Add directional light - reduced intensity for more dramatic effect
        const directionalLight = new THREE.DirectionalLight(0x6d28d9, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Add point lights for highlights - increased intensity for the purple glow
        const pointLight1 = new THREE.PointLight(0x6d28d9, 2, 10);
        pointLight1.position.set(2, 1, 2);
        scene.add(pointLight1);

        // Add cyan point light for contrast
        const pointLight2 = new THREE.PointLight(0x22d3ee, 1.5, 10);
        pointLight2.position.set(-2, -1, 2);
        scene.add(pointLight2);
        
        // Add a third point light for additional glow
        const pointLight3 = new THREE.PointLight(0x6d28d9, 1, 15);
        pointLight3.position.set(0, 2, -3);
        scene.add(pointLight3);

        // Store references
        globeRef.current = {
          scene,
          renderer,
          camera,
          globe,
          animationId: null
        };

        // Animation loop
        const animate = () => {
          if (!globeRef.current) return;
          
          // Update controls
          controls.update();
          
          // Animate connection lines with enhanced visual effects
          const time = Date.now() * 0.001; // Current time in seconds
          connectionLines.forEach(({ line, initialOpacity, animationOffset }) => {
            // Create pulsing effect with sine wave - further increased animation speed and range for more dramatic activity
            const opacity = initialOpacity * (0.4 + 0.6 * Math.sin(time * 2.0 + animationOffset));
            (line.material as THREE.LineBasicMaterial).opacity = opacity;
            
            // Animate line width for additional activity visualization - significantly enhanced effect
            (line.material as THREE.LineBasicMaterial).linewidth = 2.5 + Math.sin(time * 1.5 + animationOffset) * 1.5;
          });
          
          // Render scene
          renderer.render(scene, camera);
          globeRef.current.animationId = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          if (!canvasRef.current || !globeRef.current) return;
          
          const container = canvasRef.current.parentElement;
          if (!container) return;
          
          const width = container.clientWidth;
          const height = container.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          controls.dispose();
        };
      }
    };

    initGlobe();

    return () => {
      if (globeRef.current && globeRef.current.animationId) {
        cancelAnimationFrame(globeRef.current.animationId);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className={`relative w-full h-full ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          background: 'transparent',
        }}
      />
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-3xl -z-10"></div>
      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl -z-10 scale-110"></div>
      
      {/* Interactive hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-neutral-400 opacity-70 pointer-events-none">
        Drag to rotate • Scroll to zoom
      </div>
    </motion.div>
  );
};