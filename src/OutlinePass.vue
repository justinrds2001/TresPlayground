<script setup lang="ts">
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { useLoop, useTresContext } from "@tresjs/core";
import { onMounted, watch } from "vue";
import { CustomBlending, Vector2 } from "three";
import { useTresStore } from "./store/store";

const { scene, renderer, camera } = useTresContext();
const { render } = useLoop();
const store = useTresStore();

let composer: EffectComposer;
let outlinePass: OutlinePass;

const initOutlinePass = () => {
	if (!camera.value) return;
	renderer.value.setSize(window.innerWidth, window.innerHeight);

	composer = new EffectComposer(renderer.value);

	const renderPass = new RenderPass(scene.value, camera.value);
	composer.addPass(renderPass);

	outlinePass = new OutlinePass(
		new Vector2(window.innerWidth, window.innerHeight),
		scene.value,
		camera.value
	);
	outlinePass.edgeStrength = 3.0;
	outlinePass.edgeGlow = 0.0;
	outlinePass.edgeThickness = 1.0;
	outlinePass.pulsePeriod = 1.0;
	outlinePass.visibleEdgeColor.set("#ff00ae");
	outlinePass.hiddenEdgeColor.set("#ff00ae");
	outlinePass.overlayMaterial.blending = CustomBlending;
	composer.addPass(outlinePass);

	const outputPass = new OutputPass();
	composer.addPass(outputPass);
};

render((/* { delta, elapsed } */) => {
	composer.render();
});

watch(
	() => store.object,
	(value) => {
		console.log("hmmm", value[0].children[0]);
		outlinePass.selectedObjects = [value[0].children[0]];
	},
	{}
);

onMounted(() => initOutlinePass());
</script>

<template></template>
