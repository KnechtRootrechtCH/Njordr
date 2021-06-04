import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: colors.indigo,
        secondary: colors.amber,
        accent: colors.blueGrey,
        error: colors.red,
        warning: colors.orange,
        info: colors.blueGrey,
        success: colors.green,
      },
      dark: {
        primary: colors.amber.darken1,
        secondary: colors.indigo,
        accent: colors.blueGrey,
        error: colors.red,
        warning: colors.orange,
        info: colors.blueGrey,
        success: colors.green,
      },
    },
    dark: true,
  },
};

export default new Vuetify(opts);
