<script lang="ts" setup>
const { $connect, $init } = useNuxtApp();

const state = reactive({
  address: null,
  addressShort: null,
});

const walletConnect = async () => {
  console.log(':walletConnect');
  if (state.address) {
    const disconnectWallet = confirm('Disconnect wallet?');
    if (disconnectWallet) {
      console.log(':walletConnect disconnect');
      state.address = null;
      state.addressShort = null;
    }
  } else {
    const { address, addressShort } = await $connect();
    console.log(':walletConnect address/addressShort', address, addressShort);
    state.address = address;
    state.addressShort = addressShort;
  }
};

onMounted(async () => {
  console.log(':onMounted');
  const { address, addressShort } = await $init();
  console.log(':onMounted address/addressShort', address, addressShort);
  state.address = address;
  state.addressShort = addressShort;
});
</script>

<template>
  <div>
    <button
      style="
        padding: 8px;
        position: fixed;
        z-index: 100;
        top: 16px;
        right: 16px;
        background: #00dc82;
        color: white;
        font-weight: bold;
        border-radius: 0.25rem;
        cursor: pointer;
      "
      @click="walletConnect()"
    >
      {{ state.addressShort || 'Connect wallet' }}
    </button>
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>
