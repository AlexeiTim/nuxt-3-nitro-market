<script setup lang="ts"></script>

<template>
  <div>
    <ElSkeleton class="flex gap-4 w-full" animated>
      <template #template>
        <div class="flex gap-4 w-full">
          <ElSkeletonItem variang="image" style="width: 40vw; height: 50vh" />
          <div class="flex flex-col gap-4 w-full">
            <ElSkeletonItem v-for="i in 5" :key="i" />
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<style scoped></style>
