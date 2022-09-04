<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="max-w-7xl px-4 md:px-8 mx-auto">
      <header class="flex justify-between items-center mb-8">
        <span
          class="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
          aria-label="logo"
        >
          <span>⚽</span>
          FantasyFootballPro
        </span>
      </header>
      <div>
        <div class="flex justify-start mb-4 gap-4">
          <ClubPicker v-model="clubs"></ClubPicker>
          <PositionPicker v-model="position"></PositionPicker>
          <PricePicker v-model="price"></PricePicker>
          <FormKit
            v-model="search"
            type="text"
            placeholder="Search for a player..."
          />
        </div>
        <div
          class="w-full mx-auto bg-white shadow-lg rounded-lg border border-slate-200"
        >
          <div class="overflow-x-auto p-3">
            <table class="table-auto w-full">
              <thead
                class="text-xs font-semibold uppercase text-slate-500 bg-slate-200"
              >
                <tr>
                  <th @click="sort('name')" class="p-2">
                    <div
                      class="cursor-pointer font-semibold text-left flex items-center"
                    >
                      <template v-if="order === 'name'">
                        <ChevronDownIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronUpIcon v-else class="h-5 w-5" />
                      </template>
                      <span v-tooltip="'The players name'">Name</span>
                    </div>
                  </th>
                  <th @click="sort('position')" class="p-2">
                    <div
                      v-tooltip="'The players position'"
                      class="cursor-pointer font-semibold text-left flex items-center"
                    >
                      <template v-if="order === 'position'">
                        <ChevronDownIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronUpIcon v-else class="h-5 w-5" />
                      </template>
                      Position
                    </div>
                  </th>
                  <th @click="sort('club')" class="p-2">
                    <div
                      v-tooltip="'The players club'"
                      class="cursor-pointer font-semibold text-left flex items-center"
                    >
                      <template v-if="order === 'club'">
                        <ChevronDownIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronUpIcon v-else class="h-5 w-5" />
                      </template>
                      Club
                    </div>
                  </th>
                  <th @click="sort('price')" class="p-2">
                    <div
                      v-tooltip="'The players price'"
                      class="cursor-pointer font-semibold justify-center flex items-center"
                    >
                      <template v-if="order === 'price'">
                        <ChevronUpIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronDownIcon v-else class="h-5 w-5" />
                      </template>
                      Price
                    </div>
                  </th>
                  <th @click="sort('points')" class="p-2">
                    <div
                      v-tooltip="'The players total points'"
                      class="cursor-pointer font-semibold justify-center flex items-center"
                    >
                      <template v-if="order === 'points'">
                        <ChevronUpIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronDownIcon v-else class="h-5 w-5" />
                      </template>
                      Points
                    </div>
                  </th>
                  <th @click="sort('ppg')" class="p-2">
                    <div
                      v-tooltip="'The players average points per game'"
                      class="cursor-pointer font-semibold justify-center flex items-center"
                    >
                      <template v-if="order === 'ppg'">
                        <ChevronUpIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronDownIcon v-else class="h-5 w-5" />
                      </template>
                      PPG
                    </div>
                  </th>
                  <th @click="sort('ppm')" class="p-2">
                    <div
                      v-tooltip="
                        'The players points per million (calculated by total points divided by current price)'
                      "
                      class="cursor-pointer font-semibold justify-center flex items-center"
                    >
                      <template v-if="order === 'ppm'">
                        <ChevronUpIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronDownIcon v-else class="h-5 w-5" />
                      </template>
                      PPM
                    </div>
                  </th>
                  <th @click="sort('expectedPoints')" class="p-2">
                    <div
                      v-tooltip="'The players expected points for next fixture'"
                      class="cursor-pointer font-semibold justify-center flex items-center"
                    >
                      <template v-if="order === 'expectedPoints'">
                        <ChevronUpIcon v-if="ascending" class="h-5 w-5" />
                        <ChevronDownIcon v-else class="h-5 w-5" />
                      </template>
                      ExP
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody class="text-sm divide-y divide-slate-100">
                <tr
                  v-for="{
                    name,
                    position,
                    club,
                    price,
                    points,
                    ppg,
                    ppm,
                    expectedPoints,
                  } in players"
                >
                  <td class="p-2">
                    <div class="font-medium text-slate-800">
                      {{ name }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="">
                      {{ position }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="">
                      {{ club }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-center">
                      {{ `£${(price / 10).toFixed(1)}` }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-center">
                      {{ points }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-center">
                      {{ ppg.toFixed(1) }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-center">
                      {{ ppm.toFixed(3) }}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-center">
                      {{ expectedPoints }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex align-center justify-end mt-4 gap-4">
          <button
            @click="decPage()"
            class="inline-flex items-center justify-center w-10 h-10 transition-colors duration-150 bg-white rounded-full focus:shadow-outline"
          >
            <ChevronLeftIcon class="h-5 w-5" />
          </button>
          <span class="mt-2 font-bold">{{ page + 1 }}</span>
          <button
            @click="incPage()"
            class="inline-flex items-center justify-center w-10 h-10 transition-colors duration-150 bg-white rounded-full focus:shadow-outline"
          >
            <ChevronRightIcon class="h-5 w-5" />
          </button>
          <LimitPicker v-model="limit"></LimitPicker>
        </div>
      </div>
      <div class="p-6 sm:p-8 lg:p-12 bg-white shadow-md rounded-lg mt-10">
        <div class="text-center">
          <h2
            class="text-slate-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6"
          >
            Our Top Picks
          </h2>
          <div class="flex justify-center mb-0">
            <p
              class="lg:w-3/5 text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12"
            >
              This is our top picks for the next gameweek based on expected points.
            </p>
          </div>
        </div>
        <div
          class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8"
        >
          <PlayerProfile position="GKP"></PlayerProfile>
          <PlayerProfile position="DEF"></PlayerProfile>
          <PlayerProfile position="MID"></PlayerProfile>
          <PlayerProfile position="FWD"></PlayerProfile>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/solid";
import { IClub } from "./types/IClub";
import { ILimit } from "./types/ILimit";
import { IPlayer } from "./types/IPlayer";
import { IPosition } from "./types/IPosition";
import { IPrice } from "./types/IPrice";
const client = useSupabaseClient();

const clubs = ref<IClub[]>([]);
const position = ref<IPosition | null>(null);
const price = ref<IPrice | null>(null);
const search = ref<string>("");

const order = ref<keyof IPlayer>("price");
const ascending = ref(false);

const page = ref<number>(0);
const limit = ref<ILimit>(10);

const players = ref<IPlayer[]>([]);

const load = async () => {
  const from = page.value * limit.value;
  const to = page.value * limit.value + limit.value;
  const query = client.from<IPlayer>("players").select();
  if (clubs.value.length > 0) {
    query.in("club", clubs.value);
  }
  if (position.value) {
    query.eq("position", position.value);
  }
  if (price.value) {
    order.value = "price";
    ascending.value = false;
    query.lte("price", price.value * 10);
  }
  if (search.value) {
    query.ilike("name", `%${search.value}%`);
  }
  const { data } = await query
    .order(order.value, { ascending: ascending.value })
    .range(from, to);
  players.value = data;
};

const sort = async (newOrder: keyof IPlayer) => {
  if (order.value === newOrder) {
    ascending.value = !ascending.value;
  } else {
    order.value = newOrder;
  }
};

const incPage = () => {
  page.value++;
};
const decPage = () => {
  if (page.value !== 0) {
    page.value--;
  }
};

watch(
  () => [
    clubs.value,
    position.value,
    price.value,
    search.value,
    order.value,
    ascending.value,
    page.value,
    limit.value,
  ],
  async () => {
    await load();
  }
);

await load();
</script>

<style scoped></style>
