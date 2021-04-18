<template>
  <v-container fluid class="landmark">
    <v-row>
      <v-col cols="12" md="6" class="pa-0">
        <v-card tile>
          <v-img
            class="white--text align-end pa-15"
            height="500px"
            :src="require('@/assets/img/investor.jpeg')"
          >
            <v-card-title>Investors</v-card-title>

            <v-card-text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" to="investors">Learn more</v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <v-card tile>
          <v-img
            class="white--text align-end pa-15"
            height="500px"
            :src="require('@/assets/img/inventor.jpeg')"
          >
            <v-card-title>Inventors</v-card-title>

            <v-card-text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" to="inventors">Learn more</v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
