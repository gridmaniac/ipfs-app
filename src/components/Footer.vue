<template>
  <v-footer color="grey lighten-2 align-start pt-7" style="min-height: 250px">
    <v-row class="lean">
      <v-col md="2" cols="12"
        ><v-avatar color="grey darken-1" size="32"></v-avatar
      ></v-col>
      <v-col md="3" cols="12">
        <div class="text-h6 mb-2">Lorem impsum</div>
        <a href="/" class="d-block text-decoration-none">Lorem Ipsum is</a>
        <a href="/" class="d-block text-decoration-none">Lorem Ipsum is</a>
        <a href="/" class="d-block text-decoration-none">Lorem Ipsum is</a>
      </v-col>
      <v-col md="3" cols="12">
        <div class="text-h6 mb-2">Lorem impsum</div>
        <a href="/" class="d-block text-decoration-none">Lorem Ipsum is</a>
        <a href="/" class="d-block text-decoration-none">Lorem Ipsum is</a>
        <a href="/" class="d-block text-decoration-none">Lorem Ipsum is</a>
      </v-col>
      <v-col md="4" cols="12">
        <div class="text-h6 mb-2">Lorem impsum</div>
        <div class="text-body2">Lorem Ipsum is simply</div>
        <v-text-field
          placeholder="Enter your E-mail"
          color="primary"
          class="pt-0"
        >
          <template v-slot:append>
            <v-btn depressed tile color="primary" class="ma-0"> Submit </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-footer>
</template>
