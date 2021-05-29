<template>
  <v-container>
    <v-row class="mb-4" justify="center" no-gutters>
      <v-col sm="12" md="8" xl="4">
        <v-card class="pa-8 content" elevation="20" outlined>
          <v-form submit="signInWithEmailAndPassword">
            <v-text-field
              v-model="email"
              v-bind:label="$t('Email')"
              required
              :error-messages="message"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              v-bind:label="$t('Password')"
              required
              @click:append="showPassword = !showPassword"
            >
            </v-text-field>
            <v-btn block light @click="signInWithEmailAndPassword">
              {{ $t("Sign in") }}
            </v-btn>
            <v-divider class="mt-8 mb-8" />
            <div>
              <img
                src="@/assets/google_signin_buttons/1x/btn_google_signin_light_normal_web.png"
                @click="signInWithGoogleAuth"
              />
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import { auth } from "../plugins/firebase";

export default {
  name: "Authenticate",
  data: function () {
    return {
      email: "",
      password: "",
      hasMessage: false,
      message: "",
      showPassword: false,
    };
  },
  methods: {
    signInWithEmailAndPassword: function () {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.message = "";
          this.hasMessage = false;
          this.$router.replace("/");
        },
        (err) => {
          this.message = err.message;
          this.hasMessage = true;
        }
      );
    },
    signInWithGoogleAuth: function () {
      let provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(() => {
          this.message = "";
          this.hasMessage = false;
          this.$router.replace("/");
          /*
        let token = result.credential.accessToken
        let user = result.user
        */
        })
        .catch((error) => {
          console.log("error", error, this);
          this.message = error.message;
          this.hasMessage = true;
        });
    },
  },
};
</script>

<style scoped>
.content {
  text-align: center;
}
</style>
