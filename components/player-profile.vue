<template>
  <div>
    <div
      class="group h-96 block bg-slate-100 rounded-lg overflow-hidden shadow-lg relative mb-2 lg:mb-3"
    >
      <img
        :src="loadImage(player.code)"
        loading="lazy"
        class="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
      />
      <div class="flex gap-2 absolute px-2 top-2">
        <span
          class="bg-slate-800 text-white text-sm font-semibold tracking-wider uppercase rounded-lg px-3 py-1.5"
        >
          {{ player.name }}
        </span>
      </div>

      <div class="flex gap-2 absolute px-2 bottom-2">
        <span
          v-tooltip="'The players position'"
          class="bg-white text-slate-800 text-sm font-semibold tracking-wider uppercase rounded-lg px-3 py-1.5"
        >
          {{ player.position }}
        </span>
        <span
          v-tooltip="'The players club'"
          class="bg-white text-slate-800 text-sm font-semibold tracking-wider uppercase rounded-lg px-3 py-1.5"
        >
          {{ player.club }}
        </span>
        <span
          v-tooltip="'The players current price'"
          class="bg-white text-slate-800 text-sm font-semibold tracking-wider uppercase rounded-lg px-3 py-1.5"
        >
          {{ `£${(player.price / 10).toFixed(1)}` }}
        </span>
        <span
          v-tooltip="'The players expected points for the next gameweek'"
          class="bg-white text-slate-800 text-sm font-semibold tracking-wider uppercase rounded-lg px-3 py-1.5"
        >
          {{ player.expectedPoints }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { IPlayer } from "~~/types/IPlayer";
import { IPosition } from "~~/types/IPosition";

const client = useSupabaseClient();

const { position } = defineProps({
  position: {
    type: String as PropType<IPosition>,
    required: true,
  },
});

const loadImage = (code: string) => {
  return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`;
};

const { data: player } = await client
  .from<IPlayer>("players")
  .select()
  .eq("position", position)
  .order("expectedPoints", { ascending: false })
  .limit(1)
  .single();
</script>
