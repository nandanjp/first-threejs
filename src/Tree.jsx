import React, { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RedFormat, DataTexture } from "three";
import { Sky } from "@react-three/drei";
import { Color, Vector3 } from "three";
import { ToonShader } from "./ToonShader";
import * as SimpleShader from "./SimpleShader";

export const Tree = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/trees.glb");
  //   const toneMap = useMemo(() => {
  //     const format = RedFormat;
  //     const colors = new Uint8Array(4);
  //     for (let c = 0; c <= colors.length; ++c) {
  //       colors[c] = (c / colors.length) * 256;
  //     }
  //     const gradientMap = new DataTexture(colors, colors.length, 1, format);
  //     gradientMap.needsUpdate = true;
  //     return gradientMap;
  //   }, []);

  const uniforms = useMemo(() => {
    return {
      ...ToonShader.uniforms,
      uBaseColor: { value: new Color("#49897C") },
      uAmbientLightColor: { value: new Color("#050505") },
      uDirLightColor: { value: new Color("white") },
      uDirLightPos: { value: new Vector3(15, 15, 15) },
      uLineColor1: { value: new Color("#808080") },
      uLineColor2: { value: new Color("black") },
    };
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
        {...props}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        position={[0.33, -0.05, -0.68]}
      />
      {/*<meshToonMaterial gradientMap={toneMap} color={"#234549"} />*/}
      <shaderMaterial attach="material" {...ToonShader} uniforms={uniforms} />
    </group>
  );
});

useGLTF.preload("/trees.glb");
