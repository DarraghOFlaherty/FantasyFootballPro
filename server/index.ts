import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import schedule from "node-schedule";
import { IPlayer } from "~~/types/IPlayer";

const config = useRuntimeConfig();

const supabase = createClient(
  config.public.supabase.url,
  config.public.supabase.key
);

export default async () => {
  schedule.scheduleJob("*/5 * * * * ", function () {
    loadPlayers();
  });
};

const loadPlayers = async () => {
  const { data } = await axios.get(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );
  const players = data["elements"];
  const teams = data["teams"];
  const positions = data["element_types"];

  const payload: IPlayer[] = [];
  for (const player of players) {
    const club = teams.find((team) => team.id === player.team).short_name;
    const position = positions.find(
      (position) => position.id === player.element_type
    ).singular_name_short;
    payload.push({
      id: player.id,
      code: player.code,
      name: player.web_name,
      club: club,
      position: position,
      price: player.now_cost,
      points: player.total_points,
      ppg: player.points_per_game,
      ppm: player.total_points / player.now_cost,
      expectedPoints: player.ep_next,
      chanceOfPlaying: player.chance_of_playing,
      selectedByPercent: Number(player.selected_by_percent),
    });
  }

  const { data: result, error } = await supabase
    .from<IPlayer>("players")
    .upsert(payload);
  if (error) {
    console.log(error);
  }
  if (result) {
    console.log(result);
  }
};
