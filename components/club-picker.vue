<template>
  <Listbox v-model="selectedClubs" multiple>
    <div class="relative w-64">
      <ListboxButton
        class="flex justify-between w-full cursor-pointer rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm"
      >
        <span class="flex gap-2">
          <template v-if="selectedClubs.length > 0">
            <div
              v-for="(club, index) in selectedClubs"
              class="h-5 flex items-center bg-slate-500 text-white rounded-full gap-1 p-2"
            >
              <span class="text-xs">{{ club }}</span>
              <XIcon
                @click.prevent="selectedClubs.splice(index, 1)"
                class="h-3 w-3"
              ></XIcon>
            </div>
          </template>
          <template v-else>Filter by club...</template>
        </span>
        <div class="flex">
          <span class="pointer-events-none flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </span>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="club in clubs"
            :key="club"
            :value="club"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-indigo-100 text-indigo-900' : 'text-slate-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ club }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { IClub, clubs } from "~~/types/IClub";

const selectedClubs = ref<IClub[]>([]);

const emit = defineEmits<{
  (e: "update:modelValue", clubs: IClub[]): void;
}>();

watch(
  () => selectedClubs.value,
  () => {
    emit("update:modelValue", selectedClubs.value);
  }
);
</script>
