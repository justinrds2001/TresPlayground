<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { TransformControls, OrbitControls, GLTFModel } from "@tresjs/cientos";
import { reactive, shallowRef, watch } from "vue";
import { Pane } from "tweakpane";
import { useTresStore } from "./store/store";
import OutlinePass from "./OutlinePass.vue";

const store = useTresStore();
const modelRef = shallowRef();
watch(modelRef, (value) => {
	store.object = value.instance.children;
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
	<TresCanvas clear-color="#5742f5" window-size render-mode="on-demand">
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
		<OutlinePass />
	</TresCanvas>
</template>

<style scoped></style>
