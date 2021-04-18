<template>
  <StripedBox :image="require('@/assets/img/building.jpeg')">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="text-h4 font-weight-medium mb-3">Sign in</div>
      <div class="text-body2 mb-7">Welcome back!</div>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        :error-messages="error"
        label="E-mail"
        required
        filled
        solo
        dense
        hide-details="auto"
        class="mb-3"
        @input="error = ''"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :error-messages="error"
        label="Password"
        type="password"
        required
        filled
        solo
        dense
        hide-details="auto"
        class="mb-3"
        @input="error = ''"
      ></v-text-field>

      <div class="text-body2 mt-5">Lorem Ipsum is simply</div>

      <v-btn
        :disabled="!valid || isLoading"
        :loading="isLoading"
        color="primary"
        class="mt-4 mb-1"
        @click="validate"
        tile
        large
      >
        Submit
      </v-btn>
    </v-form>
  </StripedBox>
</template>

<script>
import StripedBox from "@/components/StripedBox";

export default {
  components: {
    StripedBox,
  },

  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
    error: null,
    isLoading: false,
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          this.isLoading = true;
          this.error = null;
          await this.$store.dispatch("auth", {
            email: this.email,
            password: this.password,
          });

          this.$router.push("/categories");
        } catch (e) {
          this.error = e.message;
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
