<script lang="ts">
  import { LEGAL_NOTICE_PAGE } from "@niama/ui/shared/page-mentions-legales";
  import LegalSection from "$lib/components/legal-section.svelte";

  let { data } = $props();
</script>

<div class={LEGAL_NOTICE_PAGE.base()}>
  <LegalSection section={data.legal} withSeparator={false} />
  <LegalSection section={data.privacy} />
</div>
