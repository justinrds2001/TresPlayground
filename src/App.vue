<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { TransformControls, OrbitControls, GLTFModel } from "@tresjs/cientos";
import { computed, reactive, shallowRef, watch } from "vue";
import { Object3D } from "three";
import { Pane } from "tweakpane";
import { EffectComposer, Outline } from "@tresjs/post-processing";

const modelRef = shallowRef();
watch(modelRef, (value) => {
	console.log(value.instance.children);
});
const state = reactive({
	edit: false,
	mode: "translate",
});

const pane = new Pane();
pane.addBinding(state, "edit");
pane.addBinding(state, "mode", {
	options: {
		Translate: "translate",
		Rotate: "rotate",
		Scale: "scale",
	},
});
</script>

<template>
	<TresCanvas window-size render-mode="on-demand">
		<TresPerspectiveCamera />
		<OrbitControls make-default />
		<TransformControls
			v-if="modelRef && state.edit"
			:mode="state.mode"
			:object="modelRef.instance"
		/>
		<Suspense>
			<GLTFModel
				@click="() => console.log('Hi')"
				ref="modelRef"
				path="/model.glb"
				draco
			/>
		</Suspense>
		<TresAmbientLight :intensity="1" />
		<TresGridHelper />
	</TresCanvas>
</template>

<style scoped></style>
