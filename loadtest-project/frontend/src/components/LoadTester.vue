<template>
  <div>
    <div style="display: flex; gap: 10px; margin-bottom: 10px">
      <label
        >Requests count:
        <input v-model.number="requestsCount" type="number" min="1" />
      </label>
      <label
        >Delay (ms) between requests:
        <input v-model.number="delayMs" type="number" min="0" />
      </label>
      <label
        >Limit per request:
        <input v-model.number="limit" type="number" min="1" />
      </label>
      <button @click="start" :disabled="running">Start</button>
      <button @click="stop" :disabled="!running">Stop</button>
    </div>

    <div style="margin-top: 10px">
      <div>Sent: {{ sent }}</div>
      <div>Success: {{ success }}</div>
      <div>Errors: {{ errors }}</div>
      <div>Elapsed: {{ elapsedStr }}</div>
      <div v-if="lastError">Last error: {{ lastError }}</div>
    </div>

    <div style="margin-top: 15px">
      <h4>Recent response times (ms) — last 10</h4>
      <div v-for="t in recentTimes" :key="t">{{ t }} ms</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";

export default {
  setup() {
    const requestsCount = ref(200);
    const delayMs = ref(10);
    const limit = ref(50);
    const sent = ref(0);
    const success = ref(0);
    const errors = ref(0);
    const running = ref(false);
    const startTime = ref(null);
    const recentTimes = ref([]);
    const lastError = ref(null);
    let stopFlag = false;

    const elapsedStr = computed(() => {
      if (!startTime.value) return "00:00";
      const sec = Math.floor((Date.now() - startTime.value) / 1000);
      const m = String(Math.floor(sec / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      return `${m}:${s}`;
    });

    async function singleRequest() {
      const t0 = Date.now();
      try {
        const resp = await axios.get("/api/items", {
          params: { limit: limit.value, offset: 0 },
        });
        const dt = Date.now() - t0;
        recentTimes.value = [dt].concat(recentTimes.value).slice(0, 10);
        success.value++;
      } catch (e) {
        errors.value++;
        lastError.value = e.message || "error";
      } finally {
        sent.value++;
      }
    }

    async function start() {
      stopFlag = false;
      running.value = true;
      startTime.value = Date.now();
      sent.value = 0;
      success.value = 0;
      errors.value = 0;
      lastError.value = null;
      recentTimes.value = [];
      // Простая последовательная отправка:
      for (let i = 0; i < requestsCount.value; i++) {
        if (stopFlag) break;
        singleRequest(); // запускаем параллельно без await — так создаём нагрузку
        // задержка между стартом новых запросов
        await new Promise((r) => setTimeout(r, delayMs.value));
      }
      running.value = false;
    }

    function stop() {
      stopFlag = true;
      running.value = false;
    }

    return {
      requestsCount,
      delayMs,
      limit,
      sent,
      success,
      errors,
      start,
      stop,
      running,
      elapsedStr,
      recentTimes,
      lastError,
    };
  },
};
</script>
