<template>
  <div class="payment-preloder">
    <base-section no-row>
      <div class="q-mb-sm" v-for="item in 3" :key="item">
        <q-skeleton width="50%" type="text" />
        <q-skeleton type="QInput" />
      </div>

      <q-card-actions class="q-mt-sm" align="center">
        <q-skeleton width="160px" type="QBtn" />
      </q-card-actions>
    </base-section>
  </div>
</template>
