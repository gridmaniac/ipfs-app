<template>
  <StripedBox :image="require('@/assets/img/greeting.jpeg')">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="text-h4 font-weight-medium mb-3">Sign up</div>
      <div class="text-body2 mb-7">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>

      <v-text-field
        v-model="firstName"
        :rules="firstNameRules"
        label="First name"
        required
        filled
        solo
        dense
        hide-details="auto"
        class="mb-3"
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        :rules="lastNameRules"
        label="Last name"
        required
        filled
        solo
        dense
        hide-details="auto"
        class="mb-3"
      ></v-text-field>

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
        label="Password"
        type="password"
        required
        filled
        solo
        dense
        hide-details="auto"
        class="mb-3"
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

  props: {
    role: {
      required: true,
    },
  },

  data: () => ({
    valid: true,
    firstName: "",
    firstNameRules: [
      (v) => !!v || "First name is required",
      (v) =>
        (v && v.length <= 10) || "First name must be less than 10 characters",
    ],
    lastName: "",
    lastNameRules: [
      (v) => !!v || "Last name is required",
      (v) =>
        (v && v.length <= 10) || "Last name must be less than 10 characters",
    ],
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
          await this.$store.dispatch("verifyEmail", this.email);

          this.$store.commit("setCredentials", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          });

          switch (this.role) {
            case "inventor":
              await this.$store.dispatch("signUpAsInventor");
              this.$router.push("/create");
              break;

            case "investor":
              this.$router.push("/payment");
              break;
          }
        } catch (e) {
          this.error = e.message;
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
