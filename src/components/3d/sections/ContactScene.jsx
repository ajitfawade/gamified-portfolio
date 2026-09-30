import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import { useGameStore } from '@/store/useGameStore';
import confetti from 'canvas-confetti';

export default function ContactScene({ position }) {
  const monolithRef = useRef();
  const portalRef = useRef();
  
  // Connect directly to the central Zustand game engine state parameters
  const submitAnswer = useGameStore((state) => state.submitQuizAnswer);
  const verifyVictory = useGameStore((state) => state.verifyBossDefeated);
  const quizAnswers = useGameStore((state) => state.quizAnswers);
  const bossDefeated = useGameStore((state) => state.bossDefeated);

  const [activeQuestion, setActiveQuestion] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Low-poly floating rotation matrix for the main Quiz Monolith structure
    if (monolithRef.current) {
      monolithRef.current.position.y = Math.sin(time * 1.2) * 0.15;
      monolithRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
    }

    // Spin the glowing interdimensional backend data gateway if unlocked
    if (portalRef.current && bossDefeated) {
      portalRef.current.rotation.z = time * 0.8;
      portalRef.current.scale.x = THREE.MathUtils.lerp(portalRef.current.scale.x, 1, 0.05);
      portalRef.current.scale.y = THREE.MathUtils.lerp(portalRef.current.scale.y, 1, 0.05);
    }
  });

  const handleSelection = (questionId, optionKey) => {
    submitAnswer(questionId, optionKey);

    if (activeQuestion < 2) {
      setActiveQuestion(prev => prev + 1);
    } else {
      // Force store engine checking validation sequence mapping profiles
      // Wait briefly for state updates to catch up before running the victory check
      setTimeout(() => {
        verifyVictory();
        // Trigger explosive victory confetti cascade bursts on successful decryption
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }, 50);
    }
  };

  return (
    <group position={position}>
      {/* Stage Backdrop Matrix Identification Tags */}
      <Text
        position={[0, 4.8, -4]}
        fontSize={0.5}
        color={bossDefeated ? '#10b981' : '#ef4444'}
        font="https://gstatic.com"
        anchorX="center"
      >
        {bossDefeated ? 'STAGE CLEAR: VICTORY' : 'FINAL BOSS: DECIDEX MONOLITH'}
      </Text>

      {/* 1. THE QUIZ MONOLITH CHASSIS STRUCTURE */}
      {!bossDefeated && (
        <group ref={monolithRef}>
          <mesh castShadow receiveShadow position={[0, 1.8, 0]}>
            <boxGeometry args={[3.2, 2.4, 0.4]} />
            <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.9} />
          </mesh>
          
          {/* Neon Frame Accents ringing the structural container block */}
          <mesh position={[0, 1.8, 0.21]}>
            <boxGeometry args={[3.3, 2.5, 0.02]} />
            <meshStandardMaterial color="#ef4444" wireframe emissive="#ef4444" emissiveIntensity={0.4} />
          </mesh>

          {/* 3D Monolith UI Overlay Layer Display Framework */}
          <Html
            transform
            occlude
            distanceFactor={2.2}
            position={[0, 1.8, 0.22]}
            className="w-[420px] h-[300px] bg-zinc-950/95 text-zinc-100 font-mono select-none p-5 flex flex-col justify-between border border-red-500/30 rounded shadow-[0_0_30px_rgba(239,68,68,0.15)] pointer-events-none"
          >
            {activeQuestion === 1 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-[10px] text-red-500 font-bold tracking-widest uppercase mb-1">SECURITY CHALLENGE 01/02</div>
                  <h3 className="text-sm font-bold text-zinc-200 leading-snug">Which hook is engineered to memorize computed calculations securely across standard React render sweeps?</h3>
                </div>
                <div className="space-y-2 pointer-events-auto">
                  <button onClick={() => handleSelection('question1', 'correct_a')} className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs hover:bg-red-500/20 hover:border-red-500 transition-colors uppercase tracking-wide cursor-pointer">&gt; useMemo()</button>
                  <button onClick={() => handleSelection('question1', 'wrong_b')} className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs hover:bg-red-500/20 hover:border-red-500 transition-colors uppercase tracking-wide cursor-pointer">&gt; useEffect()</button>
                  <button onClick={() => handleSelection('question1', 'wrong_c')} className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs hover:bg-red-500/20 hover:border-red-500 transition-colors uppercase tracking-wide cursor-pointer">&gt; useCallback()</button>
                </div>
              </div>
            )}

            {activeQuestion === 2 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-[10px] text-red-500 font-bold tracking-widest uppercase mb-1">SECURITY CHALLENGE 02/02</div>
                  <h3 className="text-sm font-bold text-zinc-200 leading-snug">What underlying technology enables React Three Fiber components to translate JSX components into pure WebGL commands?</h3>
                </div>
                <div className="space-y-2 pointer-events-auto">
                  <button onClick={() => handleSelection('question2', 'wrong_a')} className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs hover:bg-red-500/20 hover:border-red-500 transition-colors uppercase tracking-wide cursor-pointer">&gt; Canvas 2D API</button>
                  <button onClick={() => handleSelection('question2', 'correct_b')} className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs hover:bg-red-500/20 hover:border-red-500 transition-colors uppercase tracking-wide cursor-pointer">&gt; Three.js Engine Renderer</button>
                  <button onClick={() => handleSelection('question2', 'wrong_c')} className="w-full text-left p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs hover:bg-red-500/20 hover:border-red-500 transition-colors uppercase tracking-wide cursor-pointer">&gt; Vanilla CSS 3D Transforms</button>
                </div>
              </div>
            )}
          </Html>
        </group>
      )}

      {/* 2. THE REWARD GATEWAY (GLOWING COSMIC CONTACT FORMS) */}
      {bossDefeated && (
        <group position={[0, 1.8, -0.5]}>
          {/* Visual Torus Ring representing the portal mesh loop boundary walls */}
          <mesh ref={portalRef} scale={[0.1, 0.1, 0.1]} castShadow>
            <torusGeometry args={[2.2, 0.1, 16, 100]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} roughness={0.1} />
          </mesh>

          {/* Contact Node HTML Form Panel Material Portal Layer */}
          <Html
            transform
            distanceFactor={2.2}
            position={[0, 0, 0.1]}
            className="w-[380px] h-[320px] bg-zinc-900/90 text-zinc-100 font-mono p-5 border border-emerald-500/40 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-md flex flex-col justify-between"
          >
            {!formSubmitted ? (
              <form 
                onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                className="flex flex-col h-full justify-between pointer-events-auto"
              >
                <div className="space-y-3">
                  <div className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">🔓 ENCRYPTION BROKEN — COMPOSE MESSAGE</div>
                  <input type="text" required placeholder="YOUR IDENTITY (NAME)" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 uppercase" />
                  <input type="email" required placeholder="COMMUNICATIONS LINK (EMAIL)" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500" />
                  <textarea required rows="3" placeholder="TRANSMISSION DATA (MESSAGE)" className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 resize-none uppercase" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-emerald-500 text-zinc-950 font-bold text-xs uppercase rounded hover:bg-emerald-400 transition-colors tracking-widest cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  DISPATCH SIGNAL &gt;
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 animate-fade-in">
                <div className="text-3xl">🚀</div>
                <div className="text-xs font-bold text-emerald-400 tracking-widest uppercase">TRANSMISSION COMPLETELY DISPATCHED</div>
                <p className="text-[10px] text-zinc-400 max-w-[280px] leading-relaxed">Your message has bypassed security containment zones successfully. The Dev will reply shortly via sub-space relays.</p>
                <button onClick={() => { useGameStore.getState().resetGame(); }} className="mt-2 text-[9px] pointer-events-auto underline text-zinc-500 hover:text-zinc-300 uppercase tracking-widest cursor-pointer">Replay Mission Track</button>
              </div>
            )}
          </Html>
        </group>
      )}

      {/* Arena Stage Floor Matrix Plane Meshes */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -5]} receiveShadow>
            <planeGeometry args={[20, 30]} />
            <meshStandardMaterial color="#09090b" roughness={0.8} />
        </mesh>
    </group>
  );
}