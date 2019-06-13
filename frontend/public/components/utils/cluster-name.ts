export function getClusterName(server = window.SERVER_FLAGS.kubeAPIServerURL): string {
  const url = new URL(server);
  return url.host.replace(/\./g, '-');
}
