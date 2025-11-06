const isDev = import.meta.env.MODE === 'development'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

function log(level: LogLevel, ...args: unknown[]) {
  if (!isDev && level === 'debug') return // 生产环境不输出debug日志

  const prefix = `[${new Date().toISOString()}][${level.toUpperCase()}]`
  switch (level) {
    case 'debug':
      console.debug(prefix, ...args)
      break
    case 'info':
      console.info(prefix, ...args)
      break
    case 'warn':
      console.warn(prefix, ...args)
      break
    case 'error':
      console.error(prefix, ...args)
      break
  }
}

export const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
}
