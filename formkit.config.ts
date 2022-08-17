import { generateClasses } from "@formkit/themes";
import { DefaultConfigOptions } from "@formkit/vue";

const classes = {
  input:
    "relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm",
  label: "inline-block text-slate-800 text-sm sm:text-base",
  help: "text-xs text-slate-500",
  message: "font-semibold text-red-600",
};

const config: DefaultConfigOptions = {
  config: {
    classes: generateClasses({
      text: classes,
    }),
  },
};

export default config;
