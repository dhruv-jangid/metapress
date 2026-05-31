<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { alertDialog } from "$lib/hooks/alert-dialog.svelte";
</script>

<AlertDialog.Root bind:open={alertDialog.open}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{alertDialog.options?.title}</AlertDialog.Title>
      {#if alertDialog.options?.description}
        <AlertDialog.Description>{alertDialog.options.description}</AlertDialog.Description>
      {/if}
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={() => alertDialog.confirm()}>
        {alertDialog.options?.actionLabel ?? "Confirm"}
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
