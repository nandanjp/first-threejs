import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Tree } from "./Tree";
import { Backdrop, Shadow } from "@react-three/drei";

function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      castShadow
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export const Scene = () => {
  const refTree = useRef(null);

  useFrame(() => {
    const { current: group } = refTree;
    if (group) {
      group.rotation.x = group.rotation.y += 0.01;
    }
  });

  return (
    <>
      <Backdrop />
      <Shadow
        color="black"
        colorStop={0}
        opacity={0.5}
        fog={false} // Reacts to fog (default=false)
      />
      <ambientLight />
      <directionalLight
        color="white"
        position={[15, 15, 15]}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
      {/*<pointLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
  />*/}
      <Tree ref={refTree} />
      <Box position={[5, 5, 0]} />
      <Box position={[-5, 5, 0]} />
    </>
  );
};
