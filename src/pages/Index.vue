<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <br>
    {{ msg }}
    <br>
    {{getUser}}
  </q-page>
</template>

<script>
import User from "../store/models/User";

export default {
  name: 'PageIndex',
  mounted () {
    User.insert({
      data: {
        id: 1,
        name: "Luke",
        email: "luke@luke.com"
      }
    })
  },
  computed: {
    msg () {
      return process.env.MI_URL
    },
    getUser () {
      return User.find(1);
    }

  }
}
</script>
