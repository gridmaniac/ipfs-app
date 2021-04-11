<template>
  <v-container class="fill-height stripes stripes--70" fluid>
    <v-sheet class="compact">
      <v-stepper v-model="step" class="elevation-0">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4"></v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="text-h5 font-weight-medium text-center">
              What's your idea?
            </div>
            <v-card
              class="my-5 mx-auto"
              color="grey lighten-4"
              elevation="0"
              height="200px"
              max-width="600px"
            >
              <v-textarea
                v-model="title"
                :error-messages="validateTitle()"
                lazy-validation
                :counter="100"
                solo
                auto-grow
                rows="8"
                placeholder="Lorem ipsum"
                @input="hasTitleModified = true"
              ></v-textarea>
            </v-card>

            <div class="text-center mt-8">
              <v-btn color="primary" @click="next1">Next</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div class="text-h5 font-weight-medium text-center">
              How are you gonna make money?
            </div>
            <v-card
              class="my-5 mx-auto"
              color="grey lighten-4"
              elevation="0"
              height="200px"
              max-width="600px"
            >
              <v-textarea
                v-model="profit"
                :error-messages="validateProfit()"
                :counter="200"
                solo
                auto-grow
                rows="8"
                placeholder="Lorem ipsum"
                @input="hasProfitModified = true"
              ></v-textarea>
            </v-card>

            <div class="text-center mt-8">
              <v-btn class="mr-5" elevation="0" @click="step = 1"
                >Previous</v-btn
              >
              <v-btn color="primary" @click="next2">Next</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <div class="text-h5 font-weight-medium text-center">
              How are you gonna do this?
            </div>
            <v-card
              class="my-5 mx-auto"
              color="grey lighten-4"
              elevation="0"
              height="200px"
              max-width="600px"
            >
              <v-textarea
                v-model="details"
                :error-messages="validateDetails()"
                :counter="500"
                solo
                auto-grow
                rows="8"
                placeholder="Lorem ipsum"
                @input="hasDetailsModified = true"
              ></v-textarea>
            </v-card>

            <div class="text-center mt-8">
              <v-btn class="mr-5" elevation="0" @click="step = 2"
                >Previous</v-btn
              >
              <v-btn color="primary" @click="next3">Next</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4">
            <div class="text-h5 font-weight-medium text-center">
              Upload your file
            </div>
            <v-card
              class="my-5 mx-auto d-flex justify-center align-center fill-height flex-column"
              :color="files.length > 0 ? 'white' : 'grey lighten-4'"
              elevation="0"
              height="200px"
              max-width="400px"
              tile
            >
              <file-upload
                v-if="files.length === 0"
                v-model="files"
                :drop="true"
                @input-file="inputFile"
              >
                <v-icon x-large>mdi-cloud-upload</v-icon>
                <div class="text-caption my-2">Drag to upload</div>
                <v-btn color="secondary" small>Choose file</v-btn>
              </file-upload>

              <v-container
                fluid
                v-if="files.length > 0 && !isUploaded"
                class="d-block"
              >
                <v-progress-linear
                  :value="files[0].progress"
                ></v-progress-linear>
                <div class="text-body-2 my-3 blue--text text-center">
                  Uploading your file...
                </div>
              </v-container>

              <v-list v-if="files.length > 0 && isUploaded">
                <v-list-item v-for="file in files" :key="file.id">
                  <v-list-item-avatar>
                    <v-icon color="primary">mdi-clipboard-text</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="
                        $vuetify.breakpoint.sm || $vuetify.breakpoint.xs
                          ? file.name.substr(0, 25)
                          : file.name
                      "
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      >Uploaded successful. Thank you</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="grey lighten-1" @click="clearFiles()"
                        >mdi-delete</v-icon
                      >
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>

            <div class="text-center mb-2">
              <v-btn class="mr-5" elevation="0" @click="step = 3"
                >Previous</v-btn
              >
              <v-btn
                :disabled="!isSubmitActive"
                color="primary"
                elevation="0"
                @click="complete()"
                >Submit</v-btn
              >
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-sheet></v-container
  >
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      files: [],
      isUploaded: false,
      title: null,
      profit: null,
      details: null,
      hasTitleModified: false,
      hasProfitModified: false,
      hasDetailsModified: false,
    };
  },

  computed: {
    isSubmitActive() {
      return this.files.length > 0 && this.isUploaded;
    },
  },

  methods: {
    complete() {
      alert("Onboarding upload proccess complete");
      this.$router.push("/");
    },
    inputFile() {
      this.isUploaded = false;
      this.files[0].progress = parseInt(this.files[0].progress);

      const interval = setInterval(() => {
        this.files[0].progress += 10;
        if (this.files[0].progress > 100) {
          this.isUploaded = true;
          clearInterval(interval);
        }
      }, 100);
    },
    clearFiles() {
      this.files = [];
    },
    validateTitle() {
      if (!this.hasTitleModified) return null;
      if (!this.title) return "Field is required";
      if (this.title.length > 100) return "Must be at most 100 characters long";
      return null;
    },
    validateProfit() {
      if (!this.hasProfitModified) return null;
      if (!this.profit) return "Field is required";
      if (this.profit.length > 200)
        return "Must be at most 200 characters long";
      return null;
    },
    validateDetails() {
      if (!this.hasDetailsModified) return null;
      if (!this.details) return "Field is required";
      if (this.details.length > 500)
        return "Must be at most 500 characters long";
      return null;
    },
    next1() {
      this.hasTitleModified = true;
      if (this.validateTitle()) return;
      this.step = 2;
    },
    next2() {
      this.hasProfitModified = true;
      if (this.validateProfit()) return;
      this.step = 3;
    },
    next3() {
      this.hasDetailsModified = true;
      if (this.validateDetails()) return;
      this.step = 4;
    },
  },
};
</script>

<style>
.stripes--70 {
  background-image: repeating-linear-gradient(
    180deg,
    #d7d7d7,
    #d7d7d7 70%,
    #f3f3f3 70%,
    #f3f3f3 100%
  );
}
</style>
