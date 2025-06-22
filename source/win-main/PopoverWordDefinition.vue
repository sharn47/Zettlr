<template>
  <!-- Pop-ups in Zettlr are teleported to <body> so they escape clipping -->
  <teleport to="body">
    <AppPopover         
      :target="target"
      :show="true"
      @close="() => $emit('close')"
      class="word-definition"
    >
      <template #title>{{ word }}</template>

      <!-- One <li> for each part-of-speech meaning -->
      <ul class="entries">
        <li v-for="(entry, i) in entries" :key="i">
          <div class="def">
            <span class="pos">[{{ entry.pos }}]</span>
            {{ entry.definition }}
          </div>

          <!-- Synonyms are clickable replacements -->
          <div v-if="entry.synonyms.length" class="syn">
            <span>Synonyms:</span>
            <span
              v-for="s in entry.synonyms"
              :key="s"
              class="synonym"
              @click="$emit('replace', s)"
            >
              {{ s }}
            </span>
          </div>
        </li>
      </ul>
    </AppPopover>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  target: HTMLElement
  word: string
  entries: {
    pos: string
    definition: string
    synonyms: string[]
  }[]
}>()
</script>

<style scoped>
.word-definition { max-width: 400px; }
.pos            { color: var(--z-secondary-text); margin-right: .25em; }
.synonym        { cursor: pointer; text-decoration: underline; margin: 0 .25em; }
.synonym:hover  { text-decoration: none; }
</style>
