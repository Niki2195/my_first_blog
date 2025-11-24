<template>
  <div>
    <h1>Items List</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="loadMore" v-if="hasMore">Load More</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const items = ref([]);
const page = ref(1);
const limit = 100;
const hasMore = ref(true);

const fetchItems = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/items?skip=${
        (page.value - 1) * limit
      }&take=${limit}`
    );
    items.value.push(...res.data.items);
    if (items.value.length >= res.data.count) hasMore.value = false;
  } catch (err) {
    console.error(err);
  }
};

const loadMore = () => {
  page.value++;
  fetchItems();
};

onMounted(() => fetchItems());
</script>
