<template>
  <StripedBox>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="text-h4 font-weight-medium mb-10 pl-4">Payment</div>
      <v-row class="px-5">
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            label="First Name"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            label="Last Name"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="address"
            :rules="addressRules"
            label="Address"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="postalCode"
            :rules="postalCodeRules"
            label="Postal Code"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="city"
            :rules="cityRules"
            label="City"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-autocomplete
            v-model="state"
            :items="items"
            :rules="stateRules"
            label="State"
            required
            filled
            solo
            dense
            color="white"
            class="no-br"
          ></v-autocomplete>
        </v-col>
        <div class="separator"></div>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="cardNumber"
            :rules="cardNumberRules"
            label="Credit card number"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="cardHolder"
            :rules="cardHolderRules"
            label="Name on Card"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="py-0 px-2 pb-1">
          <v-menu
            ref="calendar"
            v-model="calendar"
            :close-on-content-click="false"
            :return-value.sync="expirationDate"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                readonly
                v-bind="attrs"
                v-on="on"
                v-model="expirationDate"
                :rules="expirationDateRules"
                label="Expiration date"
                required
                filled
                solo
                dense
                hide-details="auto"
                class="mb-3 no-br"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="expirationDate"
              type="month"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="calendar = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.calendar.save(expirationDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4" class="py-0 px-2 pb-1">
          <v-autocomplete
            filled
            solo
            dense
            color="white"
            class="no-br"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" class="py-0 px-2 pb-1">
          <v-text-field
            v-model="cardCode"
            :rules="cardCodeRules"
            label="CVV , CID , CVC"
            required
            filled
            solo
            dense
            hide-details="auto"
            class="mb-3 no-br"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex mx-4 mt-2 align-center">
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="agreement"
          :rules="agreementRules"
          label="Lorem Ipsum is simply dummy text of..."
          required
          class="mr-10"
        ></v-checkbox>
        <v-btn color="primary" large elevation="0" @click="validate"
          >Activate</v-btn
        >
      </div>
    </v-form>
  </StripedBox>
</template>

<script>
import StripedBox from "@/components/StripedBox";
import states from "@/utils/states.json";
import { mapGetters } from "vuex";

export default {
  components: {
    StripedBox,
  },

  data() {
    return {
      valid: true,
      items: states.map((x) => x.name),
      firstName: "",
      firstNameRules: [(v) => !!v || "Field is required"],
      lastName: "",
      lastNameRules: [(v) => !!v || "Field is required"],
      address: "",
      addressRules: [(v) => !!v || "Field is required"],
      postalCode: "",
      postalCodeRules: [(v) => !!v || "Field is required"],
      city: "",
      cityRules: [(v) => !!v || "Field is required"],
      state: "",
      stateRules: [(v) => !!v || "Field is required"],
      cardNumber: "",
      cardNumberRules: [(v) => !!v || "Field is required"],
      cardHolder: "",
      cardHolderRules: [(v) => !!v || "Field is required"],
      expirationDate: null,
      expirationDateRules: [(v) => !!v || "Field is required"],
      calendar: false,
      cardCode: "",
      cardCodeRules: [(v) => !!v || "Field is required"],
      agreement: false,
      agreementRules: [(v) => !!v || "Field is required"],
    };
  },

  computed: {
    ...mapGetters(["hasCredentials"]),
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("signUpAsInvestor", {
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            postalCode: this.postalCode,
            city: this.city,
            state: this.state,
            cardNumber: this.cardNumber,
            cardHolder: this.cardHolder,
            expirationDate: this.expirationDate,
            cardCode: this.cardCode,
          });

          this.$router.push("/categories");
        } catch (e) {
          console.log(e);
        }
      }
    },
  },

  created() {
    if (!this.hasCredentials) this.$router.push("/");
  },
};
</script>

<style scoped>
.separator {
  height: 1px;
  width: 100%;
  max-width: 590px;
  background: #676767;
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>
