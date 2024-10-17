import { defineStore } from "pinia";
import { Object3D } from "three";
import { ref } from "vue";
export const useTresStore = defineStore("tres", () => {
	const object = ref<Object3D[]>([]);
	return {
		object,
	};
});
