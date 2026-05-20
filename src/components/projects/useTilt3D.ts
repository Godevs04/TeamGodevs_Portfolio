import { useCallback, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const MAX_DEG = 5;
const SPRING = { stiffness: 280, damping: 28, mass: 0.6 };

export function useTilt3D(enabled = true) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, SPRING);
  const rotateYSpring = useSpring(rotateY, SPRING);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * MAX_DEG * 2);
      rotateX.set(-py * MAX_DEG * 2);
    },
    [enabled, rotateX, rotateY]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return {
    ref,
    rotateX: rotateXSpring,
    rotateY: rotateYSpring,
    onMouseMove,
    onMouseLeave,
  };
}
