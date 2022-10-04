<script>
  import github from "svelte-highlight/styles/github";
  import hljs from "highlight.js";

  export let data;
  const result = hljs.highlight(data.paste.body, { language: data.paste.language}).value;
  console.log(data);
</script>

<svelte:head>
  {@html github}
</svelte:head>

<div class="overflow-hidden rounded-lg bg-white shadow m-10 mx-48">
  <div class="relative px-4 py-5 sm:p-6">
    <span class="absolute top-0 right-0 px-2 py-2 shadow-lg">{data.paste.language}</span>
    <pre>{@html result}</pre>
  </div>
</div>

<style>

</style>

