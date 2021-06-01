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
        error: colors.error,
        warning: colors.warning,
        info: colors.info,
        success: colors.success,
      },
      dark: {
        primary: colors.amber.darken1,
        secondary: colors.indigo,
        accent: colors.blueGrey,
        error: colors.error,
        warning: colors.warning,
        info: colors.info,
        success: colors.success,
      },
    },
    dark: true,
  },
};

export default new Vuetify(opts);
