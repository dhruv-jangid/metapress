(async () => {
  // remove all node_modules directories
  await Bun.$`find . -type d -name node_modules -prune -print -exec rm -rf '{}' +`;

  // remove all .turbo cache
  await Bun.$`find . -type d -name .turbo -prune -print -exec rm -rf '{}' +`;

  // remove the lock file & cache remains
  await Bun.$`rm -rvf bun.lock apps/server/dist apps/web/.svelte-kit apps/web/.vercel`;
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
