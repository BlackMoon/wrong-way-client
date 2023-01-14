const logs = new URLSearchParams(window.location.search).get('logs');
export const showLogs = logs === 'true' || logs === '';
export const NEW_LINE = '\n';